/* eslint-disable react-hooks/rules-of-hooks */
import { downloadFile, getStorage, setStorage } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { Platform, LogBox, Linking, Alert, PermissionsAndroid, experimental_LayoutConformance as LayoutConformance } from 'react-native'
import { getVersion } from 'react-native-device-info'
import { useEffect, useMemo, useState } from 'react'
import RNFetchBlob from 'react-native-blob-util'
import { asyncTimeOut, gcjEncrypt, getLocationBase, ObjectManage, requestPermissionMessage, TopView } from '@/duxapp'
import Geolocation from '@react-native-community/geolocation'
import closeIcon from './images/close.png'
import './index.scss'

Geolocation.setRNConfiguration({
  locationProvider: 'android'
})

// 屏蔽黄屏警告
LogBox.ignoreLogs(['Require cycle', 'Constants', 'nativeEvent'])

/**
 * 版本号比较
 * @param {*} curV 当前版本
 * @param {*} reqV 请求的版本
 * @returns
 */
export const compare = (curV, reqV) => {
  if (curV && reqV) {
    //将两个版本号拆成数字
    const arr1 = curV.split('.'),
      arr2 = reqV.split('.')
    let minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0
    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
      position++
    }
    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
    //若curV大于reqV，则返回true
    return diff > 0
  } else {
    //输入为空
    return false
  }
}

class AppUpgrade extends ObjectManage {
  constructor() {
    super({})
  }
  data = {
    received: 0,
    total: 0,
    progress: 0
  }

  setProgress = (received, total) => {
    const kb = [received / 1024, total / 1024]
    this.set({
      received: kb[0],
      total: kb[1],
      progress: kb[0] / kb[1]
    })
  }

  useProgress = () => {
    const [progress, setProgress] = useState(this.data)

    const { remove } = useMemo(() => {
      return this.onSet(data => {
        setProgress(data)
      })
    }, [])

    useEffect(() => {
      return () => remove()
    }, [remove])

    return progress
  }
}

export const appUpgrade = new AppUpgrade()

const AppUpgradeConfirm = ({
  onClose,
  onSubmit,
  content
}) => {
  useEffect(() => {
    return () => onClose()
  }, [onClose])

  return (
    <View className='AppUC absolute inset-0 items-center justify-center'>
      <View className='AppUC__main'>
        <Text className='AppUC__title'>更新提示</Text>
        {content && <View className='AppUC__content'>{content}</View>}
        <View className='AppUC__submit' onClick={onSubmit}>
          立即更新
        </View>
        <View onClick={onClose} className='AppUC__close'>
          <Image className='AppUC__close__icon' src={closeIcon} />
        </View>
      </View>
    </View>
  )
}

AppUpgradeConfirm.show = (content) => {
  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([AppUpgradeConfirm, {
      content,
      onClose: () => {
        reject()
        remove()
      },
      onSubmit: () => {
        resolve()
        remove()
      }
    }])
  })
}

export const AppUpgradeProgress = () => {

  const { received, total, progress } = appUpgrade.useProgress()

  return (
    <View className='AppUC absolute inset-0 items-center justify-center'>
      <View className='AppUC__main'>
        <Text className='AppUC__title'>下载中</Text>
        <View className='AppUP__progress'>
          <View className='AppUP__progress__child' style={{ width: progress * 100 + '%' }} />
          <View className='AppUP__progress__text'>{(received / 1024).toFixed(2) + 'MB/' + (total / 1024).toFixed(2) + 'MB'}</View>
        </View>
      </View>
    </View>
  )
}

AppUpgradeProgress.show = () => {
  return TopView.add([AppUpgradeProgress, {}])
}

export const updateApp = (() => {
  let callback = null
  return async _callback => {
    if (_callback) {
      callback = _callback
    }
    if (!callback) {
      return false
    }
    const info = await callback()
    if (Platform.OS === 'android') {
      if (compare(info.androidVersion, getVersion()) && (info.androidUrl || info.androidDowloadUrl)) {
        let progressView
        try {
          await AppUpgradeConfirm.show(info.androidUpdateInfo)
          if (info.androidDowloadUrl) {
            const task = downloadFile({
              url: info.androidDowloadUrl
            })
            progressView = AppUpgradeProgress.show()
            task.onProgressUpdate(res => {
              appUpgrade.setProgress(res.totalBytesWritten, res.totalBytesExpectedToWrite)
            })
            const { tempFilePath } = await task
            progressView.remove()
            await asyncTimeOut(200)
            RNFetchBlob.android.actionViewIntent(
              tempFilePath.replace('file://', ''),
              'application/vnd.android.package-archive'
            )
          } else {
            // 打开浏览器
            Linking.openURL(info.androidUrl)
          }
        } catch (error) {
          if (progressView) {
            progressView.remove()
          }
        }

        return true
      }
    } else {
      if (compare(info.iosVersion, getVersion()) && info.iosUrl) {
        Alert.alert(
          '有新版本',
          info.iosUpdateInfo,
          [
            { text: '取消', onPress: () => { }, style: 'cancel' },
            { text: '立即更新', onPress: () => Linking.openURL(info.iosUrl) }
          ]
        )
        return true
      }
    }
  }
})();

const getLocationBaseRN = enableHighAccuracy => {
  return new Promise(async (resolve, reject) => {
    const errKey = 'get-location-duxapp-error'
    try {
      const { data } = await getStorage({
        key: errKey
      })
      const errDate = JSON.parse(data).errDate
      if (new Date().getTime() - errDate < 2 * 24 * 60 * 60 * 1000) {
        const msg = '距离上次用户拒绝授权位置信息不足24小时，不再次授权信息'
        reject({ message: msg })
        return
      }
    } catch (error) {

    }
    if (Platform.OS === 'android') {
      /**
       * fix: 安卓机上奇怪的bug，不在获取权限之前加个定时器的话，定位成功回调不触发
       */
      await asyncTimeOut(20)
      const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (!status) {
        // const config = userConfig.option.duxapp.app?.permissions?.location
        // if (config) {
        //   const { confirm } = await showModal({
        //     title: config.title,
        //     content: config.content,
        //     confirmText: '快速开启定位',
        //     cancelText: '暂不开启'
        //   })
        //   if (!confirm) {
        //     reject({ message: '用户拒绝位置授权' })
        //     return
        //   }
        // }
        await requestPermissionMessage(requestPermissionMessage.types.location)
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            // 第一次请求【拒绝】后提示用户你为什么要这个权限
            title: '需要访问您的位置信息',
            message: 'APP将访问您的位置信息，以获取完整服务'
          }
        )
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          // 记录获取失败的时间 等待 48小时之后再次获取时间 某些安卓平台 拒绝之后短时间内再次弹出会不让通过
          await setStorage({
            key: errKey,
            data: JSON.stringify({
              errDate: new Date().getTime()
            })
          })
          reject({ message: '权限获取失败' })
          return
        }
      }

    }
    Geolocation.getCurrentPosition(info => {
      // 通过高精度模式再获取一次定位通过onChange函数回调
      // !enableHighAccuracy && getLocationBase(true).then(changeFunc)
      console.log('定位成功', enableHighAccuracy)
      const { latitude, longitude } = info.coords
      const { lat, lon } = gcjEncrypt(latitude, longitude)
      resolve({
        latitude: lat,
        longitude: lon
      })
    }, err => {
      console.log('定位失败', enableHighAccuracy)
      if (!enableHighAccuracy) {
        // 使用高精度重试获取定位
        // getLocationBase(true).then(resolve).catch(reject)
        reject(err)
      } else {
        reject(err)
      }
    }, {
      timeout: 15000,
      ...(enableHighAccuracy ? { maximumAge: 5000 } : {}),
      enableHighAccuracy
    })
  })
}

getLocationBase.rn = getLocationBaseRN

/**
 * 修复RN端 父元素使用padding，导致子元素 absolute 定位不准确的问题
 * https://github.com/facebook/react-native/issues/43206
 */
const DuxappLayoutConformance = props => <LayoutConformance {...props} />
export const layoutConformanceStrict = () => {
  TopView.addContainer(DuxappLayoutConformance)
}

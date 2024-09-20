import TencentYlhAd, { showRewardVideoAD, NativeExpress, Banner, Splash } from 'react-native-tencent-ylh-ad'
import { Platform } from 'react-native'
import { TopView, userConfig } from '@/duxapp'

const ad = userConfig.option?.tencentAD?.app || {}

const config = ad[Platform.OS === 'android' ? 'android' : 'ios']

export const tencentAD = {
  initStatus: 0, // 初始化中 1成功 2失败
  initCallback: [],
  init: () => {
    if (!ad.appid) {
      return console.log('请配置appid')
    }
    TencentYlhAd.registerAppId(ad.appid)
      .then(() => {
        tencentAD.initStatus = 1
        tencentAD.initCallback.forEach(([resolve]) => resolve())
      })
      .catch(() => {
        tencentAD.initStatus = 2
        tencentAD.initCallback.forEach(([, reject]) => reject())
      }).finally(() => {
        tencentAD.initCallback.splice(0)
      })
  },
  initCheck: async () => {
    if (tencentAD.initStatus === 1) {
      return
    } else if (tencentAD.initStatus === 1) {
      throw '初始化失败'
    } else {
      return new Promise((resolve, reject) => {
        tencentAD.initCallback.push([resolve, reject])
      })
    }
  },
  showSplashAD: async () => {
    await tencentAD.initCheck()
    return new Promise((resolve, reject) => {
      const { remove } = TopView.add([
        Splash,
        {
          style: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: '#000',
          },
          posId: config.splash,
          onPresent: () => {
            console.log('Splash.onPresent()');
          },
          onFailToReceived: err => {
            console.log('Splash.onFailToReceived()', err)
            remove()
            reject(err)
          },
          onNextAction: () => {
            resolve()
            remove()
            console.log('Splash.onNextAction()');
          },
        }
      ])
    })
  },
  showRewardVideoAD: async () => {
    await tencentAD.initCheck()
    return new Promise((resolve, reject) => {
      showRewardVideoAD({
        posId: config.reward,
        onReward: resolve,
        onError: reject
      })
    })
  },
  NativeExpress: () => {
    return <NativeExpress
      className='flex-grow bg-primary'
      posId={config.nativeExpress}
      onReceived={() => {
        console.log('加载成功')
      }}
      onFailToReceived={e => {
        console.log('加载失败', e)
      }}
      onRender={() => {

      }}
    />
  },
  Banner: () => {
    return <Banner
      style={{ height: 300 }}
      onReceived={() => {
        console.log('showBanner.onReceived()')
      }}
      onFailToReceived={err => {
        console.log('showBanner.onFailToReceived()', err)
      }}
      posId={config.banner}
    />
  }
}

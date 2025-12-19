import ExpoWeChat from 'expo-wechat'
import { loading } from '@/duxui'
import { AppState } from 'react-native'

import { asyncTimeOut, toast, TopView } from '@/duxapp'

import { WebView } from 'react-native-webview'
import { View } from '@tarojs/components'
import { useEffect } from 'react'

// import * as unionpay from '@shaogong/react-native-unionpay'

import ExpoAlipay from 'expo-alikit'
import pack from '../../../../package.json'

// Alipay.setAlipayScheme('duxapp' + pack.name)

const verifyPayStatus = async option => {
  // 验证是否支付成功
  const stop = loading('验证中')
  try {
    let status = await option.verify()
    if (!status) {
      await asyncTimeOut(2000)
      status = await option.verify()
    }
    stop()
    if (!status) {
      throw { message: '订单支付状态查询未成功' }
    }
  } catch (error) {
    stop()
    throw error
  }
}

/**
 * 支付宝二维码支付
 * @param {*} param0
 * @returns
 */
const AlipayQrcode = ({
  url,
  onResult,
  onJump,
  onError
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onError('启动超时')
    }, 6000)
    const { remove } = AppState.addEventListener('change', state => {
      if (state === 'background') {
        // 进入后台
        clearTimeout(timer)
        onJump()
      } else if (state === 'active') {
        // 进入前台
        onResult()
      }
    })
    return () => {
      remove()
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <View className='absolute' style={{ left: -9999, top: 0, width: 10, height: 10 }}>
    <WebView source={{ uri: url }} style={{ flex: 1 }} />
  </View>
}

/**
 * 支付宝网页支付发起支付，以及支付完成
 */
const alipayQrcode = url => {
  const stop = loading()
  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([AlipayQrcode, {
      url,
      onResult: () => {
        remove()
        resolve()
      },
      onError: () => {
        remove()
        stop()
        reject()
      },
      onJump: () => {
        stop()
      }
    }])
  })
}

export const nativePay = async (type, option) => {
  // console.log(type, option)
  if (type === 'adapay.wechat' || type === 'qztpay.wechat' || type === 'wechat-weapp') {
    // 调用微信小程序进行支付
    const wxInstall = await ExpoWeChat.isWXAppInstalled()
    if (!wxInstall) {
      toast('您的设备上未检测到微信客户端')
      throw '您的设备上未检测到微信客户端'
    }
    const types = ['release', 'test', 'preview']
    const res = await ExpoWeChat.launchMiniProgram({
      id: option.userName,
      type: types.includes(option.miniProgramType) ? types[option.miniProgramType] : types[option.miniProgramType ?? 0],
      path: option.path
    })
    if (res.errCode !== 0) {
      throw { message: res.extMsg }
    }
    await verifyPayStatus(option)
  } else if (type === 'alipay-web') {
    // 调用支付宝通过浏览器吊起的支付

    await alipayQrcode(option.qr_code)
    await verifyPayStatus(option)
  } else if (type.includes('wechat')) {
    // 微信app支付
    const wxInstall = await ExpoWeChat.isWXAppInstalled()
    if (!wxInstall) {
      toast('您的设备上未检测到微信客户端')
      throw '您的设备上未检测到微信客户端'
    }

    await ExpoWeChat.pay(option)

    const payRes = await new Promise(resolve => {
      const callback = e => {
        ExpoWeChat.removeListener('onPayResult', callback)
        resolve(e)
      }
      ExpoWeChat.addListener(
        'onPayResult',
        callback
      )
    })

    if (payRes.errorCode == 0) {
      return
    } else {
      toast(payRes.errorMessage)
      throw payRes.errorMessage
    }
  } else if (type.includes('alipay')) {
    try {
      // 打开沙箱
      // const orderStr = 'app_id=xxxx&method=alipay.trade.app.pay&charset=utf-8&timestamp=2014-07-24 03:07:50&version=1.0&notify_url=https%3A%2F%2Fapi.xxx.com%2Fnotify&biz_content=%7B%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22out_trade_no%22%3A%22xxxx%22%2C%22total_amount%22%3A%229.00%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&sign_type=RSA2&sign=xxxx' // get from server, signed
      await ExpoAlipay.pay({
        orderInfo: option?.data || option,
        scheme: 'duxapp' + pack.name,
        universalLink: undefined
      })

      const { resultStatus, result, memo } = await new Promise(resolve => {
        const callback = e => {
          ExpoAlipay.removeListener('onPayResult', callback)
          resolve(e)
        }
        ExpoAlipay.addListener(
          'onPayResult',
          callback
        )
      })

      // const { resultStatus, result, memo } = response

      if (9000 != resultStatus) {
        throw { message: memo }
      }

      if (result !== '') {
        if (type === 'alipay_free') {
          var { code, msg } = JSON.parse(result).alipay_fund_auth_order_app_freeze_response
        } else {
          var { code, msg } = JSON.parse(result).alipay_trade_app_pay_response
        }

        if (10000 != code) {
          throw msg
        }
      }

      return
    } catch (error) {
      toast(error.message || '发生错误')
      throw error.message || '发生错误'
    }
  } else if (type === 'netpay.union') {
    // await unionpay.startPay(option)
  } else {
    toast('不支持的支付方式')
    throw '不支持的支付方式'
  }
}

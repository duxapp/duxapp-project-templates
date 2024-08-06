import { toast } from '@/duxapp'

// 公众号微信支付
export const nativePay = (type, option) => {
  return new Promise((resolve, reject) => {
    if (!type.includes('wechat')) {
      throw '不支持的支付方式:' + type
    }
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', option, res => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            resolve()
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            // toast('取消支付')
          } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
            toast('支付失败')
          } else {
            toast(res.err_msg || '支付失败')
          }
          if (res.err_msg !== 'get_brand_wcpay_request') {
            // debug(res, 'pages/index/pay')
            reject(res.err_msg)
          }
        }
      )
    } else {
      reject('支付环境错误')
    }
  })
}

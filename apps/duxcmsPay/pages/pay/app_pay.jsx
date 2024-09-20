import { View } from '@tarojs/components'
import { useCallback, useEffect, useState } from 'react'
import { TopView, Header } from '@/duxcms/components'
import { login, useRouter } from '@tarojs/taro'
import { request, startPay } from '@/duxcmsPay'
import { Button } from '@/duxui/components/Button'
import { loading } from '@/duxui/utils/interact'
import './app_pay.scss'

export default function OrderAppPay() {

  const { params } = useRouter()

  const [payStatus, setPayStatus] = useState(0) // 0 未支付 1支付成功 2支付失败

  const start = useCallback(() => {
    login().then(res => {
      return request({
        url: params.api || 'order/without/pay',
        loading,
        toast: true,
        method: 'POST',
        data: {
          ...params,
          [params.typeField || 'type_params']: {
            code: res.code
          },
        }
      })
    }).then(res => {
      if (res.async) {
        return startPay('wechat', res.data)
      }
    }).then(() => {
      setTimeout(() => {
        setPayStatus(1)
      }, 100)
    }).catch(() => {
      setTimeout(() => {
        setPayStatus(2)
      }, 100)
    })
  }, [params])

  useEffect(() => {
    start()
  }, [start])

  return <TopView>
    <Header title='支付' />
    <View className='app-pay'>
      {
        payStatus === 2
          ? <>
            <Button openType='launchApp'>返回app</Button>
            <Button text='重新支付' type='primary' onClick={start}>重新支付</Button>
          </>
          : payStatus === 1 ?
            <Button type='success' openType='launchApp'>支付成功 返回app</Button>
            : null
      }
    </View>
  </TopView>
}

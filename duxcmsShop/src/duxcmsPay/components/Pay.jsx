import { CmsIcon, duxappTheme, nav, request } from '@/duxcms'
import { nativePay, payHook } from '@/duxcmsPay/utils'
import { Column, InputCode, NumberKeyboard, PullView, Row, Text, TopView, confirm, loading, px } from '@/duxui'
import { useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'

const Select = ({ list, price, mask, onClose, onSelect }) => {

  const close = useCallback(async () => {
    if (mask) {
      if (!(await confirm({
        content: '是否放弃本次付款',
        cancelText: '取消付款',
        confirmText: '继续支付'
      }))) {
        onClose('用户取消')
      }
    } else {
      onClose('用户取消')
    }
  }, [mask, onClose])

  return <PullView onClose={onClose} modal={mask}>
    <Column className='rt-3 bg-white p-3 gap-4'>
      <Row justify='between' items='center'>
        <CmsIcon name='op_close' size={48} color='#fff' />
        {
          price ?
            <payHook.Render mark='pay.title' option={{ price }}>
              <Text size={4} bold>需支付：￥{price}</Text>
            </payHook.Render> :
            <Text size={4} bold>选择支付方式</Text>
        }
        <CmsIcon name='op_close' size={48} color={duxappTheme.textColor1} onClick={close} />
      </Row>
      <Column className='p-2' />
      {
        list.map(item => {
          const iconKey = Object.keys(icons).find(key => item.name.includes(key))
          const typeItem = icons[iconKey] || {}
          return <Row key={item.name} items='center' onClick={() => onSelect(item)} className='gap-2 pv-1'>
            <CmsIcon name={typeItem.icon || 'qianbao'} size={64}
              style={{
                color: typeItem.color || duxappTheme.primaryColor,
                backgroundColor: typeItem.bgColor,
                lineHeight: px(64)
              }}
            />
            <Text grow size={4} bold>{item.title}</Text>
            {
              !!item.balance && <payHook.Render mark='pay.balance' option={item}>
                <Text color={2}>余额：￥{item.balance}</Text>
              </payHook.Render>
            }
            <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
          </Row>
        })
      }
      <Column className='p-2' />
    </Column>
  </PullView>
}

const icons = {
  balance: { icon: 'qianbao', color: '#337ab7', bgColor: '#fff' },
  alipay: { icon: 'zhifubao', color: '#5a9ef7', bgColor: '#fff' },
  wechat: { icon: 'weixin', color: '#00c800', bgColor: '#fff' },
  fast: { icon: 'yinhangqia', color: '#337ab7', bgColor: '#fff' },
  union: { icon: 'yinlian', color: '#d63120', bgColor: '#fff' },
  ticket: { icon: 'pay-fill', color: '#d63120', bgColor: '#fff' }
}

Select.select = (list, price, mask) => {
  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([
      Select,
      {
        list,
        price,
        mask,
        onSelect: item => {
          remove()
          resolve(item)
        },
        onClose: () => {
          remove()
          reject('用户取消')
        }
      }
    ])
  })
}

const PayPassword = ({ onSubmit, onClose }) => {

  const [value, props] = NumberKeyboard.useController()

  useEffect(() => {
    if (value.length === 6) {
      onSubmit(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <PullView modal>
    <Column className='gap-3 rt-3 bg-white p-3'>
      <InputCode value={value} itemStyle={{ backgroundColor: duxappTheme.pageColor }} password focus />
      <NumberKeyboard {...props} style={{ backgroundColor: duxappTheme.pageColor }} />
      <Text size={2} color={3} align='center' onClick={onClose}>取消支付</Text>
    </Column>
  </PullView>
}

PayPassword.input = () => {
  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([
      PayPassword,
      {
        onSubmit: password => {
          remove()
          resolve(password)
        },
        onClose: () => {
          remove()
          reject('用户取消')
        }
      }
    ])
  })
}

export const startPay = async ({
  price,
  payList,
  mask,
  payUrl,
  payData,
  passwordUrl,
  token,
  onType,
  fields
} = {}) => {
  const stop = loading()
  try {
    const _payList = await payList()
    if (_payList.some(v => v.name === 'balance')) {
      const account = await request('member/account')
      const balance = _payList.find(v => v.name === 'balance')
      balance.balance = account.balance
    }
    stop()
    const { name: type, password } = await Select.select(_payList, price, mask)
    if (onType) {
      await onType({
        type,
        password,
        payList: _payList,
        payUrl,
        payData,
        token,
        fields
      })
    }
    const params = {}
    // 小程序微信支付 获取code给后端获取openid
    if (process.env.TARO_ENV === 'weapp' && type.includes('wechat')) {
      params.code = (await Taro.login()).code
    }
    // 微信h5端用接口获取openid传给支付接口
    if (process.env.TARO_ENV === 'h5' && type.includes('wechat')) {
      const info = await request('member/oauth?type=wechat')
      params.open_id = info.open_id
    }
    if (password === 1) {
      if (await confirm({
        title: '提示',
        content: '尚未设置支付密码，是否立即去设置？',
        confirmText: '去设置'
      })) {
        nav(passwordUrl)
      }
      throw '未设置支付密码'
    }
    const payInfo = await request({
      url: payUrl,
      data: {
        ...payData,
        token,
        [fields?.type || 'type']: type,
        password: password ? await PayPassword.input() : '',
        [fields?.params || 'type_params']: params
      },
      method: 'POST',
      loading,
      toast: true
    })
    if (payInfo._meta?.async) {
      await nativePay(type, payInfo)
    }
  } catch (error) {
    stop()
    throw error
  }
}

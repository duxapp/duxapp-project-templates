import { setLoginConfig } from '@/duxcmsUser/components/user/login'
import { requestMiddle, user } from '@/duxcmsSale'

let event = null

export const saleBindForm = async ({ sale_id, sale_code, wechat_code }) => {
  const field = sale_id ? 'sale_id' : 'sale_code'
  const value = sale_id || sale_code
  setLoginConfig({
    extForm: [
      {
        type: 'input',
        show: 'reg',
        field,
        placeholder: '请输入邀请码',
        disabled: value,
        value
      }
    ]
  })
  // 没登陆的话，让用户登录
  value && !wechat_code && setTimeout(() => {
    if (!user.isLogin()) {
      user.login()
    }
  }, 1000)
  if (event) {
    event.remove()
    event = null
  }
  if (value) {
    // 用户走快捷登录 在快捷登录里面带上分销参数
    event = requestMiddle.before(async params => {
      if (params.url.includes('member/oauth/login')) {
        params.body[field] = value
      }
      return params
    })
  }
}

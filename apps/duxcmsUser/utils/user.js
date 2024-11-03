import { login, getAccountInfoSync } from '@tarojs/taro'
import { loading } from '@/duxui/utils/interact'
import {
  user,
  toast,
  nav,
} from '@/user/utils'
import config from '@/duxcms/config/request'
import { WechatLib } from '@/wechat'
import { request, requestMiddle, uploadMiddle } from '@/duxcms'

export const cmsUser = {
  // 在用户模块注册的名称
  appName: 'duxcms',

  oauth: async data => {
    try {
      const { token } = await request({
        url: 'member/oauth/token',
        method: 'POST',
        toast: true,
        data,
      })
      const userInfo = await request({
        url: 'member/oauth/login',
        method: 'POST',
        data: {
          token,
        },
      }).catch((err) => {
        if (err.code === 511) {
          toast('未绑定账户 请绑定账户')
          throw {
            bind: true,
            token,
          }
        }
        toast(err.message)
        throw err
      })
      return { token: userInfo.token, ...userInfo.userInfo }
    } catch (error) {
      throw error
    }
  },

  /**
   * 小程序端微信登录
   */
  weappLogin: async () => {
    const stop = loading('正在登录')
    try {
      const info = await cmsUser.oauth({
        code: (await login()).code,
        type: 'wechat-mini',
        app_id: getAccountInfoSync().miniProgram.appId
      })
      stop()
      return info
    } catch (error) {
      stop()
      throw error
    }
  },

  /**
   * 小程序端微信获取手机号登录
   */
  weappTelLogin: async (code) => {
    const stop = loading('正在登录')
    try {
      const info = await cmsUser.oauth({
        code,
        type: 'wechat-tel',
        app_id: getAccountInfoSync().miniProgram.appId
      })
      stop()
      return info
    } catch (error) {
      stop()
      throw error
    }
  },

  /**
   * app端微信登录
   */
  appWXLogin: async () => {
    // react-native-wechat-lib start
    if (process.env.TARO_ENV === 'rn') {
      try {
        if (!(await WechatLib.isWXAppInstalled())) {
          throw { message: '未安装微信客户端', code: 500 }
        }
        const res = await WechatLib.sendAuthRequest('snsapi_userinfo')
        if (+res.errCode !== 0) {
          throw { code: +res.errCode, message: res.errMsg }
        }
        return await cmsUser.oauth({
          code: res.code,
          type: 'wechat-app',
        })
      } catch (error) {
        throw error
      }
    } else {
      return { message: '平台错误 不支持微信APP登陆', code: 500 }
    }
    // react-native-wechat-lib end
  },

  wechatLogin: async (code) => {
    try {
      return await cmsUser.oauth({ code, type: 'wechat-mp' })
    } catch (err) {
      if (err.bind) {
        // 绑定账户
        toast('请绑定账户')
        const { backData } = await nav('user/auth/login', { token: err.token })
        const data1 = await backData()
        if (data1.type) {
          return data1.data
        } else {
          throw '用户取消登录'
        }
      } else {
        throw err
      }
    }
  },

  /**
   * 使用合并的方式设置用户信息
   * @param {object} info 用户信息
   * setInfo({avatar: ''})
   */
  setInfo: async (info, update = false) => {
    if (update) {
      await request({
        url: 'member/setting/data',
        method: 'POST',
        toast: true,
        data: info,
      })
      toast('更新成功')
    }
    return user.setInfo(info, cmsUser.appName)
  },

  /**
   * 通过键设置属性
   * @param {string} key 用户信息字段
   * @param {any} value 需要设置的值
   */
  setKey: (key, value) => {
    return user.setKey(key, value, cmsUser.appName)
  },

  /**
   * 通过接口请求刷新本地用户信息
   */
  getOnlineUserInfo: async () => {
    return request('member/info')
  },

  getUserInfo: () => {
    return user.getUserInfo(cmsUser.appName)
  },

  useUserInfo: () => {
    const data = user.useUserInfo(cmsUser.appName)

    return data
  }
}

const requestBefore = async (params) => {
  let { token = '' } = cmsUser.getUserInfo()
  // 开启调试
  config.devOpen && (token = config.devToken)
  if (token) {
    params.header.Authorization = token.startsWith('Bearer ')
      ? token
      : 'Bearer ' + token
  }
  return params
}

requestMiddle.before(requestBefore)
uploadMiddle.before(requestBefore)

requestMiddle.result(async (res, params) => {
  if (res.statusCode === 401) {
    if (user.isLogin()) {
      toast('你已退出登录 请重新登录')
      user.logout()
    } else {
      await user.login()
      const data = await request(params)
      return {
        data: {
          data,
          meta: data._meta
        },
        statusCode: 200
      }
    }
  } else if (res.header?.authorization) {
    if (config.devOpen) {
      console.log(
        'Token即将过期 请使用新的token覆盖devToken: ' + res.header.authorization
      )
    } else {
      cmsUser.setInfo({ token: res.header.authorization })
    }
  }
  return res
}, 5)

export { user }

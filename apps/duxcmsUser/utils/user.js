import { login, getAccountInfoSync } from '@tarojs/taro'
import { asyncTimeOut, loading, userConfig } from '@/duxapp'
import {
  user,
  toast,
  nav,
} from '@/duxappUser/utils'
import config from '@/duxcms/config/request'
import { WechatLib } from '@/duxappWechatShare'
import { request, requestMiddle, uploadMiddle } from '@/duxcms'
import { confirm } from '@/duxui'
import { duxcmsUserLang } from './lang'

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
          toast(duxcmsUserLang.t('user.notBoundAccount'))
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
    const stop = loading(duxcmsUserLang.t('user.loggingIn'))
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
    const stop = loading(duxcmsUserLang.t('user.loggingIn'))
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
    if (process.env.TARO_ENV === 'rn') {
      try {
        if (!(await WechatLib.isWXAppInstalled())) {
          throw { message: duxcmsUserLang.t('user.wechatNotInstalled'), code: 500 }
        }
        await WechatLib.sendAuthRequest('snsapi_userinfo', 'wechat_snsapi_userinfo')

        const res = await new Promise(resolve => {
          const callback = e => {
            WechatLib.removeListener('onAuthResult', callback)
            resolve(e)
          }
          WechatLib.addListener(
            'onAuthResult',
            callback
          )
        })

        if (+res.errorCode !== 0) {
          throw { code: +res.errorCode, message: res.errorMessage }
        }
        // const res = await WechatLib.sendAuthRequest('snsapi_userinfo')
        // if (+res.errCode !== 0) {
        //   throw { code: +res.errCode, message: res.errMsg }
        // }
        return await cmsUser.oauth({
          code: res.code,
          type: 'wechat-app',
        })
      } catch (error) {
        throw error
      }
    } else {
      return { message: duxcmsUserLang.t('user.platformNotSupportAppWechat'), code: 500 }
    }
  },

  wechatLogin: async (code) => {
    try {
      return await cmsUser.oauth({ code, type: 'wechat-mp' })
    } catch (err) {
      if (err.bind) {
        // 绑定账户
        toast(duxcmsUserLang.t('user.pleaseBind'))
        const { backData } = await nav('user/auth/login', { token: err.token })
        const data1 = await backData()
        if (data1.type) {
          return data1.data
        } else {
          throw duxcmsUserLang.t('user.cancelLogin')
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
      data: info
    })
      toast(duxcmsUserLang.t('user.updateSuccess'))
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

requestMiddle.before(async params => {
  let { token = '' } = cmsUser.getUserInfo()
  // 开启调试
  config.devOpen && (token = config.devToken)
  if (token) {
    params.header.Authorization = token.startsWith('Bearer ')
      ? token
      : 'Bearer ' + token
  }
  return params
}, 10)

uploadMiddle.before(async params => {
  let { token = '' } = cmsUser.getUserInfo()
  // 开启调试
  config.devOpen && (token = config.devToken)
  if (!token) {
    await user.login()
    token = cmsUser.getUserInfo().token
  }
  if (token) {
    params.header.Authorization = token.startsWith('Bearer ')
      ? token
      : 'Bearer ' + token
  }
  return params
}, 10)

let isConfirm
requestMiddle.result(async (res, params) => {
  if (res.statusCode === 401) {
    if (user.isLogin()) {
      if (userConfig.option?.duxcmsUser?.singleSign) {
        if (!isConfirm) {
          isConfirm = true
          confirm({
            title: duxcmsUserLang.t('user.singleSignTitle'),
            content: duxcmsUserLang.t('user.singleSignContent'),
            cancel: false
          }).then(async () => {
            isConfirm = false
            await user.logout()
            await asyncTimeOut(100)
            user.login() // 打开登录
          }).catch(() => {
            isConfirm = false
            user.logout()
          })
        }
      } else {
        toast(duxcmsUserLang.t('user.loggedOutNeedRelogin'))
        user.logout()
      }
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
        duxcmsUserLang.t('user.devTokenExpiring', { params: { token: res.header.authorization } })
      )
    } else {
      cmsUser.setInfo({ token: res.header.authorization })
    }
  }
  return res
}, 5)

export { user }

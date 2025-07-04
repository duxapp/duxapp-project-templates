/* eslint-disable react-hooks/rules-of-hooks */
import { asyncTimeOut, currentPage, nav, route, ObjectManage, QuickEvent, pages, getPlatform, TopView, userConfig } from '@/duxapp'
import { useEffect, useState, useMemo } from 'react'
import qs from 'qs'

class UserManage extends ObjectManage {

  constructor() {
    super({
      cacheKey: 'userInfo',
      cache: true,
      cacheSync: true,
      defaultData: {
        status: false
      }
    })
    this.onSet((data, type) => {
      if (type === 'cache') {
        const localInit = config => {
          if (config.isLogin?.(data?.[this.getCurrentApp()])) {
            this.setLoginStatus(true, 'local')
            // 获取线上用户信息
            config.getOnlineUserInfo?.().then(this.setInfo)
          }
        }
        const currentConfig = this.getCurrentConfig()
        if (currentConfig) {
          localInit(currentConfig)
        } else {
          this.localInit = localInit
        }
      }
    }, false, true)
    // 监听路由跳转 如果异步报错则不会跳转
    route.onNavBefore(async pageRouter => {
      if (pageRouter?.login && !this.isLogin()) {
        // 执行登陆 登陆成功后继续跳转
        await this.login()
        // 让路由在停顿一会之后再继续执行
        await asyncTimeOut(100)
      }
    })

    // h5端监听登录
    if (process.env.TARO_ENV === 'h5') {
      setTimeout(() => {
        const params = route.getQueryVariable()
        if (!this.isLogin() && params.wechat_code && params.wechat_code.length === 32) {
          // 微信code登录回调
          const { h5WechatLogin } = this.getCurrentConfig()
          h5WechatLogin?.(params.wechat_code).then(userInfo => {
            this.setInfo(userInfo)
            this.setLoginStatus(true, 'wechat')
          })
        }
        // 微信登录成功 跳转到指定页面
        if (params.wechat_code && params.toPage) {
          const { remove } = this.onLoginStatus(status => {
            if (status) {
              setTimeout(() => {
                route.redirect(params.toPage)
              }, 1000)
            }
            remove()
          })
        } else if (params.toPage) {
          setTimeout(() => {
            route.redirect(params.toPage)
          }, 500)
        }
      }, 50)
    }
  }

  // 当前配置
  config = {
    // 当前的登录状态
    loginStatus: false,
    // 登录类型
    loginType: 'local',
    // 微信H5登录时间
    wechatLoingStatus: 0,
    // 是否正在登录
    isLogin: false,
    // 登录成功回调
    loginEvent: new QuickEvent()
  }

  // 用户配置
  startConfig = userConfig.option?.duxappUser || userConfig.option?.user || {}

  // 注册的登录配置
  appConfigs = {}

  /**
   * 注册登录配置
   * @param {string} name 配置名称
   * @param {object} config 配置内容
   */
  register = (name, config) => {
    if (name === 'status') {
      throw '不能将模块名称注册为status'
    }
    this.appConfigs[name] = config
    if (this.localInit) {
      const currentConfig = this.getCurrentConfig()
      if (currentConfig) {
        this.localInit(currentConfig)
        this.localInit = null
      }
    }
  }

  /**
   * 获取当前登录配置的key
   * @returns
   */
  getCurrentApp = () => {
    return this.startConfig?.use || Object.keys(this.appConfigs)[0]
  }

  /**
   * 获取当前登录配置
   * @returns
   */
  getCurrentConfig = () => {
    return this.appConfigs[this.getCurrentApp()]
  }

  /**
   * 获取模块用户信息
   * @returns
   */
  getUserInfo = (app = this.getCurrentApp()) => {
    return this.data[app] || {}
  }

  /**
   * 使用合并的方式设置用户信息
   * @param {object} info 用户信息
   * @param {string} app 当前app
   * setInfo({avatar: ''})
   */
  setInfo = (info, app = this?.getCurrentApp()) => {
    this.set(old => {
      old[app] = { ...old[app], ...info }
      return { ...old }
    })
    return this.data
  }

  /**
   * 通过键设置属性
   * @param {string} key 用户信息字段
   * @param {any} value 需要设置的值
   * @param {string} app 注册的app名称
   */
  setKey = (key, value, app) => {
    return this.setInfo({ [key]: value }, app)
  }

  /**
   * 判断是否登录
   */
  isLogin = (openLogin, callback) => {
    const loginStatus = this.config.loginStatus || this.getCurrentConfig()?.devOpen
    !!openLogin && !loginStatus && this.login().then(callback)
    return loginStatus
  }

  /**
   * 异步验证用户是否登录
   * 这可以确保在程序初始化的时候正确的判断用户是否登录
   */
  isLoginAsync = async () => {
    if (this.isLogin()) {
      return true
    }
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        remove()
        resolve(this.isLogin())
      }, 500)
      const { remove } = this.event.on((data, type) => {
        if (type === 'cache') {
          clearTimeout(timer)
          remove()
          resolve(this.isLogin())
        } else if (type === 'no-cache') {
          clearTimeout(timer)
          remove()
          resolve(false)
        }
      })
    })

  }

  /**
   * 获取当前登录的用户id
   */
  getUserID = () => {
    return this.getCurrentConfig()?.getUserID(this.getUserInfo())
  }

  /**
   * 去登录
   */
  login = async () => {
    if (getPlatform() === 'wechat' && !this.startConfig?.disableH5Watch) {
      const time = new Date().getTime()
      // 对比上一次调用登录的时间小于2秒则不再执行登录
      if (time - this.config.wechatLoingStatus < 2000) {
        throw { code: 500, message: '微信正在登录中' }
      }
      this.config.wechatLoingStatus = time
      const getH5WechatLoginUrl = this.getCurrentConfig()?.getH5WechatLoginUrl
      if (getH5WechatLoginUrl) {
        let H5LoginUrl
        H5LoginUrl = await getH5WechatLoginUrl()
        // 全局请求参数传到登录页面
        let params = {
          ...route.getQueryVariable()
        }
        // 回调页面 如果当前不在首页传入回调页面
        if (Object.keys(pages)[0] !== currentPage()) {
          params.toPage = window.location.hash.substring(2)
        } else {
          params = {
            ...params,
            ...route.getHashQueryVariable().params
          }
        }

        H5LoginUrl += (H5LoginUrl.indexOf('?') === -1 ? '?' : '&') + qs.stringify(params)
        window.location.replace(H5LoginUrl)
        throw { code: 302, message: '即将跳转到登陆地址' }
      } else {
        throw { code: 500, message: '无法获取H5端的登录地址 登录失败' }
      }
    }

    // 其他登陆先跳转登陆页面登陆成功后执行回调
    if (!this.config.isLogin) {
      this.config.isLogin = true
      if (getPlatform() === 'weapp' && this.startConfig?.weappTelLogin) {
        const WeappTelLogin = this.getCurrentConfig()?.WeappTelLogin
        if (WeappTelLogin) {
          const res = await new Promise((resolve, reject) => {
            const action = TopView.add([WeappTelLogin, {
              onLogin: data => {
                action.remove()
                resolve(data)
              },
              onCancel: () => {
                this.config.isLogin = false
                action.remove()
                reject('用户取消登录')
              },
              onSkip: () => {
                action.remove()
                resolve({ skip: true })
              }
            }])
          })
          if (!res.skip) {
            this.setInfo(res)
            this.setLoginStatus(true, 'weapp-tel')
            this.config.loginEvent.trigger(true)
            this.config.isLogin = false
            return
          }
        }
      }
      nav('duxappUser/auth/login').then(async ({ backData }) => {
        const res = await backData()
        const loginStatus = !!res?.data
        if (loginStatus) {
          this.setInfo(res.data)
          this.setLoginStatus(loginStatus, res.type)
        }
        this.config.loginEvent.trigger(loginStatus)
        this.config.isLogin = false
      })
    }
    return new Promise((resolve, reject) => {
      const stop = this.config.loginEvent.on(status => {
        stop.remove()
        status ? resolve() : reject({ code: 500, message: '登陆失败' })
      })
    })
  }

  /**
   * 退出登录
   */
  logout = async () => {
    if (!!this.logoutTime && Date.now() - this.logoutTime < 3000) {
      return
    }
    this.logoutTime = Date.now()
    // 判断是否采用了强制登录模式
    if (Object.keys(pages).includes('duxappUser/auth/start')) {
      await nav('back:home')
      await asyncTimeOut(300)
      route.redirect('duxappUser/auth/start')
    } else {
      await nav('back:home')
    }
    this.set(old => {
      old[this.getCurrentApp()] = {}
      return { ...old }
    })
    // return
    this.setLoginStatus(false)
  }

  // 登录状态监听 登录和退出登录都会监听
  loginEvent = new QuickEvent()
  // 监听登录状态
  onLoginStatus = callback => {
    if (this.config.loginStatus) {
      callback(true, this.config.loginType)
    }
    return this.loginEvent.on(callback)
  }

  /**
   * 设置登录状态
   * @param {boolean} status true登录 false退出登录
   * @param {string} type local从本地登录 dev调试模式登录 account账号登录 weapp小程序登录 wechat微信登录 appwechat app端微信登录
   * @param {string} set 更新数据
   */
  setLoginStatus = (status, type = 'local') => {
    // 防止重复执行
    if (status === this.config.loginStatus) return
    this.config.loginStatus = status
    this.config.loginType = type
    this.loginEvent.trigger(status, type)
  }

  useUserInfo = (app = this.getCurrentApp()) => {
    const defaultData = useMemo(() => this.getUserInfo(), [])

    const [data, setData] = useState(defaultData)

    const [status, setStauts] = useState(this.config.loginStatus)

    useEffect(() => {
      const { remove } = this.onSet(() => setData(this.getUserInfo(app)))
      const { remove: statusRemove } = this.onLoginStatus(setStauts)
      return () => {
        remove()
        statusRemove()
      }
    }, [app])

    return [data, status, this]
  }
}

/**
 * 用户管理
 */
export const user = new UserManage()

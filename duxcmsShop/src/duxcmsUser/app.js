import config from '@/duxcms/config/request'
import { UserLogin, WeappTelLogin } from './components/user/login'
import { user, cmsUser } from './utils'

// 注册当前模块的登录方式
setTimeout(() => {
  user.register(cmsUser.appName, {
    // 登录页面组件
    UserLogin: cmsUser.LoginPage || UserLogin,
    // 微信快捷登录页面
    WeappTelLogin,
    // 当前是否开启了调试模式
    devOpen: config.devOpen,
    // 用于判断是否登录的方法
    isLogin: data => {
      return !!data?.token
    },
    // 用户用户id的回调
    getUserID: data => data?.id,
    // 获取h5端的登录地址
    getH5WechatLoginUrl: async () => {
      return config.origin + '/wechat/login'
    },
    h5WechatLogin: cmsUser.wechatLogin,
    getOnlineUserInfo: cmsUser.getOnlineUserInfo,
  })
}, 0)

export default {}

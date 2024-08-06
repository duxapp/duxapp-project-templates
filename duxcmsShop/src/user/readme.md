# user
用户管理模块，提供用户信息、用户登录状态的管理，具体的登录逻辑不在此模块里面，需要上层模块实现
## 安装

```bash
yarn duxapp app add user
```

## 配置项

配置位于 `index.js` 的 `option.user`

| 配置 | 说明 |
|  ----  | ----  |
| use | 使用哪个模块注册的用户管理 |
| disableH5Watch | 禁用h5端微信登录 |
| weappTelLogin | 开启小程序端手机号快捷登录 |

## 注册用户管理

用户需要注册一系列参数才能工作，如下是duxcms模块注册的参数

```jsx
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
```

## 常用方法

```jsx
import { user } from '@/user/utils'

// 获取的用户信息
user.getUserInfo()

// 指定获取注册的用户信息
user.getUserInfo('duxcms')

// 设置用户信息 第二个可省略
user.setInfo({avatar: ''}, 'duxcms')

// 设置单个字段的用户信息 第三个参数可省略
user.setKey('avatar', '', 'duxcms')

// 同步放回用户是否登录 和以前的 isLogin功能一致
user.isLogin()

// 去登录 和以前的login功能一致
user.login()

// 退出登录 和以前的logout功能一致
user.logout()

// 获取用户id
user.getUserID()

// 监听用户状态变化 和之前的onUserStatus类似
const { remove } = user.onLoginStatus(status => {
  // status true 登录 false 退出登录
  // 如果用户是登录的状态下执行监听 默认会调用一次status 为 true
})
// 移除监听
remove()

// 在hook中使用
const [userInfo, loginStatus] = user.userUserInfo()

```

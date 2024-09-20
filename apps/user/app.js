import { app, user } from '@/user/utils'

app.register('user', {
  getUserId: user.getUserID,
  isLoing: user.isLogin,
  login: user.login,
  getUserInfo: user.getUserInfo,
  logout: user.logout,
  onLoginStatus: user.onLoginStatus,
  setInfo: user.setInfo,
  setKey: user.setKey,
  setLoginStatus: user.setLoginStatus
})

export default {}

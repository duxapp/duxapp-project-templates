import { userConfig } from '@/duxapp'
import { Agreement } from '@/duxappReactNative'
import { registerApp } from 'react-native-wechat-lib'

export const wechatInit = async () => {
  await Agreement.isComplete()
  const config = userConfig.option?.['react-native-wechat-lib'] || userConfig.option?.wechat?.app || {}
  if (config.appid) {
    registerApp(config.appid, config.universalLink)
  }
}

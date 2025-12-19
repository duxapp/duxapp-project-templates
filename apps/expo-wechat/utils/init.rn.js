import { userConfig } from '@/duxapp'
import { Agreement } from '@/duxappReactNative'
import ExpoWeChat from 'expo-wechat'

export const wechatInit = async () => {
  await Agreement.isComplete()
  const config = userConfig.option?.['expo-wechat'] || userConfig.option?.['react-native-wechat-lib'] || userConfig.option?.wechat?.app || {}
  if (config.appid) {
    ExpoWeChat.registerApp(config.appid, config.universalLink)
  }
}

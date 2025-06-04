import * as WechatLib from 'react-native-wechat-lib'
import { duxappHook } from '@/duxapp'

export {
  WechatLib
}

duxappHook.add('WechatLib', WechatLib)

export const WechatJSSDK = {}

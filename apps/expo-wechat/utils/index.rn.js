import WechatLib from 'expo-wechat'
import { duxappHook } from '@/duxapp'

export {
  WechatLib
}

duxappHook.add('ExpoWeChat', WechatLib)

import { userConfig } from '@/duxapp'
import { wechatInit } from './utils/init'
import { WechatShare } from './components/Share'

wechatInit()

if (userConfig.option?.wechat?.share?.open) {
  // 开启了分享
  WechatShare.init()
}

export default {}

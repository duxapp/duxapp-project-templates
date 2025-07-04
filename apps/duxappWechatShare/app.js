import { userConfig } from '@/duxapp'
import { WechatShare } from './Share'

const share = userConfig.option?.duxappWechatShare || userConfig.option?.wechat?.share || {}

if (share.open) {
  // 开启了分享
  WechatShare.init()
}

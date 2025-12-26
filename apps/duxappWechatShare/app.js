import { WechatShare } from './Share'
import { getUserConfig } from './Share/utils/util'

if (getUserConfig().open) {
  // 开启了分享
  WechatShare.init()
}

import { userConfig } from '@/duxapp'
import { jpushAutoInit } from './utils'

export default {
  effect: () => {
    const config = userConfig.option?.jpush || {}
    if (config.autoInit) {
      jpushAutoInit()
    }
  }
}

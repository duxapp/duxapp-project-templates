import JPush from 'jpush-react-native'
import { userConfig } from '@/duxapp'

export const jpushAutoInit = () => {
  const config = userConfig.option?.jpush || {}
  if (!config.key) {
    console.log('jpush初始化失败：请设置option.jpush.key')
    return
  }
  JPush.init({ appKey: config.key, channel: config.channel || 'duxapp', production: 1 })

  JPush.addConnectEventListener(result => {
    console.log('链接事件', result)
    if (result.connectEnable) {
      JPush.getRegistrationID(id => {
        console.log('注册id:', id)
      })
    }
  })

  JPush.addNotificationListener(result => {
    console.log('通知事件', result)
  })

  JPush.addLocalNotificationListener(result => {
    console.log('本地通知事件', result)
  })

  JPush.addCustomMessageListener(result => {
    console.log('本地通知事件', result)
  })

  JPush.addTagAliasListener(result => {
    console.log('tag alias事件', result)
  })
}

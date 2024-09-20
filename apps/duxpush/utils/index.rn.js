import DuxPush from 'react-native-dux-push'
import { userConfig } from '@/duxapp'
import { Alert } from 'react-native'

export {
  DuxPush
}

export const duxPushInit = ({ onClick, onNotifyClick }) => {

  const config = userConfig.option?.duxpush || {}

  DuxPush.init(config.duxPushID, '', {
    umeng: config.umAppKey
  })

  const callback = status => {
    if (status) {
      setTimeout(() => {
        // 检测是否开通通知权限，未开通提示开通
        DuxPush.notificationsEnabled?.()?.then(res => {
          if (!res) {
            Alert.alert(
              '通知权限',
              '您当前未开启通知权限，您将无法收到消息推送，是否立即前往设置开启通知权限？',
              [
                { text: '取消', onPress: () => { }, style: 'cancel' },
                {
                  text: '立即前往', onPress: () => DuxPush.goPushSetting()
                }
              ]
            )
          }
        })
      }, 3000)
      DuxPush.addEventListener('duxpush_click', onClick)
      DuxPush.addEventListener('duxpush_notify', onNotifyClick)
    } else {
      DuxPush.unsetAlias('')
    }
  }
  return {
    callback,
    DuxPush,
    remove: () => {
      DuxPush.removeEventListener('duxpush_click')
      DuxPush.removeEventListener('duxpush_notify')
    }
  }
}

import DuxPush from 'react-native-dux-push'

export {
  DuxPush
}

// 初始化
export const duxPushInit: (
  params: { onClick: () => void, onNotifyClick: () => void }
) => void
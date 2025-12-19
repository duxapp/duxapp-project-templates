import { Agreement } from '@/duxappReactNative'
import { ExpoGaodeMapModule } from 'expo-gaode-map'

export const amapInit = async () => {
  await Agreement.isComplete()
  // 方法不存在
  ExpoGaodeMapModule.updatePrivacyCompliance?.(true)
}

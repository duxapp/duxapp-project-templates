import { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default function Temp({ change }) {
  useDidShow(() => {
    change?.()
  })

  return <View></View>
}

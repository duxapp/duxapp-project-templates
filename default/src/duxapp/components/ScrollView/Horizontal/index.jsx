import { View, ScrollView } from '@tarojs/components'
import './index.scss'

export const Horizontal = ({ children, style, ...props }) => {
  return <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    {...props}
    style={style}
    className='scroll-view-horizontal-scroll'
    scrollX
    scrollY={false}
  >
    <View className='scroll-view-horizontal'>
      {children}
    </View>
  </ScrollView>
}


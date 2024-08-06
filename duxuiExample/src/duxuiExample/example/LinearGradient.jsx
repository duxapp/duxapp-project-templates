import { LinearGradient, Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import Taro from '@tarojs/taro'

export default function LinearGradientExample() {
  return <TopView>
    <Header title='LinearGradient' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <LinearGradient colors={['#e94727', '#6661ee']} style={{ height: Taro.pxTransform(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='从左到右'>
          <LinearGradient colors={['#e94727', '#6661ee']} useAngle angle={90} style={{ height: Taro.pxTransform(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='从右到左'>
          <LinearGradient colors={['#e94727', '#6661ee']} useAngle angle={270} style={{ height: Taro.pxTransform(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='指定角度' desc='RN端角度与h5端会有差异'>
          <LinearGradient colors={['#e94727', '#6661ee']} useAngle angle={155} style={{ height: Taro.pxTransform(200) }}>
          </LinearGradient>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

import { LinearGradient, Header, ScrollView, TopView, GroupList, px, Text, Column } from '@/duxuiExample'

export default function LinearGradientExample() {
  return <TopView>
    <Header title='LinearGradient' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <LinearGradient colors={['#e94727', '#6661ee']} style={{ height: px(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='从左到右'>
          <LinearGradient colors={['#e94727', '#6661ee']} useAngle angle={90} style={{ height: px(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='从右到左'>
          <LinearGradient colors={['#e94727', '#6661ee']} useAngle angle={270} style={{ height: px(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='指定角度' desc='RN端角度与h5端会有差异'>
          <LinearGradient colors={['#e94727', '#6661ee']} useAngle angle={155} style={{ height: px(200) }}>
          </LinearGradient>
        </GroupList.Item>
        <GroupList.Item title='不透明度'>
          <Column style={{ height: px(200) }} items='center' justify='center'>
            <LinearGradient
              colors={['#e94727', 'rgba(0,0,0,0.2)']}
              useAngle angle={90}
              className='inset-0 absolute'
            />
            <Text>底部文本展示 底部文本展示 底部文本展示 底部文本</Text>
          </Column>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

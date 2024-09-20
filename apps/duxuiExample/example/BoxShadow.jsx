import { BoxShadow, Header, ScrollView, TopView, GroupList, Text } from '@/duxuiExample'
import './BoxShadow.scss'

export default function BoxShadowExample() {
  return <TopView>
    <Header title='BoxShadow' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <BoxShadow className='box-shadow-item'>
            <Text>这是内容</Text>
          </BoxShadow>
        </GroupList.Item>
        <GroupList.Item title='圆角'>
          <BoxShadow className='box-shadow-item' radius={16}>
            <Text>这是内容</Text>
          </BoxShadow>
        </GroupList.Item>
        <GroupList.Item title='更多样式' desc='阴影不建议设置较深颜色，RN端是模拟实现的，颜色较深则容易看出差异'>
          <BoxShadow className='box-shadow-item' radius={16} color='#333' opacity={0.3} border={20}>
            <Text>这是内容</Text>
          </BoxShadow>
        </GroupList.Item>
        <GroupList.Item title='倾斜方向'>
          <BoxShadow className='box-shadow-item' radius={16} color='#333' opacity={0.3} border={20} x={10} y={10}>
            <Text>这是内容</Text>
          </BoxShadow>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

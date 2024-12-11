import { BoxShadow, Header, ScrollView, TopView, GroupList, Text, duxappTheme } from '@/duxuiExample'
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
        <GroupList.Item title='深色'>
          <BoxShadow className='box-shadow-item' radius={16} color='#333' opacity={0.3} border={20}>
            <Text>这是内容</Text>
          </BoxShadow>
        </GroupList.Item>
        <GroupList.Item title='指定颜色'>
          <BoxShadow className='box-shadow-item' radius={16} color={duxappTheme.primaryColor} opacity={0.3} border={20}>
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

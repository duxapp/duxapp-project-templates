import { Header, ScrollView, TopView, GroupList, Text, Absolute, Column } from '@/duxuiExample'

export default function AbsoluteExample() {

  return <TopView>
    <Header title='Absolute' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='绝对定位' desc='此容器的children将会被渲染到TopView的内部，而不是当前位置'>
          <Absolute>
            <Column style={{ backgroundColor: '#fff', padding: 12 }}>
              <Text>这是Absolute的子元素，但是最终渲染位置在这里</Text>
            </Column>
          </Absolute>
        </GroupList.Item>
        <GroupList.Item title='浮动' desc='加上绝对定位的css样式即可浮动'>
          <Absolute>
            <Column style={{ backgroundColor: '#fff', padding: 12, top: 300 }} className=' absolute left-0'>
              <Text>这是Absolute的子元素，但是最终渲染位置在这里</Text>
            </Column>
          </Absolute>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

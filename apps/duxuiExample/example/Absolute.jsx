import { Header, ScrollView, TopView, GroupList, Text, Absolute, Column, px } from '@/duxuiExample'

export default function AbsoluteExample() {

  return <TopView>
    <Header title='Absolute' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='绝对定位' desc='此容器的children将会被渲染到TopView的内部，而不是当前位置'>
          <Absolute>
            <Column className='p-3 bg-white items-start'>
              <Text>这是Absolute的子元素，但是最终渲染位置在这里</Text>
            </Column>
          </Absolute>
        </GroupList.Item>
        <GroupList.Item title='浮动' desc='加上绝对定位的css样式即可浮动'>
          <Absolute>
            <Column style={{ top: px(600) }} className='absolute left-0 p-3 bg-white items-start'>
              <Text>这是Absolute的子元素，但是最终渲染位置在这里</Text>
            </Column>
          </Absolute>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

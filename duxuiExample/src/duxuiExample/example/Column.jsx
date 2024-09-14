import { Header, ScrollView, TopView, GroupList, Column, Text } from '@/duxuiExample'

const list = [1, 2, 3]

const Child = () => {

  return list.map(item => <Column key={item} className='p-3 bg-white r-2'>
    <Text>内容{item}</Text>
  </Column>)
}

export default function ColumnExample() {
  return <TopView>
    <Header title='Column' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='默认竖向'>
          <Column className='gap-2'>
            <Child />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='内容居中'>
          <Column items='center' className='gap-2'>
            <Child />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='内容开始'>
          <Column items='start' className='gap-2'>
            <Child />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='内容结束'>
          <Column items='end' className='gap-2'>
            <Child />
          </Column>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

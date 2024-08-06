import { Header, ScrollView, TopView, GroupList, Column, Text } from '@/duxuiExample'

const list = [1, 2, 3]

const Child = () => {

  return list.map(item => <Column key={item} style={{ padding: 12, backgroundColor: '#fff' }}>
    <Text>内容{item}</Text>
  </Column>)
  return
}

export default function ColumnExample() {

  return <TopView>
    <Header title='Column' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='默认竖向'>
          <Column style={{ gap: 10 }}>
            <Child />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='内容居中'>
          <Column items='center' style={{ gap: 10 }}>
            <Child />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='内容开始'>
          <Column items='start' style={{ gap: 10 }}>
            <Child />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='内容结束'>
          <Column items='end' style={{ gap: 10 }}>
            <Child />
          </Column>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

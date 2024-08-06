import { Header, ScrollView, TopView, GroupList, Column, Row, Text } from '@/duxuiExample'

const list1 = [1, 2, 3, 4, 5]

const list2 = [1, 2, 3]

const list3 = [1, 2, 3, 4, 5, 6, 7]

const Child = ({
  list = list1
}) => {

  return list.map(item => <Column key={item} style={{ padding: 12, backgroundColor: '#fff', height: 20 * item }}>
    <Text>内容{item}</Text>
  </Column>)
  return
}

export default function RowExample() {

  return <TopView>
    <Header title='Row' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='默认'>
          <Row style={{ gap: 10 }}>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='items居中'>
          <Row items='center' style={{ gap: 10 }}>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='items开始'>
          <Row items='start' style={{ gap: 10 }}>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='items结束'>
          <Row items='end' style={{ gap: 10 }}>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify开始'>
          <Row justify='start' style={{ gap: 10 }}>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify居中'>
          <Row justify='center' style={{ gap: 10 }}>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify结束'>
          <Row justify='end' style={{ gap: 10 }}>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify两端'>
          <Row justify='between' style={{ gap: 10 }}>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify周围'>
          <Row justify='around' style={{ gap: 10 }}>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='换行'>
          <Row wrap style={{ gap: 10 }}>
            <Child list={list3} />
          </Row>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

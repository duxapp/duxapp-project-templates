import { Header, ScrollView, TopView, GroupList, Column, Row, Text } from '@/duxuiExample'

const list1 = [1, 2, 3, 4, 5]

const list2 = [1, 2, 3]

const list3 = [1, 2, 3, 4, 5, 6, 7]

const Child = ({
  list = list1
}) => {

  return list.map(item => <Column key={item} className='p-2 bg-white' style={{ height: 24 * item }}>
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
          <Row className='gap-2'>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='items居中'>
          <Row items='center' className='gap-2'>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='items开始'>
          <Row items='start' className='gap-2'>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='items结束'>
          <Row items='end' className='gap-2'>
            <Child />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify开始'>
          <Row justify='start' className='gap-2'>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify居中'>
          <Row justify='center' className='gap-2'>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify结束'>
          <Row justify='end' className='gap-2'>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify两端'>
          <Row justify='between' className='gap-2'>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='justify周围'>
          <Row justify='around' className='gap-2'>
            <Child list={list2} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='换行'>
          <Row wrap className='gap-2'>
            <Child list={list3} />
          </Row>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

import { Column, Empty, TopView, Header, Elevator } from '@/duxui'

const list = [
  {
    name: 'A', children: [
      { name: 'A1' },
      { name: 'A2' },
      { name: 'A3' },
      { name: 'A4' },
      { name: 'A5' },
      { name: 'A6' },
      { name: 'A7' }
    ]
  },
  {
    name: 'B', children: [
      { name: 'B1' },
      { name: 'B2' },
      { name: 'B3' },
      { name: 'B4' },
      { name: 'B5' },
      { name: 'B6' },
      { name: 'B7' }
    ]
  },
  {
    name: 'C', children: [
      { name: 'C1' },
      { name: 'C2' },
      { name: 'C3' },
      { name: 'C4' },
      { name: 'C5' },
      { name: 'C6' },
      { name: 'C7' }
    ]
  }
]

export default function ElevatorExample() {
  return <TopView>
    <Header title='Elevator' />
    <Column grow style={{ padding: 12 }}>
      <Elevator
        onItemClick={item => console.log('项目点击', item)}
        renderTop={<>
          <Elevator.Search placeholder='输入城市名称进行搜索' />
        </>}
        renderEmpty={<Empty title='该城市未开通' />}
        list={list}
      />
    </Column>
  </TopView>
}

import { Column, Empty, TopView, Header, Elevator, ElevatorSearch } from '@/duxui'

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
  },
  {
    name: 'D', children: [
      { name: 'D1' },
      { name: 'D2' },
      { name: 'D3' },
      { name: 'D4' }
    ]
  },
  {
    name: 'E', children: [
      { name: 'E1' },
      { name: 'E2' },
      { name: 'E3' },
      { name: 'E4' }
    ]
  },
  {
    name: 'F', children: [
      { name: 'F1' },
      { name: 'F2' },
      { name: 'F3' },
      { name: 'F4' }
    ]
  }
]

export default function ElevatorExample() {
  return <TopView>
    <Header title='Elevator' />
    <Column grow style={{ padding: 12 }} className='bg-white m-3 r-2'>
      <Elevator
        onItemClick={item => console.log('项目点击', item)}
        renderTop={<>
          <ElevatorSearch placeholder='输入名称进行搜索' />
        </>}
        renderEmpty={<Empty title='没有内容' />}
        list={list}
      />
    </Column>
  </TopView>
}

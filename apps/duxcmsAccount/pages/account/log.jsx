import { Card, Column, Divider, Header, Text, TopView, Row, Empty, Tab, TabItem } from '@/duxui'
import { List } from '@/duxcmsAccount'
import { useState } from 'react'


export default function Log() {

  const [fund, setFund] = useState(0)

  return <TopView>
    <Header title='账单' />
    <Tab className='bg-white' value={fund} onChange={setFund}>
      {
        tabs.map(item => <TabItem key={item.value} title={item.name} paneKey={item.value} />)
      }
    </Tab>
    <Card margin className='flex-grow' verticalPadding={false}>
      <List
        url='member/accountLog'
        renderItem={Item}
        data={{ fund }}
        renderLine={<Divider padding={24} />}
        renderEmpty={<Empty title='暂无记录' />}
      />
    </Card>
  </TopView>
}

const tabs = [
  { name: '全部', value: 0 },
  { name: '可提现', value: 1 },
  { name: '不可提现', value: 2 }
]

const Item = ({ item }) => {
  return <Row justify='between' items='center' className='gap-1 pv-2'>
    <Column className='gap-1 overflow-hidden' grow>
      <Text size={4} bold>{item.remark}</Text>
      <Text color={3} size={1}>{item.completed_at}</Text>
    </Column>
    <Column items='end'>
      <Text size={6} bold type={item.type ? 'danger' : 'success'}>{item.type ? '+' : '-'}{+item.balance}</Text>
      <Text size={1} color={3}>余额：{item.account_amount || '-'}</Text>
    </Column>
  </Row>
}

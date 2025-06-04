import { Card, Empty, Column, Divider, Header, Text, TopView, Row, Tab, TabItem } from '@/duxui'
import { useMemo, useState } from 'react'
import { List } from '@/duxcmsAccount'


export default function CashLog() {

  const [type, setType] = useState(0)

  const listData = useMemo(() => ({ type }), [type])

  return <TopView>
    <Header title='提现明细' />
    <Tab value={type} onChange={setType}>
      {tab.map(item => <TabItem key={item.type} title={item.text} paneKey={item.type} />)}
    </Tab>
    <Card margin className='flex-grow'>
      <List
        url='member/cash'
        data={listData}
        renderItem={Item}
        renderLine={<Divider />}
        renderEmpty={<Empty title='暂无记录' />}
      />
    </Card>
  </TopView>
}

const Item = ({ item }) => {
  return <Column>
    <Row justify='between' items='center'>
      <Text size={1}>扣除手续费：¥{item.tax_amount}</Text>
      {
        item.status === 0 &&
        <Text size={4} bold type='danger'>{statsuMap[item.status]}</Text>
      }
      {
        item.status === 1 &&
        <Text size={4} bold type='warning'>{statsuMap[item.status]}</Text>
      }
      {
        item.status === 2 &&
        <Text size={4} bold type='success'>{statsuMap[item.status]}</Text>
      }
      {
        item.status === 3 &&
        <Text size={4} bold type='primary'>{statsuMap[item.status]}</Text>
      }
    </Row>
    <Row className='mt-1' justify='between' items='center'>
      <Text size={4} bold>{item.amount}</Text>
      <Text size={1} color={2}>{item.completed_at}</Text>
    </Row>
  </Column>
}

const statsuMap = {
  0: '已驳回',
  1: '待审核',
  2: '处理中',
  3: '已通过',
}

const tab = [{
  text: '全部',
  type: 0
}, {
  text: '待审核',
  type: 1
}, {
  text: '已通过',
  type: 3
}, {
  text: '已驳回',
  type: 4
}]
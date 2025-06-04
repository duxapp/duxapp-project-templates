import { Column, Empty, Header, Image, Row, Tab, Text, TopView, nav, px, useRoute, TabItem } from '@/duxui'
import { List } from '@/duxcmsOrder'
import { useState } from 'react'

export default function RefundList() {
  const { params } = useRoute()

  const [navType, setNavType] = useState(params.type | 0)

  return <TopView>
    <Header title='退款/售后' />
    <Tab value={navType} onChange={setNavType} className='bg-white rb-3'>
      {
        navList.map(item => <TabItem key={item.value} paneKey={item.value} title={item.text} />)
      }
    </Tab>
    <List
      url='order/refund'
      data={{
        type: navType,
      }}
      renderItem={Item}
      renderEmpty={<Empty title='暂无售后' />}
    />
  </TopView>
}

const navList = [
  { text: '全部', value: 0 },
  { text: '待审核', value: 1 },
  { text: '待退货', value: 2 },
  { text: '退货中', value: 3 },
  { text: '已退款', value: 4 }
]

const Item = ({ item, index }) => {
  return <Column
    className='m-3 r-2 bg-white p-3 gap-3'
    style={index ? { marginTop: 0 } : {}}
    onClick={() => nav('duxcmsOrder/refund/detail', { id: item.id })}
  >
    <Row justify='between'>
      <Text size={1} >{item.refund_no}</Text>
      <Text size={1}>{item.state_name}</Text>
    </Row>
    {
      item.goods.map(good => <GoodsItem key={good.id} item={good} />)
    }
    <Text self='end' className='mv-1'>退款：￥{item.price} 退运费：￥{item.freight}</Text>
  </Column>
}

const GoodsItem = ({ item }) => {
  return <Row className='gap-3'>
    <Image src={item.goods_image} className='r-2' square style={{ width: px(160) }} />
    <Column grow justify='between' className='pv-1 overflow-hidden'>
      <Row items='center' justify='between'>
        <Text bold size={2} numberOfLines={1} grow>{item.goods_name}</Text>
        <Text bold size={2}><Text size={1}>￥</Text>{item.goods_price}</Text>
      </Row>
      <Row items='center' justify='between'>
        <Text size={2} color={3} numberOfLines={1}>{item.goods_spec}</Text>
        <Text bold size={2} color={2}>x{item.goods_num}</Text>
      </Row>
    </Column>
  </Row>
}

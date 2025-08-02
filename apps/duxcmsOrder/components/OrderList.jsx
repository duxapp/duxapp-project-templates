import { Button, Column, Empty, Header, Image, Row, Tab, Text, colorLighten, duxappTheme, nav, px, stopPropagation, useRoute, TabItem } from '@/duxui'
import { order, orderHook } from '@/duxcmsOrder/utils'
import { List, HeaderSearch } from '@/duxcms'
import { useState } from 'react'

export const OrderList = () => {
  const { params } = useRoute()

  const [navType, setNavType] = useState(params.type | 0)

  const [keyword, setKeyword] = useState('')

  return <>
    <Header
      renderHeader={<Row className='h-full pv-1'>
        <Header.Back />
        <HeaderSearch placeholder='搜索订单' onChange={setKeyword} style={{ marginRight: px(24) }} />
      </Row>}
    />
    <Tab value={navType} onChange={setNavType} className='bg-white rb-3'>
      {
        navList.map(item => <TabItem key={item.value} paneKey={item.value} title={item.name} />)
      }
    </Tab>
    <List
      url='order/order'
      data={{
        ...params,
        keyword,
        type: navType,
      }}
      renderItem={Item}
      listCallback={order.getListStatus}
      renderEmpty={<Empty title='暂无订单' />}
    />
  </>
}

const navList = [
  { name: '全部', value: 0 },
  { name: '待付款', value: 1 },
  { name: '待发货', value: 3 },
  { name: '待收货', value: 4 },
  { name: '已完成', value: 6 }
]

const Item = ({ item, index, action }) => {
  return <Column
    className='m-3 r-2 bg-white'
    style={index ? { marginTop: 0 } : {}}
    onClick={() => nav('duxcmsOrder/order/detail', { id: item.id })}
  >
    <Row className='ph-3 pv-2 r-2' items='center' justify='between' style={{ backgroundColor: colorLighten(duxappTheme.primaryColor, 0.8) }}>
      <Text size={1} color='#373737'>订单编号: <Text bold>{item.order_no}</Text></Text>
      <Text type='primary' color={item.statusData.color}>{item.statusData.name}</Text>
    </Row>
    <Column className='p-3 gap-3'>
      {
        item.goods.map(goods => <GoodsItem key={goods.id} item={goods} order={item} />)
      }
      <Text self='end' className='mv-1'>共{item.goods.reduce((prev, curr) => prev + curr.goods_num, 0)}件商品  合计￥<Text bold>{item.pay_price}</Text></Text>
      <Row justify='end' className='gap-2' onClick={stopPropagation}>
        {item.statusData.btns?.includes('cancel') && <Button onClick={() => order.cancel(item.id).then(action.reload)}>取消订单</Button>}
        {item.statusData.btns.includes('pay') && <Button type='primary' onClick={() => order.pay(item.id).then(action.reload)}>去支付</Button>}
        {item.statusData.btns.includes('receive') && <Button type='primary' plain onClick={() => order.receive(item.id).then(action.reload)}>确认收货</Button>}
        {item.statusData.btns.includes('comment') && <Button type='primary' plain onClick={() => order.comment(item.id)}>去评价</Button>}
      </Row>
    </Column>
  </Column>
}

const GoodsItem = ({ item, order }) => {
  return <Row className='gap-3'>
    <Image src={item.goods_image} className='r-2' square style={{ width: px(160) }} />
    <Column grow justify='between' className='pv-1 overflow-hidden'>
      <Row items='center' justify='between'>
        <Text bold size={2} numberOfLines={1} grow>{item.goods_name}</Text>
        <Text bold size={2}><Text size={1}>￥</Text>{item.goods_price}</Text>
      </Row>
      {item.service_status === 1 && <Text type='warning' size={2}>售后中</Text>}
      {item.service_status === 2 && <Text type='success' size={2}>售后完成</Text>}
      <orderHook.Render mark='order.list.item.spec-num' option={{ item, order }}>
        <Row items='center' justify='between'>
          <Text size={2} color={3} numberOfLines={1}>{item.goods_spec}</Text>
          <Text bold size={2} color={2}>x{item.goods_num}</Text>
        </Row>
      </orderHook.Render>
    </Column>
  </Row>
}

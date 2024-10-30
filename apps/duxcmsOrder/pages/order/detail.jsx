import { Button, Header, Row, TopView, useRoute, Column, Card, Divider, Image, Text, duxappTheme, px, contextState, nav } from '@/duxui'
import { Detail, order, CmsIcon, Price, orderHook } from '@/duxcmsOrder'
import { setClipboardData } from '@tarojs/taro'
import bg from './images/order-bg.png'

export default function OrderDetail() {
  const { params } = useRoute()

  return <TopView>
    <Detail
      url={`order/order/${params.id}`}
      container={Container}
      reloadForShow
    >{Content}</Detail>
  </TopView>
}

const Container = ({
  data,
  action,
  children
}) => {

  return <contextState.Provider value={{ data, action }}>
    <Header title='订单详情' />
    {children}
    <orderHook.Render mark='detail.footer'>{Footer}</orderHook.Render>
  </contextState.Provider>

}

const Content = () => {

  return <>
    <orderHook.Render mark='order.detail.top'>{OrderTopInfo}</orderHook.Render>
    <orderHook.Render mark='order.detail.goods'>{OrderGoods}</orderHook.Render>
    <orderHook.Render mark='order.detail.info'>{OrderInfo}</orderHook.Render>
    <orderHook.Render mark='order.detail.total'>{OrderTotal}</orderHook.Render>
    <Column className='pv-1' />
  </>
}

const Footer = () => {

  const { params } = useRoute()

  const [{ data, action }] = contextState.useState()

  const statusData = data.id ? order.getStatus({ ...data, goods: data.goods }).statusData : {}

  return <Row items='center' justify='end' className='p-3 bg-white gap-3'>
    <orderHook.Render mark='detail.footer.express'>
      {statusData.btns?.includes('express') && <Button onClick={() => order.express(params.id)}>查看物流</Button>}
    </orderHook.Render>
    {statusData.btns?.includes('refund') && <Button onClick={() => order.refund(params.id).then(action.reload)}>售后</Button>}
    {statusData.btns?.includes('cancel') && <Button onClick={() => order.cancel(params.id).then(action.reload)}>取消订单</Button>}
    {statusData.btns?.includes('pay') && <Button type='primary' onClick={() => order.pay(params.id).then(action.reload)}>去支付</Button>}
    {statusData.btns?.includes('receive') && <Button type='primary' plain onClick={() => order.receive(params.id).then(action.reload)}>确认收货</Button>}
    {statusData.btns?.includes('comment') && <Button type='primary' plain onClick={() => order.comment(params.id)}>去评价</Button>}
  </Row>
}

export const OrderTopInfo = () => {

  const [{ data: { receive = {}, ...info } }] = contextState.useState()

  const statusData = info.id ? order.getStatus(info).statusData : {}

  return <Column className='pv-3'>
    <Image src={bg} className='absolute left-0 top-0 w-full rb-3 h-full' style={{ backgroundColor: duxappTheme.primaryColor }} />
    <Row items='center' className='gap-2 ph-3 mv-1'>
      {!!statusData.icon && <CmsIcon name={statusData.icon} size={64} color='#fff' />}
      <Text size={7} color={4} bold grow>{statusData.name}</Text>
      {statusData.btns?.includes('pay') && <Price color={4}>{info.pay_price}</Price>}
    </Row>
    <orderHook.Render mark='order.detail.top.receive'>
      <Card className='gap-2' margin disableMarginBottom>
        <Row className='gap-2'>
          <CmsIcon name='map' size={40} color={duxappTheme.primaryColor} />
          <Text bold>{receive.name} {receive.tel}</Text>
        </Row>
        <Row className='gap-2'>
          <CmsIcon name='map' size={40} color='#fff' />
          <Text color={2} numberOfLines={1} grow>{receive.province}{receive.city}{receive.region}{receive.street}{receive.address}</Text>
        </Row>
      </Card>
    </orderHook.Render>
  </Column>
}

export const OrderGoods = () => {

  const [{ data: { goods = [], ...info } }] = contextState.useState()

  return <Column className='p-1 r-2 bg-white mh-3 mt-3'>
    <Column className='p-2 gap-2'>
      {
        goods.map(item => <GoodsItem key={item.id} item={item} />)
      }
      <orderHook.Render mark='order.detail.goods.count'>
        <Text self='end' className='mv-1'>共{goods.reduce((prev, curr) => prev + curr.goods_num, 0)}件商品  合计<Price bold color={1}>{info.pay_price}</Price></Text>
      </orderHook.Render>
    </Column>
  </Column>
}

const GoodsItem = ({ item }) => {

  return <Row className='gap-3'>
    <Image src={item.goods_image} className='r-2' square style={{ width: px(160) }} />
    <Column grow justify='between' className='pv-1 overflow-hidden'>
      <Row items='center' justify='between'>
        <Text bold size={2} numberOfLines={1} grow>{item.goods_name}</Text>
        <Price color={1} bold size={2}>{item.goods_price}</Price>
      </Row>
      {item.service_status === 1 && <Text type='warning' size={2}>售后中</Text>}
      {item.service_status === 2 && <Text type='success' size={2}>售后完成</Text>}
      <orderHook.Render mark='order.detail.goods.item.spec-num'>
        <Row items='center' justify='between'>
          <Text bold size={2} color={3} numberOfLines={1}>{item.goods_spec}</Text>
          <Text bold size={2} color={2}>x{item.goods_num}</Text>
        </Row>
      </orderHook.Render>
    </Column>
  </Row>
}


export const OrderInfo = () => {
  const [{ data: { goods = [], ...info } }] = contextState.useState()

  return <Card margin disableMarginBottom className='gap-3'>
    <Text bold size={4}>订单信息</Text>
    <Row className='gap-4' items='center'>
      <Text color={2}>下单编号</Text>
      <Row items='center' className='gap-2'>
        <Text bold>{info.order_no}</Text>
        <Column className='pv-1 ph-2 r-1' style={{ backgroundColor: '#A1A6B6' }} onClick={() => setClipboardData({ data: info.refund_no })}>
          <Text color={4} size={1}>复制</Text>
        </Column>
      </Row>
    </Row>
    <Row className='gap-4' items='center'>
      <Text color={2}>下单时间</Text>
      <Text bold>{info.created_at}</Text>
    </Row>
    <Divider padding={0} />
    <Row className='gap-4' items='center'>
      <Text color={2}>支付方式</Text>
      <Text bold>{info.pay_way_name}</Text>
    </Row>
    {!!info.pay_at && <Row className='gap-4' items='center'>
      <Text color={2}>支付时间</Text>
      <Text bold>{info.pay_at}</Text>
    </Row>}
    <Divider padding={0} />
    <Row className='gap-4' items='center'>
      <Text color={2}>买家留言</Text>
      <Text bold>{info.receive?.remark || '无'}</Text>
    </Row>
    {!!info.delivery_type_name && <Row className='gap-4' items='center'>
      <Text color={2}>配送方式</Text>
      <Text bold>{info.delivery_type_name}</Text>
    </Row>}
  </Card>
}

export const OrderTotal = () => {

  const [{ data }] = contextState.useState()

  return <Card margin disableMarginBottom className='gap-3'>
    <Row items='center' justify='between'>
      <Text color={2}>订单总额</Text>
      <Price bold color={1}>{data.order_price}</Price>
    </Row>
    <Row items='center' justify='between'>
      <Text color={2}>运费</Text>
      <Price bold color={1}>{data.delivery_price}</Price>
    </Row>
    {
      data.premium_data?.map(item => <Row key={item.type} items='center' justify='between'>
        <Text color={2}>{item.name}</Text>
        <Price bold color={1}>{item.price}</Price>
      </Row>)
    }
    {
      data.discount_data?.map(item => <Row key={item.type} items='center' justify='between'>
        <Text color={2}>{item.name}</Text>
        <Price bold type='danger'>{-item.price}</Price>
      </Row>)
    }
    {+data.discount_price > 0 && <Row items='center' justify='between'>
      <Text color={2}>总优惠</Text>
      <Price bold type='danger'>{-data.discount_price || 0}</Price>
    </Row>}
    <Row items='center' justify='between'>
      <Text color={2}>实付款</Text>
      <Price bold type='primary'>{data.pay_price}</Price>
    </Row>
  </Card>
}

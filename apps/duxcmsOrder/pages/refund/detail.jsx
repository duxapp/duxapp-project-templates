import { Button, Header, Row, TopView, useRoute, Column, Card, Divider, Image, Text, duxappTheme, px, contextState, nav, Grid, ImageGroup } from '@/duxui'
import { Detail, Price, orderHook } from '@/duxcmsOrder'
import { setClipboardData } from '@tarojs/taro'
import bg from '../order/images/order-bg.png'

export default function RefundDetail() {
  const { params } = useRoute()

  return <TopView>
    <Header title='售后详情' />
    <Detail
      url={`order/refund/${params.id}`}
      container={Container}
      reloadForShow
    >{Content}</Detail>
  </TopView>
}
const Container = ({
  data,
  children
}) => {

  return <contextState.Provider value={data}>
    {children}
  </contextState.Provider>
}

const Content = () => {

  return <>
    <orderHook.Render mark='refund.detail.top'>{RefundTopInfo}</orderHook.Render>
    <orderHook.Render mark='refund.detail.express'>{RefundExpress}</orderHook.Render>
    <orderHook.Render mark='refund.detail.goods'>{RefundGoods}</orderHook.Render>
    <orderHook.Render mark='refund.detail.info'>{RefundInfo}</orderHook.Render>
  </>
}

export const RefundTopInfo = () => {

  const [info] = contextState.useState()

  return <Column className='pv-3'>
    <Image src={bg} className='absolute left-0 top-0 w-full rb-3 h-full' style={{ backgroundColor: duxappTheme.primaryColor }} />
    <Column className='gap-2 ph-3 mv-1'>
      <Text size={7} color={4} bold>{info.state_name}</Text>
    </Column>
    <Card className='gap-2' margin disableMarginBottom>
      <Text>退款总金额：￥{+info.price || 0}</Text>
    </Card>
  </Column>
}

const RefundExpress = () => {
  const { params } = useRoute()

  const [{ _meta: { address = {} } = {}, state, delivery_name, delivery_no }] = contextState.useState()

  if (state === 2) {
    return <Column className='p-3 r-2 bg-white mh-3 mt-3 gap-2'>
      <Text bold size={6}>商家已同意退货申请，请尽早退换货</Text>
      <Text className='mt-1' bold>{address.name} {address.tel}</Text>
      <Text size={1} color={3}>{address.arta}{address.address}</Text>
      <Button className='mt-2' type='primary'
        onClick={() => nav('duxcmsOrder/refund/express', { id: params.id })}
      >去发货</Button>
    </Column>
  } else if (state === 3) {
    if (!delivery_no) {
      return
    }
    return <Column className='p-3 r-2 bg-white mh-3 mt-3 gap-3'>
      <Text bold size={4}>快递信息</Text>
      <Row className='gap-4' items='center'>
        <Text color={2}>快递公司</Text>
        <Text bold>{delivery_name}</Text>
      </Row>
      <Row className='gap-4' items='center'>
        <Text color={2}>快递单号</Text>
        <Row items='center' className='gap-2'>
          <Text bold>{delivery_no}</Text>
          <Column className='pv-1 ph-2 r-1' style={{ backgroundColor: '#A1A6B6' }} onClick={() => setClipboardData({ data: delivery_no })}>
            <Text color={4} size={1}>复制</Text>
          </Column>
        </Row>
      </Row>
    </Column>
  }
}

export const RefundGoods = () => {

  const [{ goods = [] }] = contextState.useState()
  return <Column className='p-1 r-2 bg-white mh-3 mt-3'>
    <Column className='p-2 gap-2'>
      {
        goods.map(item => <GoodsItem key={item.id} item={item} />)
      }
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
      <Row items='center' justify='between'>
        <Text bold size={2} color={3} numberOfLines={1}>{item.goods_spec}</Text>
        <Text bold size={2} color={2}>x{item.goods_num}</Text>
      </Row>
    </Column>
  </Row>
}


export const RefundInfo = () => {
  const [info] = contextState.useState()

  return <Column className='p-3 r-2 bg-white mh-3 mt-3 gap-3'>
    <Text bold size={4}>售后信息</Text>
    <Row className='gap-4' items='center'>
      <Text color={2}>服务单号</Text>
      <Row items='center' className='gap-2'>
        <Text bold>{info.refund_no}</Text>
        <Column className='pv-1 ph-2 r-1' style={{ backgroundColor: '#A1A6B6' }} onClick={() => setClipboardData({ data: info.order_no })}>
          <Text color={4} size={1}>复制</Text>
        </Column>
      </Row>
    </Row>
    <Row className='gap-4' items='center'>
      <Text color={2}>售后方式</Text>
      <Text bold>{info.type ? '退货退款' : '仅退款'}</Text>
    </Row>
    <Row className='gap-4' items='center'>
      <Text color={2}>申请时间</Text>
      <Text bold>{info.created_at}</Text>
    </Row>
    <Divider padding={0} />
    <Row className='gap-4' items='center'>
      <Text color={2}>退款金额</Text>
      <Text bold>{info.price}</Text>
    </Row>
    <Row className='gap-4' items='center'>
      <Text color={2}>退款运费</Text>
      <Text bold>{info.freight}</Text>
    </Row>
    <Divider padding={0} />
    <Row className='gap-4' items='center'>
      <Text color={2}>退款原因</Text>
      <Text bold>{info.cause}</Text>
    </Row>
    <Row className='gap-4' items='center'>
      <Text color={2}>退款描述</Text>
      <Text bold>{info.content}</Text>
    </Row>
    {!!info.images?.length && <Column className='gap-4'>
      <Text color={2}>退款图片</Text>
      <ImageGroup>
        <Grid column={4} square gap={24}>
          {
            info.images?.map(item => <Image key={item} src={item} className='w-full h-full r-2' />)
          }
        </Grid>
      </ImageGroup>
    </Column>}
  </Column>
}

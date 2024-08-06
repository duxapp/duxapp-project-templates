import { useRouter } from '@tarojs/taro'
import { Swiper, SwiperItem, Video } from '@tarojs/components'
import { useState } from 'react'
import { TopView, Header, Column, Row, Text, duxappTheme, nav, Badge, Divider, px, useRoute, Image, HtmlView, Button, Empty } from '@/duxui'
import { CommentDetailList, CmsIcon, collect, contextState, Detail, mallHook, Price, GoodsSpec, cart, foot } from '@/duxcmsMall'
import { WechatShare } from '@/wechat'
import classNames from 'classnames'

export default function GoodsDetail() {

  const { params } = useRouter()

  foot.useFoot(params.id, 'mall')

  return <TopView isSafe>
    <mallHook.Render mark='detail' option={{ Container, detailAction, Content }}>
      <Detail
        url={`mall/mall/${params.id}`}
        container={Container}
        defaultData={detailAction.defaultData}
      >
        {Content}
      </Detail>
    </mallHook.Render>
  </TopView>
}

const detailAction = {
  defaultData: { spec: [], sku: [], images: [], videos: [], comment: {} }
}

const Container = ({
  data,
  children
}) => {

  WechatShare.useSharePage({
    title: data.title,
    image: data.images[0]
  })

  return <contextState.Provider value={data}>
    <Header title='商品详情' />
    {children}
    <mallHook.Render mark='detail.footer'>{Footer}</mallHook.Render>
  </contextState.Provider>

}

const Content = () => {

  return <>
    <mallHook.Render mark='detail.images'>{Images}</mallHook.Render>
    <mallHook.Render mark='detail.info'>{Info}</mallHook.Render>
    <mallHook.Render mark='detail.option'>{Option}</mallHook.Render>
    <mallHook.Render mark='detail.comment'>{DetailComment}</mallHook.Render>
    <mallHook.Render mark='detail.content'>{DetailContent}</mallHook.Render>
    <Column className='p-2' />
  </>
}

const Images = () => {
  const [{ images, videos }] = contextState.useState()

  const list = [...videos, ...images]

  const [select, setSelect] = useState(0)

  return <Column>
    <Swiper className='w-full' style={{ height: px(750) }} onChange={e => setSelect(e.detail.current)}>
      {
        videos.map(item => <SwiperItem key={item}>
          <Video src={item.url} poster={images[0]} className='w-full h-full' />
        </SwiperItem>)
      }
      {
        images.map(item => <SwiperItem key={item}>
          <Image preview images={images} src={item} poster={images[0]} className='w-full h-full' />
        </SwiperItem>)
      }
    </Swiper>
    <Row className='absolute left-0 right-0 gap-1 z-1 bottom-0 pv-3' justify='center'>
      {
        list.map((item, index) => <Column
          key={item.id}
          className='r-2'
          style={{
            backgroundColor: select === index ? '#fff' : 'rgba(255,255,255,0.5)',
            width: px(select === index ? 32 : 12),
            height: px(12)
          }}
        />)
      }
    </Row>
  </Column>
}

const Info = () => {
  const [data] = contextState.useState()

  const { params } = useRoute()

  const [collectStatus, collectAction] = collect.useCollect(params.id, 'mall')

  return <>
    <Row className='mh-3 mt-3 r-2 p-3 items-center'
      style={{ backgroundColor: duxappTheme.primaryColor, paddingBottom: px(48) }}
    >
      <Column className='gap-1' grow>
        <mallHook.Render mark='detail.info.price'>
          <Row className='gap-2' items='center'>
            <Text size={40}>
              <Price size={40} bold unitSize={1} pointSize={1} color={4}>{data.min_price}</Price>
              {data.min_price !== data.max_price && <Text size={1} color={4}>起</Text>}
            </Text>
            <Price size={1} delete color={4} className='mt-2'>{data.market_price}</Price>
          </Row>
        </mallHook.Render>
        <Text size={1} color={4}>销量: {data.sale || 0}</Text>
      </Column>
      <Row className='gap-3'>
        <mallHook.Render mark='detail.info.collect'>
          <Column items='center' className='gap-1' onClick={collectAction.action}>
            <CmsIcon name={collectStatus ? 'collection-fill' : 'collection'} size={44} color={duxappTheme.textColor4} />
            <Text color={4} size={20}>收藏</Text>
          </Column>
        </mallHook.Render>
        <mallHook.Render mark='detail.info.share'>
          <WechatShare.Button>
            <Column items='center' className='gap-1'>
              <CmsIcon name='share_03' size={44} color={duxappTheme.textColor4} />
              <Text color={4} size={20}>分享</Text>
            </Column>
          </WechatShare.Button>
        </mallHook.Render>
      </Row>
    </Row>
    <Column className='mh-3 r-2 p-3 bg-white gap-1' style={{ marginTop: px(-24) }}>
      <Text bold>{data.title}</Text>
      {!!data.activity && <Text color={3} size={2}>{data.activity}</Text>}
    </Column>
  </>
}

const Option = () => {
  return <Column className='mh-3 mt-3 bg-white r-2 p-3 gap-3'>
    <mallHook.Render mark='detail.option.spec'>{OptionSpec}</mallHook.Render>
  </Column>
}

const OptionSpec = () => {

  const [data] = contextState.useState()

  return <GoodsSpec.Button>
    <Row items='center' className='gap-3'>
      <Text size={2} bold>选择规格</Text>
      <Text size={2} grow>{data.spec.map(item => item.name).join(' ')}</Text>
      <CmsIcon name='direction_right' />
    </Row>
  </GoodsSpec.Button>
}

const DetailComment = () => {
  const { params } = useRoute()

  return <CommentDetailList id={params.id} type='mall' />
}

const DetailContent = () => {

  const [data] = contextState.useState()

  return <Column className='mh-3 mt-3 bg-white r-2 p-3'>
    <mallHook.Render mark='detail.params'>
      {data.params?.length > 0 && <Column className='gap-2'>
        <Text size={4} bold>商品属性</Text>
        {
          data.params?.map((item, index) => <Row key={item.index} className={classNames('gap-2', !index && 'mt-1')}>
            <Text color={3} size={2}>{item.name}:</Text>
            <Text color={2} bold size={2}>{item.value}</Text>
          </Row>)
        }
        <Column className='mt-1' />
      </Column>}
    </mallHook.Render>
    <mallHook.Render mark='detail.content'>
      <Text size={4} bold>商品详情</Text>
      <Column className='mt-3' />
      {
        data.content_images?.length ?
          <Image.Group>
            {
              data.content_images.map((image, index) => <Image key={index} src={image} className='w-full' mode='widthFix' />)
            }
          </Image.Group> : data.content ?
            <HtmlView html={data.content} /> :
            <Empty title='暂无详情' />
      }
    </mallHook.Render>
  </Column>
}

const Footer = () => {

  return <>
    <Divider padding={0} />
    <Row items='center' className='bg-white p-1 gap-4'>
      <Row className='gap-3' items='center'>
        <mallHook.Render mark='detail.footer.btn'>{FooterCart}</mallHook.Render>
      </Row>
      <Row className='gap-2' justify='end' grow style={{ marginLeft: px(56) }}>
        <GoodsSpec.Button type='cart'>
          <Button type='secondary' size='l' radiusType='round'>加入购物车</Button>
        </GoodsSpec.Button>
        <GoodsSpec.Button type='buy'>
          <Button type='primary' size='l' radiusType='round'>立即购买</Button>
        </GoodsSpec.Button>
      </Row>
    </Row>
  </>
}

const FooterCart = () => {

  const data = cart.useCart()

  return <Badge count={+data.num}>
    <Column items='center' onClick={() => nav('duxcmsOrder/order/cart')}>
      <CmsIcon name='tabBar_car_nor' size={54} style={{ lineHeight: px(54) }} />
      <Text color={2} size={1}>购物车</Text>
    </Column>
  </Badge>
}

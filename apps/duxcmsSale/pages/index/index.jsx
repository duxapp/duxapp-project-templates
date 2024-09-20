import { Avatar, Card, ScrollView, Column, Divider, Header, Text, TopView, Row, px, Image, nav, Tag } from '@/duxui'
import { useRequest, CmsIcon, saleHook, Qrcode } from '@/duxcmsSale'
import { setClipboardData } from '@tarojs/taro'

export default function Sale() {

  const [{ info = {}, day = {}, money, total = {} }] = useRequest('sale/index')

  // const [notice] = usePageData('sale/notice')

  return <TopView>
    <Header absolute title='推广中心' color='#FFFFFF' style={{ backgroundColor: 'transparent' }} />
    <Image style={{ height: px(396) }} className='w-full absolute' src={require('./images/tui_bag.png')} />
    <Row justify='between' items='center' style={{ marginTop: px(208) }} className='mt-3 ph-3'>
      <Row items='center' justify='start'>
        <Avatar url={info.avatar}>{info.nickname}</Avatar>
        <Column className='mh-3'>
          <Row items='center' className='gap-2'>
            <Text size={33} bold color='#FFFFFF' >{info.nickname}</Text>
            {!!info.level_name && <Tag type='primary' size='s'>{info.level_name}</Tag>}
          </Row>
          <Row className='mt-2'>
            <Text color='#FFFFFF' size={1}>邀请码：{info.code}</Text>
            <CmsIcon className='mh-2' size={36} name='copy' color='#FFFFFF' onClick={() => setClipboardData({ data: info.code })} />
          </Row>
        </Column>
      </Row>
      <CmsIcon size={60} name='QRcode1' color='#FFFFFF' onClick={Qrcode.show} />
    </Row>
    {/* <Row className='p-3'>
      <Card shadow className='mt-3 w-full' onClick={() => notice[0]?.id && nav('duxcmsSale/index/notice')}>
        <Row items='center' justify='between'>
          <Row items='center' >
            <CmsIcon name='notice' size={40} />
            <Text className='mh-1'>公告：{notice[0]?.title || '--'}</Text>
          </Row>
          <CmsIcon name='direction_right' size={32} />
        </Row>
      </Card>
    </Row> */}
    <ScrollView className='mt-3'>
      <Card margin disableMarginTop>
        <Row jtems='center' justify='between' className='gap-3'>
          <Column justify='center' items='center' grow >
            <Text bold type='primary'>{total.order_num || 0}</Text>
            <Text color={2} size={2} className='mt-2'>直推订单</Text>
          </Column>
          <Column justify='center' items='center' grow>
            <Text bold type='primary'>{total.user_num || 0}</Text>
            <Text color={2} size={2} className='mt-2'>直推客户</Text>
          </Column>
        </Row>
        <Row className='mt-2' jtems='center' justify='between'>
          <Column justify='center' items='center' grow>
            <Text bold type='primary'>{total.month_sale_money || 0}</Text>
            <Text color={2} size={2} className='mt-2'>本月收益</Text>
          </Column>
          <Column justify='center' items='center' grow>
            <Text bold type='primary'>{total.sale_money || 0}</Text>
            <Text color={2} size={2} className='mt-2'>累计收益</Text>
          </Column>
        </Row>
      </Card>
      <Card shadow margin disableMarginTop onClick={() => nav('duxcmsAccount/cash/index')}>
        <Row items='center' justify='between'>
          <Text bold>佣金管理</Text>
          <CmsIcon name='direction_right' size={32} />
        </Row>
        <Row className='mt-3' items='baseline'>
          <Text size={2}>可提现佣金:</Text>
          <Text className='mh-3' bold size={50}>{money || 0}</Text>
        </Row>
      </Card>
      <Card margin disableMarginTop>
        <Row items='center' justify='around'>
          <Column items='center'>
            <Text size={2}>今日预估收益</Text>
            <Text className='mt-1' bold size={40} >{day.sale_money || 0}</Text>
          </Column>
          <Column items='center'>
            <Text size={2}>今日有效订单</Text>
            <Text className='mt-1' bold size={40} >{day.order_num || 0}</Text>
          </Column>
          <Column items='center'>
            <Text size={2}>今日新增客户</Text>
            <Text className='mt-1' bold size={40} >{day.user_num || 0}</Text>
          </Column>
        </Row>
      </Card>

      <Card margin className='gap-4'>
        <Text size={4} bold>其他操作</Text>
        <Row justify='between' items='center' onClick={() => nav('duxcmsSale/index/order')}>
          <Text size={2} className='mh-2' bold>推广订单</Text>
          <CmsIcon name='direction_right' size={32} />
        </Row>
        <Row justify='between' items='center' onClick={() => nav('duxcmsSale/index/customer')} >
          <Text size={2} className='mh-2' bold>我的客户</Text>
          <CmsIcon name='direction_right' size={32} />
        </Row>
        <saleHook.Render mark='index.menus' />
      </Card>
      <Row style={{ height: px(16) }}></Row>
    </ScrollView >
  </TopView >

}

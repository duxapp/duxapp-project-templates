import { useState, useMemo } from 'react'
import { TopView, Header, Text, Row, Card, Column, Empty, Image, Tab, duxappTheme, px, colorLighten } from '@/duxui'
import { CmsIcon, List } from '@/duxcmsSale'

export default function Order() {

  const [status, setStatus] = useState(tabs[0].value)

  const listData = useMemo(() => ({ status }), [status])

  return (
    <TopView>
      <Header title='推广订单' />
      <Tab className='bg-white' onChange={setStatus} value={status}>
        {
          tabs.map(item => <Tab.Item title={item.name} key={item.value} paneKey={item.value} />)
        }
      </Tab>
      <List
        url='sale/order'
        renderEmpty={<Empty title='暂无订单' />}
        data={listData}
        renderItem={Item}
        renderHeader={false}
      />
    </TopView>
  )
}

const Item = ({ item }) => {
  const [show, setShow] = useState(false)
  return <Column>
    <Card className='z-1' margin disableMarginBottom style={{ backgroundColor: colorLighten(duxappTheme.primaryColor, 0.85) }}>
      <Row items='center' justify='between' onClick={() => setShow(!show)}>
        <Column justify='between'>
          <Text size={1}>订单编号：{item.has_no}</Text>
          <Text className='mt-1' size={1} color={duxappTheme.textColor3}>{item.created_at}</Text>
        </Column>
        <Row items='center'>
          <Text size={2} bold>总收益：</Text>
          <Text bold size={2} color={duxappTheme.primaryColor}>{item.sale_money}</Text>
          <CmsIcon className='mh-2' name={show ? 'direction_down' : 'direction_right'} size={36} />
        </Row>
      </Row>

    </Card>
    {show && <Card className='ph-2 mh-3' style={{ marginTop: px(-20) }} >
      {item.goods.map(good => <Row key={good.id} className='mt-1 ' items='center'>
        <Image style={{ height: px(128) }} square className='r-2' src={good.goods_image} />
        <Column className='mh-3' justify='between'>
          <Text bold size={2}>{good.goods_name}</Text>
          <Text className='mt-1' size={1} color={duxappTheme.textColor2}>数量：X{good.goods_num}</Text>
          <Text className='mt-2' size={1} color={duxappTheme.textColor2}>售价：{good.goods_price}</Text>
        </Column>
      </Row>)}
      <Text className='mt-3' bold size={2}>{item.sale_way_name}收益：{item.sale_money}积分</Text>
    </Card>}
  </Column>
}

const tabs = [{ name: '全部', value: 0 }, { name: '待完成', value: 1 }, { name: '已完成', value: 2 }, { name: '已取消', value: 3 }]

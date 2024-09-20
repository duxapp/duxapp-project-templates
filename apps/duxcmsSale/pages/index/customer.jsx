import { Card, Column, Header, Text, TopView, Row, px, Empty, Divider, Avatar, Badge } from '@/duxui'
import { useState } from 'react'
import { CmsIcon, List, usePageData } from '@/duxcmsSale'

export default function Customer() {
  const [show, setShow] = useState(true)

  const [level_id, setLevel_id] = useState(0)

  const [list] = usePageData('sale/user/total')

  return <TopView>
    <Header title='我的客户' />
    <Column className='bg-primary m-3 r-2 p-3'>
      <Row items='center' justify='between' onClick={() => { setShow(!show) }}>
        <Text color='#FFFFFF'>数据统计</Text>
        <CmsIcon name={show ? 'direction_up' : 'direction_right'} color='#FFFFFF' size={40} />
      </Row>
      {show && <Card style={{ paddingLeft: px(0), paddingRight: px(0) }} className='mt-3'>
        <Row items='center' wrap>
          {list.map((item, index) => {
            return <>
              <Column items='center' style={{ width: px(160), height: px(84) }} onClick={() => setLevel_id(item.level_id)}>
                <Text type={level_id == item.level_id ? 'primary' : ''} size={4}>{item.value}</Text>
                <Text type={level_id == item.level_id ? 'primary' : ''} size={1}>{item.label}</Text>
              </Column>
              {((index !== list.length - 1) && index !== 3) && <Divider direction='vertical' />}
            </>
          })}
        </Row>
      </Card>}
    </Column>

    <List
      url='sale/user'
      renderItem={Item}
      data={{
        level_id
      }}
      renderEmpty={<Empty title='暂无客户' />}
    />

  </TopView >
}

const Item = ({ item, index }) => {
  return <Card key={index} margin disableMarginTop>
    <Row items='center' className='gap-3'>
      <Avatar iconSize={100} url={item.user_avatar} />
      <Column grow>
        <Row items='center'>
          <Text bold size={4}>{item.user_nickname}</Text>
          <Badge color='#5D615D' >
            <Text className='myClients_chen mh-2' color='#FFDD99' size={22} align='center' >{item.level_name}</Text>
          </Badge>
        </Row>
        <Row className='mt-2 ' grow justify='between' items='center'>
          <Text size={1} color={2}>电话：{item.user_tel}</Text>
          <Text size={1} color={2}>推广时间：{item.parent_time.substring(0, 10)}</Text>
        </Row>
      </Column>
    </Row>
    <Card className='mt-3 gap-3' style={{ backgroundColor: '#F5F8FC' }} >
      {
        item.data.map(total => <Row key={total.name} justify='between' items='center'>
          <Text>{total.name}</Text>
          <Text bold>{total.value}</Text>
        </Row>)
      }
    </Card>
  </Card>
}

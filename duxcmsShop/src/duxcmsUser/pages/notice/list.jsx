import { Text, Column, TopView, Header, Empty, Divider, Image, nav, dayjs, Row, Badge, confirm, loading, } from '@/duxui'
import { List, request } from '@/duxcmsUser'
import { pxTransform } from '@tarojs/taro'
import { useRef, useState } from 'react'

export default function Notice() {

  const action = useRef()

  return <TopView>
    <Header title='通知'
      renderRight={<Text
        size={1}
        className='mh-2'
        align='center'
        onClick={async () => {
          if (await confirm({
            title: '是否标记为已读？'
          })) {
            await request({
              url: 'member/notice/read',
              data: {},
              method: 'POST',
              loading,
              toast: true
            })
            action.current.reload()
          }
        }}
      >一键已读</Text>}
    />
    <List
      url='member/notice'
      renderEmpty={<Empty title='暂无记录' />}
      renderItem={Item}
      onAction={action}
    />
  </TopView>
}

const Item = ({ item }) => {

  const [key, setKey] = useState(false)

  return <Column className='mh-3 mt-3 r-2 bg-white'
    onClick={async () => {
      nav(item.url)
      if (!item.read) {
        await request({
          url: 'member/notice/read',
          data: {
            ids: [item.id]
          },
          method: 'POST',
          toast: true
        })
        item.read = true
        setKey(true)
      }
    }}
  >
    {!!item.image && <Image className='w-full r-2' style={{ height: pxTransform(260) }} src={item.image} />}
    <Column className='p-3 mh-1 gap-1'>
      <Row items='center'>
        <Text bold grow color={item.read ? 3 : 1}>{item.title}</Text>
        {!item.read && <Badge dot count={1} />}
      </Row>
      <Text color={item.read ? 3 : 2} size={1}>{item.desc}</Text>
      <Divider className='mt-1' />
      <Text size={1} color={3}>{item.source ? item.source + ' ' : ''}{dayjs(item.created_at).format('YYYY-MM-DD')}</Text>
    </Column>
  </Column>
}

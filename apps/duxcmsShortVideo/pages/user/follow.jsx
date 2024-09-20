import { usePageData } from '@/duxcmsShortVideo'
import { Avatar, Button, Column, Divider, Empty, Header, Row, ScrollView, Text, TopView, nav, useRoute } from '@/duxui'
import { Fragment, useMemo } from 'react'

export default function UserFollow() {

  const { params } = useRoute()

  const [list, action] = usePageData(params.type === 'fans' ? 'member/fans' : 'member/fans/concern')

  const renderList = useMemo(() => {
    return Object.values(list.reduce((prev, current) => {
      const date = current.create_at
      if (!prev[date]) {
        prev[date] = {
          date,
          list: [current]
        }
      } else {
        prev[date].list.push(current)
      }
      return prev
    }, {}))
  }, [list])

  return <TopView>
    <Header title={params.type === 'fans' ? '我的粉丝' : '我的关注'} />
    <ScrollView
      refresh={action.refresh}
      onRefresh={action.reload}
      onScrollToLower={action.next}
    >
      {
        list.length === 0 && !action.loading && <Empty title={params.type === 'fans' ? '暂无粉丝' : '暂无关注'} />
      }
      {
        renderList.map(group => <Fragment key={group.date}>
          <Column className='mt-3 mh-3'>
            <Text size={1} color={2}>{group.date}</Text>
          </Column>
          <Column className='mt-3 mh-3 bg-white r-2 ph-3'>
            {
              group.list.map((item, index) => <Fragment key={item.id}>
                {!!index && <Divider />}
                <Item item={item} />
              </Fragment>)
            }
          </Column>
        </Fragment>)
      }
    </ScrollView>
  </TopView>
}

const Item = ({ item }) => {
  return <Row className='pv-3 gap-3' items='center' onClick={() => nav('gasVideo/ad/customerDetail')}>
    <Avatar url={item.avatar} />
    <Column className='gap-1' grow>
      <Text bold>{item.nickname}</Text>
      <Text color={3} size={1}>{item.create_at}</Text>
    </Column>
    <Button type='primary' plain>取关</Button>
  </Row>
}

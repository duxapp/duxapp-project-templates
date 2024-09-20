import { CmsIcon, usePageData } from '@/duxcms'
import { Avatar, Column, Divider, Empty, Header, Row, ScrollView, Tag, Text, TopView, nav, stopPropagation } from '@/duxui'
import { GasIcon } from '@/gasVideo'
import { Fragment, useMemo } from 'react'


export default function AdCustomer() {

  const [list, action] = usePageData('advert/data')

  const groupList = useMemo(() => {
    return Object.values(list.reduce((prev, current) => {
      const date = current.time.substring(0, 10)

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
    <Header title='客户表单' />
    <ScrollView
      refresh={action.refresh}
      onRefresh={action.reload}
      onScrollToLower={action.next}
    >
      {
        !list.length && !action.loading && <Empty title='暂无客户' />
      }
      {
        groupList.map(group => <Fragment key={group.date}>
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

  const type = types[item.type]

  return <Row className='pv-3 gap-3' items='center'
    onClick={() => item.type === 'form' && nav('duxcmsShortVideo/ad/customerDetail', { id: item.id })}
  >
    <Avatar url={item.user.avatar} />
    <Column className='gap-1' grow>
      <Row className='gap-2'>
        <Text bold>{item.user.nickname}</Text>
        <Tag {...type.props} radiusType='round' size='s'><GasIcon name={type.icon} color='#fff' />{type.name}</Tag>
        <Text grow align='right' color={3} size={1}>{item.time}</Text>
      </Row>
      <Row>
        <Text grow color={2} size={1}
          onClick={e => {
            stopPropagation(e)
            nav(`tel:${item.user.tel}`)
          }}
        >电话：{item.user.tel}</Text>
        {/* <Text bold size={2} type='danger'>未读</Text> */}
      </Row>
    </Column>
  </Row>
}

const types = {
  form: {
    name: '表单',
    props: {
      type: 'secondary'
    },
    icon: 'order_def'
  },
  tel: {
    name: '电话咨询',
    props: {
      color: '#A86800'
    },
    icon: 'phone'
  },
  pilot: {
    name: '导航',
    props: {
      type: 'secondary'
    },
    icon: 'navigation'
  }
}

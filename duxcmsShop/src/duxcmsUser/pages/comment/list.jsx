import { Card, Empty, Header, Tab, TopView, useRoute } from '@/duxui'
import { useState, useMemo } from 'react'
import { List, CommentItem, useRequest } from '@/duxcmsUser'
import QueryString from 'qs'

export default function CommentList() {

  const { params } = useRoute()

  const [score, setScore] = useState(0)

  const [total] = useRequest(`member/assess/total?${QueryString.stringify(params)}`)

  const count = (total.good + total.medium + total.negative) || 0

  const navs = useMemo(() => {
    return [
      { name: `全部(${count})`, value: 0 },
      { name: `好评(${total.good || 0})`, value: 3 },
      { name: `中评(${total.medium || 0})`, value: 2 },
      { name: `差评(${total.negative || 0})`, value: 1 },
    ]
  }, [count, total.good, total.medium, total.negative])

  const requestParams = useMemo(() => {
    return {
      ...params,
      score
    }
  }, [params, score])

  return <TopView>
    <Header title='评价列表' />
    <Tab value={score} onChange={setScore} className='bg-white rb-3'>
      {navs.map(item => <Tab.Item key={item.value} title={item.name} paneKey={item.value} />)}
    </Tab>
    <List
      url='member/assess/has'
      data={requestParams}
      renderItem={Item}
      renderEmpty={<Empty title='暂无评价' />}
    />
  </TopView>
}

const Item = ({ item, index }) => {
  return <Card margin disableMarginTop={!!index}>
    <CommentItem item={item} />
  </Card>
}

import { Card, Empty, Header, Tab, TopView, useRoute, TabItem } from '@/duxui'
import { useState, useMemo } from 'react'
import { List, CommentItem, useRequest } from '@/duxcmsUser'
import { duxcmsUserLang } from '@/duxcmsUser/utils'
import QueryString from 'qs'

export default function CommentList() {

  const { params } = useRoute()
  const t = duxcmsUserLang.useT()

  const [score, setScore] = useState(0)

  const [total] = useRequest(`member/assess/total?${QueryString.stringify(params)}`)

  const count = (total.good + total.medium + total.negative) || 0

  const navs = useMemo(() => {
    return [
      { name: t('comment.tabs.all', { params: { count } }), value: 0 },
      { name: t('comment.tabs.good', { params: { count: total.good || 0 } }), value: 3 },
      { name: t('comment.tabs.medium', { params: { count: total.medium || 0 } }), value: 2 },
      { name: t('comment.tabs.bad', { params: { count: total.negative || 0 } }), value: 1 },
    ]
  }, [count, t, total.good, total.medium, total.negative])

  const requestParams = useMemo(() => {
    return {
      ...params,
      score
    }
  }, [params, score])

  return <TopView>
    <Header title={t('comment.title')} />
    <Tab value={score} onChange={setScore} className='bg-white rb-3'>
      {navs.map(item => <TabItem key={item.value} title={item.name} paneKey={item.value} />)}
    </Tab>
    <List
      url='member/assess/has'
      data={requestParams}
      renderItem={Item}
      renderEmpty={<Empty title={t('comment.empty')} />}
    />
  </TopView>
}

const Item = ({ item, index }) => {
  return <Card margin disableMarginTop={!!index}>
    <CommentItem item={item} />
  </Card>
}

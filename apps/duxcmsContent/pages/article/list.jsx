import { duxappTheme, Header, TopView, useRoute } from '@/duxapp'
import { Empty, Row, Tab, TabItem } from '@/duxui'
import { ContentItem, List, ListSearch, usePageData } from '@/duxcmsContent'
import { useMemo, useState } from 'react'

export default function ContentList() {

  const { params } = useRoute()

  const [keyword, setKeyword] = useState(params.keyword)

  const [list] = usePageData({ url: 'content/category', data: params })

  const [classId, setClass] = useState(params.class || 0)

  const renderList = useMemo(() => {
    return [{ name: '全部', id: params.class || 0 }, ...list]
  }, [list, params.class])

  return (
    <TopView>
      <Header title={params.title || '文章'}
        renderHeader={params.headerSearch ? <Row items='center' grow>
          <Header.Back />
          <ListSearch
            defaultValue={keyword}
            defaultShow={!!params.search}
            color={duxappTheme.pageColor}
            mark='articleList'
            onChange={setKeyword}
          />
        </Row> : null}
      />
      {renderList.length > 1 && <Tab scroll className='bg-white rb-3' value={classId} onChange={setClass}>
        {
          renderList.map(item => <TabItem key={item.id} title={item.name} paneKey={item.id} />)
        }
      </Tab>}
      <List
        url='content/article'
        renderItem={ContentItem}
        data={{ class: classId, keyword: keyword ? keyword : undefined }}
        renderEmpty={<Empty title='暂无文章' />}
      />
    </TopView>
  )
}

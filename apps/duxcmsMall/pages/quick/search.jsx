import { useRouter } from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { TopView, Header, Row, duxappTheme, Empty } from '@/duxui'
import { ListSearch, List, quickCart, contextState, QuickMallItem } from '@/duxcmsMall'

export default function QuickSearch() {

  const { params } = useRouter()

  const [keyword, setKeyword] = useState('')

  const cartData = quickCart.useCart()

  const listData = useMemo(() => ({
    ...params,
    keyword
  }), [keyword, params])

  return <TopView isSafe>
    <Header
      renderHeader={<Row items='center' grow>
        <Header.Back />
        <ListSearch defaultValue={keyword} defaultShow color={duxappTheme.pageColor} mark='quickGoodsList' onChange={setKeyword} />
      </Row>}
    />
    <contextState.Provider value={{ ...cartData, search: true }}>
      <List
        url='mall/mall'
        renderItem={QuickMallItem}
        data={listData}
        renderEmpty={<Empty title='暂无商品' className='w-full' />}
      />
    </contextState.Provider>
  </TopView>
}

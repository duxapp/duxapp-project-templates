import { useRouter } from '@tarojs/taro'
import { useCallback, useMemo, useState } from 'react'
import { TopView, Header, Column, Row, Text, duxappTheme, nav, px, Image, Empty } from '@/duxui'
import { ListSearch, List, ListFilter, Price, mallHook } from '@/duxcmsMall'

export default function GoodsList() {

  const { params } = useRouter()

  const [filterOption, setFilterOption] = useState([])

  const [filter, setFilter] = useState({})

  const [keyword, setKeyword] = useState(params.keyword)

  const callback = useCallback((_list, res) => {
    setFilterOption(old => old.length ? old : res._meta.filter)
    return _list
  }, [])

  return <TopView isSafe>
    <Header title='列表'
      renderHeader={<Row items='center' grow>
        <Header.Back />
        <ListSearch defaultValue={keyword} defaultShow={!!params.search} color={duxappTheme.pageColor} mark='goodsList' onChange={setKeyword} />
      </Row>}
    />
    <ListFilter filter={filterOption}
      onChange={setFilter}
    />
    <mallHook.Render mark='goods.list'>
      <List
        listCallback={callback}
        url='mall/mall'
        renderItem={Item}
        data={{
          ...params,
          ...filter,
          keyword
        }}
        renderEmpty={<Empty title='暂无商品' className='w-full' />}
        renderHeader={<mallHook.Render mark='goods.list.header' />}
        renderFooter={<mallHook.Render mark='goods.list.footer' />}
        columns={2}
        listStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      />
    </mallHook.Render>
  </TopView>
}

const Item = ({ item }) => {

  return <Column
    className='bg-white r-2 mt-3 gap-3'
    style={{ width: px(339), marginLeft: px(24) }}
    onClick={() => nav('duxcmsMall/goods/detail', { id: item.id })}
  >
    <Image src={item.images[0]} className='r-2 w-full' square />
    <Column className='p-2 gap-2'>
      <Text numberOfLines={2}>{item.title}</Text>
      {!!item.activity && <Text size={1} color={2}>{item.activity}</Text>}
      <Row className='gap-1' items='center'>
        <mallHook.Render mark='goods.list.item.sellPrice' option={{ item }}>
          <Price size={6} bold>{item.sell_price}</Price>
        </mallHook.Render>
        <Price delete color={3}>{item.market_price}</Price>
      </Row>
    </Column>
  </Column>
}

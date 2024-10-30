import { useEffect } from 'react'
import { Column, Row, Text, nav, ScrollViewManage, px, Image, ListLoading } from '@/duxui'
import { Price, usePageData } from '@/duxcmsOrder'
import { mallHook } from '../utils'

export const MallList = ({
  params,
  paging
}) => {
  const { onRefresh, bottomLoadStatus, onScrollToLower } = ScrollViewManage.useContext()

  const [data, dataAction] = usePageData({ url: 'mall/mall', data: params }, { cache: true })

  useEffect(() => {
    const { remove } = onRefresh(dataAction.reload)
    let bottomRemove
    if (paging) {
      bottomRemove = onScrollToLower(dataAction.next).remove
    }
    return () => {
      remove()
      bottomRemove?.()
    }
  }, [dataAction.next, dataAction.reload, onScrollToLower, onRefresh, paging])

  return <>
    <Row className='ph-3 gap-3 mt-3' justify='between' wrap>
      {
        data.map(item => <Item key={item.id} item={item} />)
      }
    </Row>
    {paging && <ListLoading loading={bottomLoadStatus} text={bottomLoadStatus ? '加载中' : ''} />}
  </>
}

const Item = ({ item, index, action }) => {
  return <Column
    className='bg-white r-2'
    style={{ width: px(339) }}
    onClick={() => nav('duxcmsMall/goods/detail', { id: item.id })}
  >
    <Image src={item.images[0]} className='r-2 w-full' square />
    <Column className='p-2 gap-2'>
      <Text numberOfLines={2}>{item.title}</Text>
      {!!item.activity && <Text size={1} numberOfLines={3} color={2}>{item.activity}</Text>}
      <Row className='gap-1' items='center'>
        <mallHook.Render mark='MallList.item.sellPrice' option={{ item, index, action }}>
          <Price size={6} bold>{item.sell_price}</Price>
        </mallHook.Render>
        <mallHook.Render mark='MallList.item.marketPrice' option={{ item, index, action }}>
          <Price delete color={3} grow>{item.market_price}</Price>
        </mallHook.Render>
      </Row>
    </Column>
  </Column>
}

import { Column, Text, px, Image, Row } from '@/duxui'
import { Price, collect, foot } from '@/duxcmsOrder'

const CollectItem = ({ item }) => {

  return <Row items='center' className='gap-2 bg-white p-3 r-2'>
    <Image src={item.image} style={{ width: px(160) }} className='r-2' square />
    <Column className='pv-2 gap-2 overflow-hidden' grow>
      <Text numberOfLines={2}>{item.title}</Text>
      {!!item.activity && <Text size={1} color={2} numberOfLines={1}>{item.activity}</Text>}
      <Price size={6} bold>{item.price}</Price>
    </Column>
  </Row>
}

collect.addItem('mall', {
  Render: CollectItem,
  url: 'duxcmsMall/goods/detail',
  name: '商品'
})

foot.addItem('mall', {
  Render: CollectItem,
  url: 'duxcmsMall/goods/detail',
  name: '商品'
})

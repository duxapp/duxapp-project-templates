import { Row, Column, Image, Text, nav, px } from '@/duxui'
import { Cart, Price } from '@/duxcmsOrder'

const GoodsItem = ({
  item
}) => {
  return <Row className='gap-2 items-center' onClick={() => nav('duxcmsMall/goods/detail?id=' + item.has_id)}>
    <Image src={item.image} style={{ width: px(160) }} square className='r-2' />
    <Column grow className='gap-2 overflow-hidden'>
      <Text size={2} bold numberOfLines={1}>{item.name}</Text>
      <Text size={1} color={3} numberOfLines={1}>{item.spec?.join?.(' ')}</Text>
      <Price size={4} unitSize={1}>{item.price}</Price>
    </Column>
  </Row>
}

Cart.add('mall', GoodsItem)

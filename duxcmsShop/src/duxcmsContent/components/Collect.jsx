import { px } from '@/duxapp'
import { Column, Image, Row, Text } from '@/duxui'
import { collect, foot } from '@/duxcmsUser'

const CollectRender = ({ item }) => {

  if (item.image) {
    return <Row className='p-3 r-2 bg-white gap-3'>
      <Image src={item.image} style={{ width: px(240), height: px(160) }} className='r-2' />
      <Column grow className='pv-2 overflow-hidden' justify='between'>
        <Text size={4} bold numberOfLines={2}>{item.title}</Text>
        {!!item.description && <Text numberOfLines={2} size={2} color={2}>{item.description}</Text>}
      </Column>
    </Row>
  }

  return <Column className='p-3 r-2 bg-white gap-2 overflow-hidden'>
    <Text size={4} numberOfLines={2}>{item.title}</Text>
    <Text size={2} color={2} numberOfLines={2}>{item.description}</Text>
  </Column>
}

collect.addItem('article', {
  Render: CollectRender,
  url: 'duxcmsContent/article/detail',
  name: '文章'
})

foot.addItem('article', {
  Render: CollectRender,
  url: 'duxcmsContent/article/detail',
  name: '文章'
})

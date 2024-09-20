import { List } from '@/duxcms'
import { Button, Column, Empty, Header, Image, Row, Status, TopView, nav, px } from '@/duxui'

export default function AdList() {
  return <TopView>
    <Header title='我的推广' />
    <Column grow className='p-3'>
      <List
        url='advert/order'
        renderEmpty={<Empty title='暂无作品' />}
        renderItem={Item}
        columns={2}
        listClassName='flex-row flex-wrap'
        listStyle={{ gap: px(24) }}
      />
    </Column>
  </TopView>
}

const Item = ({ item }) => {
  return <Column className='bg-white r-2 overflow-hidden'>
    <Image style={{ width: px(340), height: px(454) }} src={item.short?.cover} className='r-2' />
    <Status
      status={<Status.Incline type={item.completed_status ? 'default' : 'primary'}>{item.completed_status ? '已失效' : '生效中'}</Status.Incline>}
    />
    <Row className='ph-3 pv-2 gap-3'>
      {/* <Button size='s' type='primary' className='flex-grow'>停止</Button> */}
      <Button size='s' type='primary' className='flex-grow' plain
        onClick={() => nav('duxcmsShortVideo/ad/detail', { id: item.id })}
      >查看</Button>
    </Row>
  </Column>
}

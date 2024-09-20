import { TopView, Header, Text, Card, Empty, nav } from '@/duxui'
import { List } from '@/duxcmsSale'

const Item = ({ item, index }) => {

  return <Card disableMarginTop={!!index} margin className='gap-2' shadow={false} onClick={() => nav('duxcmsSale/index/noticeDetail', { id: item.id })}>
    <Text bold size={5}>{item.title}</Text>
    <Text color={2}>{item.subtitle}</Text>
    <Text color={3} size={1}>{item.created_at}</Text>
  </Card>
}

const Notice = () => {
  return (
    <TopView isSafe>
      <Header title='公告' />
      <List url='sale/notice'
        renderEmpty={<Empty title='暂无公告' />}
        renderItem={Item}
      />
    </TopView>
  );
}

export default Notice;

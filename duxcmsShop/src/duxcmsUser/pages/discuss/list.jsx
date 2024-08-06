import { Card, Column, Header, TopView, useRoute, Empty } from '@/duxui'
import { List, DiscussItem } from '@/duxcmsUser'
import { pxTransform } from '@tarojs/taro'

export default function CommentList() {

  const { params } = useRoute()

  return <TopView>
    <Header title='评论' />
    <Card className='flex-grow' shadow={false}>
      <List
        url={`member/comment/${params.type}/${params.id}`}
        renderItem={DiscussItem}
        renderLine={<Column style={{ height: pxTransform(24) }} />}
        renderEmpty={<Empty title='暂无评价' />}
      />
    </Card>
  </TopView>
}

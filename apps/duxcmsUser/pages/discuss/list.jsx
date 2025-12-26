import { Card, Column, Header, TopView, useRoute, Empty } from '@/duxui'
import { List, DiscussItem } from '@/duxcmsUser'
import { duxcmsUserLang } from '@/duxcmsUser/utils'
import { pxTransform } from '@tarojs/taro'

export default function CommentList() {

  const { params } = useRoute()
  const t = duxcmsUserLang.useT()

  return <TopView>
    <Header title={t('discuss.title')} />
    <Card className='flex-grow' shadow={false}>
      <List
        url={`member/comment/${params.type}/${params.id}`}
        renderItem={DiscussItem}
        renderLine={<Column style={{ height: pxTransform(24) }} />}
        renderEmpty={<Empty title={t('discuss.empty')} />}
      />
    </Card>
  </TopView>
}

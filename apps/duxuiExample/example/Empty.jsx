import { Header, ScrollView, TopView, GroupList, Empty, Button } from '@/duxuiExample'

export default function EmptyExample() {

  return <TopView>
    <Header title='Empty' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='空状态' desc=''>
          <Empty />
        </GroupList.Item>
        <GroupList.Item title='自定义标题' desc=''>
          <Empty title='自定义标题' />
        </GroupList.Item>
        <GroupList.Item title='自定义图片' desc=''>
          <Empty url='https://th.bing.com/th/id/OIP.EwSXHHL2QXAeJzrA-87orQHaFj?pid=ImgDet&rs=1' />
        </GroupList.Item>
        <GroupList.Item title='底部自定义' desc=''>
          <Empty
            renderFooter={<Button>底部自定义</Button>}
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

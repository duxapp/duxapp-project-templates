import { Header, ScrollView, TopView, GroupList, Column, Card, Space, Image } from '@/duxuiExample'
import { Detail, px } from '@/duxcms'

export default function DetailExample() {
  return <TopView>
    <Header title='Detail' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='数据详情' desc='此组件不可单独使用，需配合接口请求数据实现，此组件封装了下拉刷新、页面显示刷新等功能，可以快速的实现一个详情页面。此组件需要放在一个具有一定高度的容器中，否则不会渲染。'>
          <Column style={{ height: px(1000) }}>
            <Detail
              url='mall/10'
            >
              {Content}
            </Detail>
          </Column>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}


const Content = ({ data = {} }) => {
  return <Card margin>
    <Space>
      <Card.Title>{data.title}</Card.Title>
      <Space row>
        <Image
          style={{ width: px(200), height: px(240) }}
          preview
          radiusType='round-min'
          src={data.image}
        />
        <Space>

        </Space>
      </Space>
    </Space>
  </Card>
}

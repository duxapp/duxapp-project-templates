import { Header, ScrollView, TopView, GroupList, Column, Card, Space, Image } from '@/duxuiExample'
import { Detail } from '@/duxcms'
import Taro from '@tarojs/taro'

const Content = ({ data: { info = {} } }) => {
  return <Card margin>
    <Space>
      <Card.Title>{info.title}</Card.Title>
      <Space row>
        <Image
          style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(240) }}
          preview
          radiusType='round-min'
          src={info.image}
        />
        <Space>

        </Space>
      </Space>
    </Space>
  </Card>
}

export default function DetailExample() {
  return <TopView>
    <Header title='Detail' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='数据详情' desc='此组件不可单独使用，需配合接口请求数据实现，此组件封装了下拉刷新、页面显示刷新等功能，可以快速的实现一个详情页面。此组件需要放在一个具有一定高度的容器中，否则不会渲染。'>
          <Column style={{ height: 500 }}>
            <Detail
              url='mall/mall/10'
            >
              {Content}
            </Detail>
          </Column>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

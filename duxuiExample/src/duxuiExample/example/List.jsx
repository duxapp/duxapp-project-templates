import { Header, ScrollView, TopView, GroupList, Column, Card, Space, Image, Divider, Button, Form, Menu } from '@/duxuiExample'
import { List } from '@/duxcms'
import Taro from '@tarojs/taro'

const Item = ({ item }) => {
  return <Card margin>
    <Space>
      <Card.Title>{item.title}</Card.Title>
      <Space row>
        <Image
          style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(240) }}
          preview
          radiusType='round-min'
          src={item.image}
        />
      </Space>
      <Divider type='dashed' />
      <Space row justify='end'>
        <Button size='m' >立即开门</Button>
        <Button size='m' >查看详情</Button>
      </Space>
    </Space>
  </Card>
}

export default function ListExample() {
  return <TopView>
    <Form>
      {({ values }) => <>
        <Header title='List' />
        <Menu>
          <Form.Item field='sort'>
            <Menu.Item title='排序' options={[{ name: '新品', value: 1 }, { name: '价格', value: 2 }]} />
          </Form.Item>
          <Form.Item field='class'>
            <Menu.Item title='分类' options={[{ name: '全部', value: 0 }, { name: '分类1', value: 1 }, { name: '分类2', value: 10 }]} />
          </Form.Item>
        </Menu>
        <ScrollView>
          <GroupList>
            <GroupList.Item title='数据列表' desc='此组件不可单独使用，需配合接口请求数据实现，此组件封装了分页，下拉刷新、上拉加载等功能，可以快速的实现一个列表页面。配合Form，可以实现快速筛选数据。列表需要放在一个具有一定高度的容器中，否则不会渲染。'>
              <Column style={{ height: 500 }}>
                <List
                  url='mall/mall'
                  data={values}
                  keyField='id'
                  listField='list'
                  renderItem={Item}
                />
              </Column>
            </GroupList.Item>
          </GroupList>
        </ScrollView>
      </>}
    </Form>
  </TopView>
}

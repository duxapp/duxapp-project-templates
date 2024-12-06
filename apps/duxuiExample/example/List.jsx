import { Header, ScrollView, TopView, GroupList, Column, Image, Form, Menu, Empty, Text, Row } from '@/duxuiExample'
import { List, px } from '@/duxcms'
import classNames from 'classnames'

export default function ListExample() {

  return <TopView>
    <Header title='List' />
    <Form>
      {({ values }) => <>
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
              <Column
                style={{ height: px(1000) }}
              >
                <List
                  url='mall'
                  data={values}
                  columns={2}
                  // 样式对非RN端生效
                  listStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
                  renderItem={Item}
                  renderEmpty={<Empty title='暂无数据' />}
                />
              </Column>
            </GroupList.Item>
          </GroupList>
        </ScrollView>
      </>}
    </Form>
  </TopView>
}

const Item = ({ item, index, action }) => {

  // action.reload() 可以用于数据刷新

  return <Column
    className={classNames('bg-white r-2', index > 1 && 'mt-3')}
    style={{ width: px(339) }}
  >
    <Image src={item.image} className='r-2 w-full' square />
    <Column className='p-2 gap-2'>
      <Text numberOfLines={2}>{item.title}</Text>
      {!!item.activity && <Text size={1} color={2}>{item.activity}</Text>}
      <Row className='gap-1' items='center'>
        <Text size={6} bold>{item.sell_price}</Text>
        <Text delete color={3} grow>{item.market_price}</Text>
      </Row>
    </Column>
  </Column>
}

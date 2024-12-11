import { Card, Divider, Image, Header, ScrollView, TopView, GroupList, Space, Button, px, Column, Text } from '@/duxuiExample'

export default function CardExample() {
  return <TopView>
    <Header title='Card' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法' desc='Card 组件是一个有背景颜色、阴影效果、内外边距的容器，其中的内容需要自己编写'>
          <Card>
            <Space>
              <Card.Title>【长沙-杜鹃万达广场店】</Card.Title>
              <Space row>
                <Image
                  style={{ width: px(200) }}
                  square
                  radiusType='round-min'
                  src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
                />
                <Column grow className='gap-2'>
                  <Text bold>杜鹃花盛开了，什么时候是最好的赏花季节</Text>
                  <Text size={1} color={2}>2024-05-04</Text>
                </Column>
              </Space>
              <Divider type='dashed' />
              <Space row justify='end'>
                <Button size='m' >立即开门</Button>
                <Button size='m' >查看详情</Button>
              </Space>
            </Space>
          </Card>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

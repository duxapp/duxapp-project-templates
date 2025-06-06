import { Tab, Header, ScrollView, TopView, GroupList, Card, px, TabItem } from '@/duxuiExample'
import { Text } from '@tarojs/components'

export default function TabExample() {
  return <TopView>
    <Header title='Tab' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Tab>
            <TabItem title='标题1' >
              <Card margin>
                <Text className='text-s5 text-c1'>内容1</Text>
              </Card>
            </TabItem>
            <TabItem title='标题2' >
              <Card margin>
                <Text className='text-s5 text-c1'>内容2</Text>
              </Card>
            </TabItem>
            <TabItem title='标题3'  >
              <Card margin>
                <Text className='text-s5 text-c1'>内容3</Text>
              </Card>
            </TabItem>
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='滑动切换' desc='开启滑动切换后，需要给 Tab 设置高度，或者开启 justify 属性'>
          <Tab swiper style={{ height: px(400) }}>
            <TabItem title='标题1' paneKey={1} >
              <Card margin className='flex-grow'>
                <Text className='text-s5 text-c1'>内容1</Text>
              </Card>
            </TabItem>
            <TabItem title='标题2' paneKey={2} >
              <Card margin className='flex-grow'>
                <Text className='text-s5 text-c1'>内容2</Text>
              </Card>
            </TabItem>
            <TabItem title='标题3' paneKey={3} >
              <Card margin className='flex-grow'>
                <Text className='text-s5 text-c1'>内容3</Text>
              </Card>
            </TabItem>
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='仅使用导航部分'>
          <Tab>
            <TabItem title='标题1' paneKey={1} />
            <TabItem title='标题2' paneKey={2} />
            <TabItem title='标题3' paneKey={3} />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='滚动'>
          <Tab scroll>
            <TabItem title='标题1' paneKey={1} />
            <TabItem title='标题2' paneKey={2} />
            <TabItem title='标题3' paneKey={3} />
            <TabItem title='标题4' paneKey={4} />
            <TabItem title='标题5' paneKey={5} />
            <TabItem title='标题6' paneKey={6} />
            <TabItem title='标题7' paneKey={7} />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='按钮样式1'>
          <Tab type='button'>
            <TabItem title='标题1' />
            <TabItem title='标题2' />
            <TabItem title='标题3' badgeProps={{ count: 5 }} />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='按钮样式2'>
          <Tab type='button' buttonRound>
            <TabItem title='标题1' />
            <TabItem title='标题2' />
            <TabItem title='标题3' />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='显示红点未读数'>
          <Tab>
            <TabItem title='标题1' badgeProps={{ count: 2 }} />
            <TabItem title='标题2' badgeProps={{ dot: true }} />
            <TabItem title='标题3' badgeProps={{ count: 1, text: '红点' }} />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='展开更多'>
          <Tab scroll expand type='button' buttonRound>
            <TabItem title='标题1' />
            <TabItem title='标题2' />
            <TabItem title='标题3' />
            <TabItem title='标题4' />
            <TabItem title='标题5' />
            <TabItem title='标题6' />
            <TabItem title='标题7' />
          </Tab>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

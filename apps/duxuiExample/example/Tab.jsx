import { Tab, Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { View } from '@tarojs/components'

export default function TabExample() {
  return <TopView>
    <Header title='Tab' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Tab>
            <Tab.Item title='标题1' paneKey={1} >
              <View>内容1</View>
            </Tab.Item>
            <Tab.Item title='标题2' paneKey={2} >
              <View>内容2</View>
            </Tab.Item>
            <Tab.Item title='标题3' paneKey={3} >
              <View>内容3</View>
            </Tab.Item>
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='仅使用导航部分'>
          <Tab>
            <Tab.Item title='标题1' paneKey={1} />
            <Tab.Item title='标题2' paneKey={2} />
            <Tab.Item title='标题3' paneKey={3} />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='滚动'>
          <Tab scroll>
            <Tab.Item title='标题1' paneKey={1} />
            <Tab.Item title='标题2' paneKey={2} />
            <Tab.Item title='标题3' paneKey={3} />
            <Tab.Item title='标题4' paneKey={4} />
            <Tab.Item title='标题5' paneKey={5} />
            <Tab.Item title='标题6' paneKey={6} />
            <Tab.Item title='标题7' paneKey={7} />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='按钮样式1'>
          <Tab type='button'>
            <Tab.Item title='标题1' />
            <Tab.Item title='标题2' />
            <Tab.Item title='标题3' />
            <Tab.Item title='标题4' />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='按钮样式2'>
          <Tab type='button' buttonRound>
            <Tab.Item title='标题1' />
            <Tab.Item title='标题2' />
            <Tab.Item title='标题3' />
            <Tab.Item title='标题4' />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='显示红点未读数'>
          <Tab>
            <Tab.Item title='标题1' badgeProps={{ count: 2 }} />
            <Tab.Item title='标题2' badgeProps={{ dot: true }} />
            <Tab.Item title='标题3' badgeProps={{ count: 1, text: '红点' }} />
            <Tab.Item title='标题4' />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='显示红点未读数'>
          <Tab type='button' buttonRound>
            <Tab.Item title='标题1' badgeProps={{ count: 2 }} />
            <Tab.Item title='标题2' badgeProps={{ dot: true }} />
            <Tab.Item title='标题3' badgeProps={{ count: 1, text: '红点' }} />
            <Tab.Item title='标题4' />
          </Tab>
        </GroupList.Item>
        <GroupList.Item title='展开更多'>
          <Tab scroll expand type='button' buttonRound>
            <Tab.Item title='标题1' />
            <Tab.Item title='标题2' />
            <Tab.Item title='标题3' />
            <Tab.Item title='标题4' />
            <Tab.Item title='标题5' />
            <Tab.Item title='标题6' />
            <Tab.Item title='标题7' />
          </Tab>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

import { Header, ScrollView, TopView, GroupList, Text } from '@/duxuiExample'

export default function CellExample() {
  return <TopView>
    <Header title='Header' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法' desc='Header 组件包含了状态栏的部分，所以此处呈现的高度比较高'>
          <Header title='标题' />
        </GroupList.Item>
        <GroupList.Item title='右侧自定义渲染' desc='右侧渲染的内容在小程序上会排除胶囊按钮，所以右侧内容在小程序上不会在最右侧'>
          <Header title='标题' renderRight={<Text>右侧</Text>} />
        </GroupList.Item>
        <GroupList.Item title='自定义样式'>
          <Header title='标题' style={{ backgroundColor: '#333' }} color='#fff' />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

import { Header, ScrollView, TopView, GroupList, message, Button } from '@/duxuiExample'

export default function MessageExample() {

  return <TopView>
    <Header title='message' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='显示消息'>
          <Button onClick={() => message('这是一个消息')}>弹出</Button>
        </GroupList.Item>
        <GroupList.Item title='带描述'>
          <Button onClick={() => message('这是一个消息', '这里是简介')}>弹出</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

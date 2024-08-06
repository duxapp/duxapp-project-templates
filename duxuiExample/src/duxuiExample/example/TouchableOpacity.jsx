import { Header, ScrollView, TopView, Form, TouchableOpacity, GroupList, Text } from '@/duxuiExample'

export default function TouchableOpacityExample() {
  return <TopView>
    <Header title='TouchableOpacity' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <GroupList>
          <GroupList.Item title='基础用法'>
            <TouchableOpacity className='bg-white p-3 r-2'>
              <Text>点击查看效果</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} className='bg-white p-3 r-2'>
              <Text>不透明度 0.7</Text>
            </TouchableOpacity>
          </GroupList.Item>
        </GroupList>
      </ScrollView>
    </Form>
  </TopView>
}

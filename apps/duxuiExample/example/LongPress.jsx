import { Header, ScrollView, TopView, GroupList, Text, LongPress, toast, Column } from '@/duxuiExample'

export default function LongPressExample() {

  return <TopView>
    <Header title='LongPress' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='长按事件'>
          <LongPress onLongPress={() => toast('长按事件')}>
            <Column className='p-3 bg-white'>
              <Text>长按此区域</Text>
            </Column>
          </LongPress>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

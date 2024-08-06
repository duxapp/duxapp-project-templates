import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { Calendar } from '@/duxui'

export default function ButtonExample() {
  return <TopView>
    <Header title='Calendar' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='天选择'>
          <Calendar mode='day' />
        </GroupList.Item>
        <GroupList.Item title='范围选择'>
          <Calendar mode='scope' />
        </GroupList.Item>
        <GroupList.Item title='周选择'>
          <Calendar mode='week' />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

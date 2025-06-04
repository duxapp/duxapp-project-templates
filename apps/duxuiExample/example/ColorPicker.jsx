import { Header, ScrollView, TopView, GroupList, ColorPicker } from '@/duxuiExample'

export default function ColorPickerExample() {
  return <TopView>
    <Header title='ColorPicker' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='颜色选择'>
          <ColorPicker preview className='p-2 bg-white r-2 self-start' />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

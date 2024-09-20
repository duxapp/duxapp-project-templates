import { Header, ScrollView, TopView, GroupList, NumberKeyboard, toast } from '@/duxuiExample'

export default function NumberKeyboardExample() {

  return <TopView>
    <Header title='NumberKeyboard' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='默认键盘'>
          <NumberKeyboard onKeyPress={toast} />
        </GroupList.Item>
        <GroupList.Item title='定制按钮'>
          <NumberKeyboard
            onKeyPress={toast}
            keyLeft={{ key: '.' }}
          />
        </GroupList.Item>
        <GroupList.Item title='随机'>
          <NumberKeyboard
            onKeyPress={toast}
            random
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

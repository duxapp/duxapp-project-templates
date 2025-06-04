import { Header, ScrollView, TopView, GroupList, InputCode, NumberKeyboard, useNumberKeyboardController } from '@/duxuiExample'

export default function InputCodeExample() {

  const [value, props] = useNumberKeyboardController()

  return <TopView>
    <Header title='InputCode' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='默认'>
          <InputCode value='11' />
        </GroupList.Item>
        <GroupList.Item title='焦点'>
          <InputCode value='11' focus />
        </GroupList.Item>
        <GroupList.Item title='输入密码'>
          <InputCode value='11' password />
        </GroupList.Item>
        <GroupList.Item title='4位验证码'>
          <InputCode value='11' length={4} />
        </GroupList.Item>
        <GroupList.Item title='配合数字键盘使用'>
          <InputCode value={value} focus />
          <NumberKeyboard {...props} />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

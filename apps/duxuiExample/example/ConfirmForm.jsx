import { Header, ScrollView, TopView, GroupList, Button, confirmForm, Input, toast, Textarea } from '@/duxuiExample'

export default TopView.page(function ConfirmFormExample() {
  return <>
    <Header title='ConfirmForm' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Button type='primary'
            onClick={async () => {
              const text = await confirmForm({
                form: <Input placeholder='请输入内容' align='center' />
              })
              toast(`结果：${text}`)
            }}
          >弹出输入框</Button>
        </GroupList.Item>
        <GroupList.Item title='其他表单'>
          <Button type='primary'
            onClick={async () => {
              const text = await confirmForm({
                form: <Textarea placeholder='请输入内容' />
              })
              toast(`结果：${text}`)
            }}
          >弹出多行文本</Button>
        </GroupList.Item>
        <GroupList.Item title='数据验证'>
          <Button type='primary'
            onClick={async () => {
              const text = await confirmForm({
                title: '数据验证',
                form: <Input placeholder='请输入内容' align='center' />,
                verify: val => {
                  if (!val) {
                    return toast('请输入内容')
                  }
                  if (val.length < 4) {
                    return toast('输入的内容太少了')
                  }
                  return true
                }
              })
              toast(`结果：${text}`)
            }}
          >弹出输入框</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
})

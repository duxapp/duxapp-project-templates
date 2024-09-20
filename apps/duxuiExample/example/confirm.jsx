import { Header, ScrollView, TopView, GroupList, confirm, Button, toast } from '@/duxuiExample'

export default function ConfirmExample() {

  return <TopView>
    <Header title='confirm' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='显示确认框框'>
          <Button
            onClick={async () => {
              const status = await confirm()
              toast(status ? '点击确定' : '点击了取消')
            }}
          >显示</Button>
        </GroupList.Item>
        <GroupList.Item title='自定义文字'>
          <Button
            onClick={() => {
              confirm({
                title: '自定义标题',
                content: '自定义内容',
                cancelText: '自定义取消',
                confirmText: '自定义确定'
              })
            }}
          >显示</Button>
        </GroupList.Item>
        <GroupList.Item title='不显示取消按钮'>
          <Button
            onClick={() => {
              confirm({
                cancel: false
              })
            }}
          >显示</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

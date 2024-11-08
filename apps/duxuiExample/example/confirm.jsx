import { Header, ScrollView, TopView, GroupList, confirm, Button, toast, Column, Text, TestIcon } from '@/duxuiExample'

export default function ConfirmExample() {

  return <TopView>
    <Header title='confirm' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='显示确认框框'>
          <Button
            type='primary'
            onClick={async () => {
              const status = await confirm()
              toast(status ? '点击确定' : '点击了取消')
            }}
          >显示</Button>
        </GroupList.Item>
        <GroupList.Item title='自定义文字'>
          <Button
            type='primary'
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
            type='primary'
            onClick={() => {
              confirm({
                cancel: false
              })
            }}
          >显示</Button>
        </GroupList.Item>
        <GroupList.Item title='自定义内容'>
          <Button
            type='primary'
            onClick={() => {
              confirm({
                title: '自定义',
                content: <Column className='mh-3 mt-3'>
                  <Text type='primary'>这是自定义文本内容，这里可以放任何内容</Text>
                </Column>
              })
            }}
          >显示</Button>
        </GroupList.Item>
        <GroupList.Item title='自定义底部'>
          <Button
            type='primary'
            onClick={() => {
              const task = confirm({
                title: '自定义',
                content: '点击底部可以关闭，让这个弹框触发reject',
                renderBottom: <Column items='center' className='mt-3'>
                  <TestIcon name='fail-close_line' className='text-white' size={48}
                    onClick={() => {
                      task.close()
                    }}
                  />
                </Column>
              })
              task.then(status => {
                console.log('点击了确定或取消', status)
              }).catch(() => {
                console.log('点击了关闭图标')
              })
            }}
          >显示</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

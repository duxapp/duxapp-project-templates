import { Header, ScrollView, TopView, GroupList, Text, Button, Modal, Column, px } from '@/duxuiExample'
import { useState } from 'react'

export default function ModalExample() {

  return <TopView>
    <Header title='Modal' />
    <ScrollView>
      <GroupList>
        <Text type='danger'>这个组件即将被删除，请使用 PullView</Text>
        <GroupList.Item title='弹出框'>
          <Item />
        </GroupList.Item>
        <GroupList.Item title='关闭动画'>
          <Item animation={false} />
        </GroupList.Item>
        <GroupList.Item title='禁止点击阴影关闭'>
          <Item maskClosable={false} />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

const Item = props => {

  const [show, setShow] = useState(false)

  return <>
    <Button onClick={() => setShow(true)} type='primary'>点击弹出</Button>
    <Modal show={show} onClose={() => setShow(false)} maskClosable {...props}>
      <Column className='bg-white p-3' style={{ width: px(400), height: px(300) }}>
        <Text>弹出内容</Text>
        <Button onClick={() => setShow(false)} type='danger'>关闭</Button>
      </Column>
    </Modal>
  </>
}

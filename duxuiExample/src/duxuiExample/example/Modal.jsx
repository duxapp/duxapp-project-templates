import { Header, ScrollView, TopView, GroupList, Text, Button, Modal, Column } from '@/duxuiExample'
import { useState } from 'react'

const Item = props => {

  const [show, setShow] = useState(false)

  return <>
    <Button onClick={() => setShow(true)} type='primary'>点击弹出</Button>
    <Modal show={show} onClose={() => setShow(false)} {...props}>
      <Column style={{ width: 200, height: 150, backgroundColor: '#fff', padding: 12 }}>
        <Text>弹出内容</Text>
        <Button onClick={() => setShow(false)} type='danger'>关闭</Button>
      </Column>
    </Modal>
  </>
}

export default function ModalExample() {

  return <TopView>
    <Header title='Modal' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='弹出框'>
          <Item />
        </GroupList.Item>
        <GroupList.Item title='关闭动画'>
          <Item animation={false} />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

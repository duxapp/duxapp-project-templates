import { Header, ScrollView, TopView, GroupList, Text, Button, PullView, Space, px } from '@/duxuiExample'
import { useRef, useState } from 'react'

const sides = {
  'top': '上',
  'bottom': '下',
  'left': '左',
  'right': '右'
}

const PullData = ({ side, ...props }) => {

  const pull = useRef(null)

  const [show, setShow] = useState(false)

  const isRow = ['left', 'right'].includes(side)

  return <>
    <Button onClick={() => setShow(!show)} type='primary'>{sides[side] || '弹出'}</Button>
    {show && <PullView ref={pull} onClose={() => setShow(false)} side={side} {...props}>
      <Space style={isRow ? { width: px(400), backgroundColor: '#fff', padding: px(24) } : { height: px(400), backgroundColor: '#fff', padding: px(24) }}>
        <Text>内容1</Text>
        <Text color={2}>调用关闭方法时</Text>
        <Text color={2}>点击阴影部分也可以关闭</Text>
        <Button onClick={() => pull.current.close()} type='danger'>内部关闭</Button>
      </Space>
    </PullView>}
  </>
}

export default function PullViewExample() {
  return <TopView>
    <Header title='PullView' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='弹出容器'>
          <PullData />
        </GroupList.Item>
        <GroupList.Item title='禁止点进阴影关闭'>
          <PullData mask />
        </GroupList.Item>
        <GroupList.Item title='不显示阴影部分'>
          <PullData masking={false} />
        </GroupList.Item>
        <GroupList.Item title='方向'>
          <Space row>
            <PullData side='top' />
            <PullData side='bottom' />
            <PullData side='left' />
            <PullData side='right' />
          </Space>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

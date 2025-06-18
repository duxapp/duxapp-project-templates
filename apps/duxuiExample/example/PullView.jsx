import { Header, ScrollView, TopView, GroupList, Text, Button, PullView, Space, px } from '@/duxuiExample'
import { useRef, useState } from 'react'

export default function PullViewExample() {
  return <TopView>
    <Header title='PullView' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='弹出容器'>
          <PullData />
        </GroupList.Item>
        <GroupList.Item title='中间弹出' desc='弹出到中间建议自行给弹出内容设置宽度'>
          <PullData side='center' />
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
        <GroupList.Item title='按队列的形式弹出多个PullView' desc='设置相同的group属性让他在同一个分组'>
          <PullMoreData />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

const sides = {
  'top': '上',
  'bottom': '下',
  'left': '左',
  'right': '右',
  'center': '弹出到中间'
}

const PullData = ({ side, ...props }) => {

  const pull = useRef(null)

  const [show, setShow] = useState(false)

  const isRow = ['left', 'right'].includes(side)

  return <>
    <Button onClick={() => setShow(!show)} type='primary'>{sides[side] || '弹出'}</Button>
    {show && <PullView ref={pull} onClose={() => setShow(false)} side={side} {...props}>
      <Space
        className='bg-white p-3'
        style={isRow || side === 'center'
          ? { width: px(500) }
          : { height: px(400) }
        }
      >
        <Text>内容1</Text>
        <Text color={2}>调用关闭方法时</Text>
        <Text color={2}>点击阴影部分也可以关闭</Text>
        <Button onClick={() => pull.current.close()} type='danger'>内部关闭</Button>
      </Space>
    </PullView>}
  </>
}

const PullMoreData = () => {
  const pull1 = useRef(null)
  const pull2 = useRef(null)

  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)

  return <>
    <Button
      onClick={() => {
        setShow1(true)
        setShow2(true)
      }}
      type='primary'
    >弹出多个PullView</Button>
    {show1 && <PullView ref={pull1} group='PullView' onClose={() => setShow1(false)}>
      <Space
        className='bg-white p-3 items-center'
        style={{ height: px(400) }}
      >
        <Text size={7}>弹出的第一个PullView</Text>
        <Button onClick={() => pull1.current.close()} type='danger'>内部关闭</Button>
      </Space>
    </PullView>}
    {show2 && <PullView ref={pull2} onClose={() => setShow2(false)} group='PullView'>
      <Space
        className='bg-white p-3 items-center'
        style={{ height: px(400) }}
      >
        <Text size={7}>弹出的第二个PullView</Text>
        <Button onClick={() => pull2.current.close()} type='danger'>内部关闭</Button>
      </Space>
    </PullView>}
  </>
}

import { PullView, TopView, duxappTheme, Column, Row, Text, px, Divider, confirm, Textarea, toast, loading, Avatar, Empty, nav } from '@/duxui'
import { CmsIcon, List, request } from '@/duxcms'
import { useCallback, useRef, useState } from 'react'
import { user } from '@/user'

export const Comment = ({ item, onClose }) => {

  const [, setReload] = useState(0)

  const pullView = useRef()

  const action = useRef()

  const value = useRef('')

  const input = useCallback(async () => {
    const task = confirm({
      title: '评论',
      content: <Column className='mh-3 r-2 bg-page mt-3'>
        <Textarea placeholder='请输入评论内容' defaultValue={value.current} focus line={3} onChange={val => value.current = val} />
        <Row items='center' justify='between' className='p-3'>
          <Text size={5}
            onClick={async () => {
              task.cancel()
              const { backData } = await nav('duxcmsShortVideo/user/atlist')
              const res = await backData()
              if (res?.id) {
                value.current += '@' + res.nickname + ' '
              }
              input()
            }}
          >@</Text>
          {/* <CmsIcon name='navigation_fill' size={40} color={duxappTheme.textColor2} /> */}
        </Row>
      </Column>,
      confirmText: '评论'
    })
    if (await task) {
      if (!value.current) {
        return toast('请输入内容')
      }
      await request({
        url: `member/comment/short/${item.id}`,
        method: 'POST',
        data: {
          content: value.current
        },
        loading,
        toast: true
      })
      item.comment++
      setReload(old => old + 1)
      value.current = ''
      action.current.reload()
    }
  }, [item.comment, item.id])

  return <PullView ref={pullView} onClose={onClose}>
    <Column className='rt-3 bg-white p-3' style={{ height: px(1100) }}>
      <Row items='center' justify='between'>
        <CmsIcon name='op_close' size={48} color='#fff' />
        <Row items='center'>
          <CmsIcon name='comments' size={48} color={duxappTheme.textColor1} />
          <Text>共{item.comment}条评论</Text>
        </Row>
        <CmsIcon name='op_close' size={48} color={duxappTheme.textColor1} onClick={() => pullView.current.close()} />
      </Row>
      <List
        url={`member/comment/short/${item.id}`}
        renderItem={CommentItem}
        renderEmpty={<Empty title='暂无评论' />}
        onAction={action}
        page={false}
        renderLine={<Divider style={{ marginLeft: px(98) }} />}
      />
      <Divider />
      <Row items='center' className='mv-3 r-2 pv-2 ph-3 bg-page' onClick={input}>
        <Text size={2} grow>@ <Text color={3}>留下你的精彩评论吧</Text></Text>
        <CmsIcon name='navigation_fill' size={40} color={duxappTheme.textColor2} />
      </Row>
    </Column>
  </PullView>
}

Comment.show = (item, hookData) => {
  const { remove } = TopView.add([
    Comment,
    {
      item,
      hookData,
      onClose: () => {
        remove()
      }
    }
  ])
}

const CommentItem = ({ item }) => {

  const [, setReload] = useState(0)

  const like = useCallback(async () => {
    if (!user.isLogin()) {
      await user.login()
    }
    const { status } = await request({
      url: `member/praise/comment/${item.id}`,
      loading,
      method: 'POST',
      toast: true
    })
    if (status) {
      item.praise += 1
      item.is_praise = true
    } else {
      item.praise -= 1
      item.is_praise = false
    }
    setReload(old => old + 1)
  }, [item])

  const praiseColor = item.is_praise ? duxappTheme.primaryColor : duxappTheme.textColor3
  return <Row key={item.id} items='start' className='gap-2 pv-3'>
    <Avatar url={item.avatar} />
    <Column grow className='mt-1'>
      <Text size={1} color={2}>{item.nickname} · <Text color={3}>{item.time}</Text></Text>
      <Text>{item.content}</Text>
    </Column>
    <Column items='center' style={{ width: px(56) }} onClick={like}>
      <CmsIcon name={item.is_praise ? 'good-fill' : 'good'} size={40} color={praiseColor} />
      <Text size={1} color={praiseColor}>{item.praise}</Text>
    </Column>
  </Row>
}

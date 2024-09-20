import { useCallback } from 'react'
import { Row, Text, Image, Button, Empty, Space, Avatar, Column, Grade, Grid, Divider, duxappTheme } from '@/duxui'
import { nav, usePageData, useRequest, CmsIcon } from '@/duxcms'

export const CommentDetailList = ({
  type,
  id,
  emptyShow
}) => {

  const [list] = usePageData(`member/assess/has?type=${type}&id=${id}`)

  const [total] = useRequest(`member/assess/total?type=${type}&id=${id}`)

  const count = (total.good + total.medium + total.negative) || 0

  const toDetail = useCallback(() => {
    return nav('duxcmsUser/comment/list', { type, id })
  }, [id, type])

  if (!emptyShow && !list.length) {
    return
  }

  return <Column className='mh-3 mt-3 bg-white r-2 p-3 gap-3'>
    <Row items='center' onClick={toDetail}>
      <Text size={4} bold grow>评论({count})</Text>
      <Text color={3}>好评度 {(total.avg || 5) * 20 | 0}% </Text>
      <CmsIcon color={duxappTheme.textColor3} name='direction_right' />
    </Row>
    {
      list.slice(0, 2).map((item, index) => <CommentItem key={index} item={item} index={index} />)
    }
    {!!list.length && <Divider padding={0} />}
    {
      !list.length
        ? <Empty title='暂无评价' />
        : <Button onClick={toDetail} type='secondary' plain className='self-center'>查看全部评价</Button>
    }
  </Column>
}

export const CommentItem = ({ item }) => {
  // 给名字加*
  let username = item.user_nickname || item.user_tel || '匿名'
  if (username.length < 2) {
    username += '  '
  }
  username = username.split('')
  username.length == 2
    ? username.splice(1, 1, '*')
    : username.splice(1, username.length - 2, new Array(username.length - 2).fill('*').join(''))
  username = username.join('')

  return <Space row items='start'>
    <Avatar url={item.user_avatar}>{item.user_nickname?.substring(0, 1)}</Avatar>
    <Column grow className='gap-2'>
      <Space row items='center' className='pv-1'>
        <Text color={2} size={2}>{username}</Text>
        <Grade size='s' type='danger' value={item.score || 5} />
        <Text size={1} color={3} grow align='right'>{item.time?.substring(0, 10)}</Text>
      </Space>
      <Text size={1}>{item.content}</Text>
      {!!item.images.length && <Image.Group>
        <Grid column={4} square gap={24}>
          {
            item.images?.map((v, i) => <Image className='w-full h-full' src={v} key={i} radiusType='round-min' />)
          }
        </Grid>
      </Image.Group>}
    </Column>
  </Space>
}

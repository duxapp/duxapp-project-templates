import { useCallback } from 'react'
import { Text, Image, Button, Empty, Space, Avatar, Column, Grade, Grid, Divider, ImageGroup } from '@/duxui'
import { nav, usePageData } from '@/duxcms'

export const DiscussDetailList = ({
  type,
  id
}) => {

  const [list] = usePageData(`member/comment/${type}/${id}`)

  const toDetail = useCallback(() => {
    return nav('duxcmsUser/like/list', { type, id })
  }, [id, type])

  return <>
    {
      list.slice(0, 2).map((item, index) => <DiscussItem key={index} item={item} index={index} />)
    }
    {
      !list.length
        ? <Empty title='暂无评论' />
        : <Button onClick={toDetail} type='secondary' plain className='self-center mt-3'>查看全部</Button>
    }
  </>
}

export const DiscussItem = ({ item, index }) => {

  return <Space row items='start' className='mt-3'>
    <Avatar url={item.user_avatar}>{item.user_nickname}</Avatar>
    <Column grow className='gap-2'>
      <Space row items='center' className='pv-1'>
        <Text color={2} size={2}></Text>
        <Grade size='s' type='danger' value={item.score || 5} />
        <Text size={1} color={3} grow align='right'>{item.time}</Text>
      </Space>
      <Text size={1}>{item.content}</Text>
      <ImageGroup>
        <Grid column={4} square gap={24}>
          {
            item.images?.map((v, i) => <Image className='w-full h-full' src={v} key={i} radiusType='round-min' />)
          }
        </Grid>
      </ImageGroup>
      <Divider padding={0} />
    </Column>
  </Space>
}

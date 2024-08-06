import { ListLoading, duxappTheme, nav, px } from '@/duxapp'
import { Column, Grid, Image, Row, ScrollViewManage, Tag, Text } from '@/duxui'
import { usePageData } from '@/duxcmsUser'
import { useCallback, useEffect } from 'react'
import { CmsIcon } from '@/duxcms'

export const ContentItem = ({ item }) => {

  const toDetail = useCallback(() => {
    nav('duxcmsContent/article/detail', { id: item.id })
  }, [item.id])

  if (item.top) {
    return <Column className='p-3 r-2 bg-white gap-2 mh-3 mt-3' onClick={toDetail}>
      <Text size={4}>{item.title}</Text>
      <OtherInfo item={item} oneImg
        left={<Tag size='s' type='danger'>置顶</Tag>}
      />
    </Column>
  }

  const imgLength = item.images?.length || 0

  const oneImg = imgLength && imgLength < 3

  const content = <>
    <Text size={4}>{item.title}</Text>
    {
      imgLength > 2 && <Grid column={3} gap={12} className='r-2 overflow-hidden'>
        {
          item.images.slice(0, 3).map((img, imgIndex) => <Image key={imgIndex} src={img} className='w-full' style={{ height: px(150) }} />)
        }
      </Grid>
    }
    <OtherInfo item={item} oneImg={oneImg} />
  </>

  if (oneImg) {
    return <Row className='p-3 r-2 bg-white gap-3 mh-3 mt-3' onClick={toDetail}>
      <Image src={item.images[0]} style={{ width: px(240), height: px(160) }} className='r-2' />
      <Column grow className='pv-2' justify='between'>
        {content}
      </Column>
    </Row>
  }

  return <Column className='p-3 r-2 bg-white gap-2 mh-3 mt-3' onClick={toDetail}>
    {content}
  </Column>
}

const OtherInfo = ({ left, item, oneImg }) => {
  return <Row items='center' className='gap-2'>
    {left}
    <Row items='center' className='gap-3' grow>
      {item.source && <Row className='gap-1' items='center'>
        {item.source_avatar && <Image src={item.source_avatar} square className='r-3' style={{ width: px(36) }} />}
        <Text color={3} size={1}>{item.source}</Text>
      </Row>}
      <Text color={3} size={1}>{item.time.substring(5, 16)}</Text>
    </Row>
    {(!oneImg || !item.source) && <Row items='center' className='gap-3'>
      {item.praise > 0 && <Row items='center' className='gap-1'>
        <CmsIcon name='good-fill' size={32} color={duxappTheme.textColor3} />
        <Text size={1} color={3}>{item.praise}</Text>
      </Row>}
      {item.view > 0 && <Row items='center' className='gap-1'>
        <CmsIcon name='a-Eyevision' size={32} color={duxappTheme.textColor3} />
        <Text size={1} color={3}>{item.view}</Text>
      </Row>}
    </Row>}
  </Row>
}

export const ContentList = ({
  params,
  paging
}) => {
  const { onRefresh, bottomLoadStatus, onScrollToLower } = ScrollViewManage.useContext()

  const [data, dataAction] = usePageData({ url: 'content/article', data: params })

  useEffect(() => {
    const { remove } = onRefresh(dataAction.reload)
    let bottomRemove
    if (paging) {
      bottomRemove = onScrollToLower(dataAction.next).remove
    }
    return () => {
      remove()
      bottomRemove?.remove()
    }
  }, [dataAction.next, dataAction.reload, onScrollToLower, onRefresh, paging])

  return <>
    {
      data.map(item => <ContentItem key={item.id} item={item} />)
    }
    {paging && <ListLoading loading={bottomLoadStatus} text={bottomLoadStatus ? '加载中' : ''} />}
  </>
}

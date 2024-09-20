import { Header, TopView, duxappTheme, px, useRoute } from '@/duxapp'
import { Column, Image, Row, Text, ScrollView, HtmlView, Divider, Video } from '@/duxui'
import { collect, useLike, useRequest, contentHook, foot } from '@/duxcmsContent'
import { CmsIcon } from '@/duxcms/components/CmsIcon'
import { WechatShare } from '@/wechat'

export default TopView.HOC(function ArticleDetail() {

  const { params } = useRoute()

  const [data] = useRequest(`content/article/${params.id}`)

  const [collectStatus, collectAction] = collect.useCollect(params.id, 'article')

  const [likeStatus, likeAction] = useLike(params.id, 'article', data.praise)

  foot.useFoot(params.id, 'article')

  WechatShare.useSharePage({
    title: data.title,
    image: data.images?.[0],
    description: data.descriptions
  })

  return <>
    <Header title='详情' />
    <ScrollView>
      <contentHook.Render mark='detail.info' option={{ data }}>
        <Column className='m-3 p-3 r-2 bg-white gap-3'>
          <Text size={4} bold>{data.title}</Text>
          <Row items='center' justify='between'>
            <Row className='gap-2'>
              {data.source && <Row className='gap-1' items='center'>
                {data.source_avatar && <Image src={data.source_avatar} square className='r-3' style={{ width: px(36) }} />}
                <Text color={3} size={1}>{data.source}</Text>
              </Row>}
              <Text color={3} size={1}>{data.time?.substring(5, 16)}</Text>
            </Row>
            <Row items='center' className='gap-1'>
              <CmsIcon name='a-Eyevision' size={32} color={duxappTheme.textColor3} />
              <Text size={1} color={3}>{data.view}</Text>
            </Row>
          </Row>
          {!!data.extend?.video?.url && <Video src={data.extend.video.url} showPlayBtn showFullscreenBtn controls style={{ height: px(420) }} />}
          <HtmlView html={data.content} />
        </Column>
      </contentHook.Render>
      <Column className='p-1' />
    </ScrollView>
    <Divider padding={0} />
    <Row className='ph-3 pv-1 bg-white gap-4'>
      <contentHook.Render mark='detail.collect' option={{ collectStatus, collectAction, data }}>
        <Column items='center' onClick={collectAction.action}>
          <CmsIcon
            name={collectStatus ? 'collection-fill' : 'collection'}
            size={56}
            color={collectStatus ? duxappTheme.primaryColor : duxappTheme.textColor1}
          />
          <Text size={1} {...collectStatus ? { type: 'primary' } : { color: 1 }}>收藏</Text>
        </Column>
      </contentHook.Render>
      <contentHook.Render mark='detail.share' option={{ data }}>
        <WechatShare.Button>
          <Column items='center'>
            <CmsIcon name='share_03' size={56} color={duxappTheme.textColor1} />
            <Text size={1}>分享</Text>
          </Column>
        </WechatShare.Button>
      </contentHook.Render>
      <Column grow />
      <contentHook.Render mark='detail.like' option={{ likeStatus, likeAction, data }}>
        <Row items='center' onClick={likeAction.action}>
          <CmsIcon size={42} name={likeStatus ? 'good-fill' : 'good'} color={likeStatus ? duxappTheme.dangerColor : duxappTheme.textColor3} />
          <Text {...likeStatus ? { type: 'danger' } : { color: 3 }}>{likeAction.count}</Text>
        </Row>
      </contentHook.Render>
    </Row>
  </>
})

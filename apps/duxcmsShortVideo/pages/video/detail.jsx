import { Button, Empty, Header, TopView, loading, nav, useRoute } from '@/duxui'
import { ShortVideoList, request, useRequest } from '@/duxcmsShortVideo'
import { useEffect } from 'react'

export default TopView.HOC(function ShortVideo() {

  const { params } = useRoute()

  const [data, action] = useRequest({
    url: `short/video/${params.id}`,
    loading,
    toast: true
  })

  useEffect(() => {
    // 触发分享
    if (params.share) {
      const timer = setTimeout(() => {
        request({
          url: `short/video/${params.id}`,
          method: 'POST',
          data: {
            duration: 10000,
            area: 'video'
          }
        })
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [params.id, params.share])

  return (
    <>
      <Header absolute color='#fff' style={{ backgroundColor: 'transparent' }} />
      {
        !data.id && !action.loading && <Empty title='视频不见了' />
      }
      {!!data.id && <ShortVideoList list={[data]} url='none' detail={1} />}
      {!!params.share && <Button className='absolute m-3 left-0 right-0' type='primary'
        style={{ top: global.systemInfo.statusBarHeight + 44 }}
        onClick={() => nav('back:home')}
      >查看更多精彩视频</Button>}
    </>
  )
})

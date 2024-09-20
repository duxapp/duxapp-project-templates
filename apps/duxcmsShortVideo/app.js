import { confirm, loading, nav } from '@/duxui'
import './renderHook'
import { request, route } from './utils'

export default {}

route.onNavBefore(async (_option, params) => {
  const adPaths = [
    'duxcmsShortVideo/pages/ad/package',
    'duxcmsShortVideo/pages/ad/list',
    'duxcmsShortVideo/pages/ad/customer'
  ]
  if (adPaths.includes(params.path)) {
    // 验证是否有广告权限
    const res = await request({
      url: 'member/stats',
      loading,
      toast: true
    })
    if (!res.advert?.status) {
      if (await confirm({
        content: '您没有成为广告主，是否去申请？'
      })) {
        nav('duxcmsShortVideo/ad/apply')
      }
      throw '无权限'
    }
  }
})

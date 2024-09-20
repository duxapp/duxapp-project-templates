import { confirm, nav, route, loading } from '@/duxui'
import { request, saleBindForm } from './utils'

export default {
  show: data => {
    saleBindForm(data.query)
  }
}

// 绑定分销
if (process.env.TARO_ENV === 'h5') {
  // h5 获取分销参数 用于绑定
  const h5params = { ...route.getQueryVariable(), ...route.getHashQueryVariable().params }
  saleBindForm(h5params)
} else if (process.env.TARO_ENV === 'rn') {
  saleBindForm({})
}

route.onNavBefore(async (config, params) => {
  if (params.path === 'duxcmsSale/pages/index/index') {
    await request({
      url: 'sale/index',
      repeatTime: 0,
      // toast: true,
      loading
    }).catch(err => {
      confirm({
        content: err.message,
        confirmText: '去升级'
      }).then(status => {
        status && nav('duxcmsSale/index/apply')
      })
      throw err
    })
  }
})

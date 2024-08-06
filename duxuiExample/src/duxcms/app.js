import { formConfig } from '@/duxui/components/Form/config'
import {
  app,
  request,
  upload,
  uploadTempFile,
  updateApp,
  userConfig
} from './utils'

app.register('duxcms')

formConfig.setConfig({
  request,
  upload,
  uploadTempFile
})

// 检查app更新
setTimeout(async () => {
  if (process.env.TARO_ENV === 'rn') {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      return console.log('调试模式不检查更新')
    }
    updateApp(async () => {
      const type = userConfig.option.duxcms?.appUpgrade?.type
      const { info } = await request({ url: 'upgrade/check', data: type ? { type } : {} })
      return info
    })
  }
}, 2000)

export default {}

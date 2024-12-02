import { userConfig } from '@/duxapp'

/**
 * 请求默认配置，无需修改
 * 请通过duxapp入口修改请求配置
 */
const config = userConfig.option.duxcms?.request || {}

if (config.origin) {
  // 全局资源请求Header参数 Referer用于防盗链
  // global.__IMAGE_GLOBAL_SOURCE__ = {
  //   headers: {
  //     Referer: config.origin + '/'
  //   }
  // }
  // global.__VIDEO_GLOBAL_SOURCE__ = {
  //   headers: {
  //     Referer: config.origin + '/'
  //   }
  // }
}

export default config

export const duxcmsRequestConfig = {
  config: {
    request: {
      origin: config.origin,
      path: config.path,
      contentType: 'application/json'
    },
    result: {
      code: 'statusCode',
      data: ['data', 'data'],
      successCode: 200,
      message: res => {
        if (res.statusCode === 200) {
          return res.data.message
        }
        return res.data
      }
    },
    upload: {
      api: 'member/upload',
      requestField: 'file',
      resultField: ['data', 'data', 0, 'url']
    }
  },
  middle: {}
}

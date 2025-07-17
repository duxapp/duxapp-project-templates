import { createRequest, createUpload, createRequestHooks, getPlatform, networkVerify } from '@/duxapp/utils'
// import md5 from 'crypto-js/md5'
import hmacSha256 from 'crypto-js/hmac-sha256'
import encHex from 'crypto-js/enc-hex'
import qs from 'qs'
import { uploadMiddleCompressor } from '@/duxappCompress'
import config, { duxcmsRequestConfig } from '../config/request'

export const requestConfig = duxcmsRequestConfig

const { request, throttleRequest, middle: requestMiddle } = createRequest(duxcmsRequestConfig)
const { upload, uploadTempFile, middle: uploadMiddle } = createUpload(duxcmsRequestConfig)

const before = async params => {

  const timestamp = Math.round(new Date().getTime() / 1000)
  const [orign, query] = params.url.split('?')
  const paths = orign.split('/').slice(orign.startsWith('http') ? 3 : 1)
  // const contentMD5 = md5(
  //   !params.body
  //     ? ''
  //     : params.contentType === 'application/json'
  //       ? JSON.stringify(params.body)
  //       : qs.stringify(params.body, { encode: false })
  // ).toString().toLowerCase()
  const contentDate = timestamp.toString()

  const signData = []
  signData.push('/' + paths.join('/'))
  signData.push(qs.stringify({
    ...params.query,
    ...query ? qs.parse(query) : {}
  }, { encode: false }))
  // signData.push(contentMD5)
  signData.push(contentDate)

  const hash = hmacSha256(signData.join('\n'), config.secretKey)
  const sign = encHex.stringify(hash)

  params.header = {
    Accept: 'application/json',
    AccessKey: config.secretId,
    'Platform': getPlatform(),
    'Content-MD5': sign,
    'Content-Date': contentDate,
    ...params.header,

  }
  return params
}
requestMiddle.before(before, 10)
// RN端实现压缩功能
if (process.env.TARO_ENV === 'rn') {
  uploadMiddle.before(uploadMiddleCompressor, 0)
}
uploadMiddle.before(before, 10)
requestMiddle.result(async (res) => {
  if (res.statusCode === 200) {
    const data = res.data.data || {}
    data._meta = res.data.meta
    return data
  }
  throw {
    ...(res.data && typeof res.data === 'object' ? res.data : { data: res.data }),
    code: res.statusCode,
    message: res.data?.message || res.data
  }
}, 10)

// 兼容新系统返回值是对象
uploadMiddle.result((res => {
  return res.map(item => {
    if (item.statusCode !== 200) {
      throw item.data || item.errMsg
    }
    try {
      const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data
      if (data.code !== 200) {
        throw data.message
      }
      if (Array.isArray(data.data)) {
        return data.data[0].url
      }
      return data.data.url
    } catch (error) {
      console.log('无效的JSON数据', error)
      throw error
    }
  })
}), 10)

// ios首次安装无法请求
requestMiddle.before(networkVerify)

const { useRequest, usePageData } = createRequestHooks(request)

export {
  request,
  throttleRequest,
  requestMiddle,
  upload,
  uploadTempFile,
  uploadMiddle,
  useRequest,
  usePageData
}

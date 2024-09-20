import { createRequest, createUpload, createRequestHooks, getPlatform, networkVerify } from '@/duxapp/utils'
// import md5 from 'crypto-js/md5'
import hmacSha256 from 'crypto-js/hmac-sha256'
import encHex from 'crypto-js/enc-hex'
import qs from 'qs'
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

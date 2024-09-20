import { ObjectManage, createList } from '@/duxui'
import { createRequest, createUpload, createRequestHooks, networkVerify } from '@/duxapp/utils'

class User extends ObjectManage {
  constructor() {
    super({
      cache: true,
      cacheKey: 'design-shop-user'
    })
  }

  data = {

  }

  isLogin = () => !!this.data.token

  logout = () => {
    this.set({})
  }
}

export const user = new User()

const config = {
  origin: "https://www.dux.cn",
  path: "v", // 域名二级目录
  secretId: "69172925",
  secretKey: "c8bcd59b5b3e43522b084e56db51f19a"
}

const requestConfig = {
  config: {
    request: {
      origin: config.origin,
      path: config.path,
      contentType: 'application/json'
    },
    result: {
      code: 'statusCode',
      data: ['data', 'data'],
      succesCode: 200,
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

const { request, throttleRequest, middle: requestMiddle } = createRequest(requestConfig)
const { upload, uploadTempFile, middle: uploadMiddle } = createUpload(requestConfig)

// 监听全局请求，如果返回401，则先登录后请求
const before = async params => {
  if(user.data.token) {
    params.header.Authorization = user.data.token
  }

  params.header = {
    Accept: 'application/json',
    ...params.header,
  }
  return params
}
requestMiddle.before(before, 10)
uploadMiddle.before(before, 10)
requestMiddle.result(async res => {
  if (res.statusCode === 401) {
    if (user.isLogin()) {
      user.logout()
    }
    throw {
      code: 401,
      message: '用户未登录'
    }
  } else if (res.statusCode === 200) {
    const data = res.data.data || {}
    data._meta = res.data.meta
    return data
  }
  throw {
    ...res.data,
    code: res.statusCode,
    message: res.data.message
  }
})

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

export const List = createList(usePageData)

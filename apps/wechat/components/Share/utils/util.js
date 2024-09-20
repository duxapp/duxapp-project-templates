import { userConfig } from '@/duxapp'

export const isShare = (config, path = '') => {
  if (config === true) {
    return true
  }
  if (config?.include?.length) {
    return config.include.some(v => {
      return path.includes(v)
    })
  }
  if (config?.exclude) {
    return config.exclude.every(v => {
      return !path.includes(v)
    })
  }
  return false
}

export const getPageConfig = (config = {}) => {
  const share = userConfig.option.wechat?.share
  const title = config.title || config.headerTitle || share?.common.title
  let option = null
  if (config.pageRegister) {
    option = {
      ...share?.common,
      ...config,
      title
    }
  } else if (isShare(share?.pageSlef, config.path)) {
    // 用户设置title 页面Header组件标题 配置的公共标题
    option = {
      ...share?.common,
      ...config,
      title
    }
  } else if (isShare(share?.pageHome, config.path)) {
    option = {
      weappImage: share?.common.image,
      ...share?.common,
      ...config,
      path: share?.pageHome.path,
      params: share?.pageHome.params
    }
  }
  if (option) {
    option.params = { ...config.globalParams, ...option.params }
  }
  return option
}

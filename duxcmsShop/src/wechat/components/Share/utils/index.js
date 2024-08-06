import { useCallback, useEffect, useMemo, useState } from 'react'
import qs from 'qs'
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { getPageConfig } from './util'

export const init = async () => {

}

export const registerH5ConfigPromise = () => { }

export const setPageShare = config => {

}

export const H5Guide = () => {
  return null
}

export const APPShare = () => {
  return null
}

export const useWeappShare = (key, Share) => {

  const [config, setConfig] = useState(Share.getCurrentPage())

  const { remove } = useMemo(() => {
    return Share.onCurrentPage(data => {
      if (data?.pageKey === key) {
        setConfig(data)
      }
    })
  }, [Share, key])

  useEffect(() => {
    return () => remove()
  }, [remove])

  const getResult = useCallback((data = {}) => {
    const { params, path, title, weappImage } = data
    const query = qs.stringify(params)

    return {
      path: `${path.startsWith('/') ? '' : '/'}${path}${query ? (path.includes('?') ? '&' : '?') : ''}${query}`,
      title: title,
      imageUrl: weappImage,
      // 分享到朋友圈参数 分享朋友圈不支持 path 但支持query
      query
    }
  }, [])

  const globalParams = Share.useGlobalParams()

  const shareData = useMemo(() => {
    const _shareData = getPageConfig({ ...config, globalParams })
    if (!_shareData) {
      return null
    }
    return {
      ...getResult(_shareData),
      async: _shareData.async
    }
  }, [globalParams, config, getResult])

  useShareAppMessage(() => {
    Share.shareEvent.trigger({
      type: 'weapp-0'
    })
    if (shareData?.async) {
      return {
        ...shareData,
        promise: shareData.async().then(getResult)
      }
    }
    return shareData
  })

  useShareTimeline(() => {
    Share.shareEvent.trigger({
      type: 'weapp-1'
    })
    if (shareData?.async) {
      return {
        ...shareData,
        promise: shareData.async().then(getResult)
      }
    }
    return shareData
  })
}

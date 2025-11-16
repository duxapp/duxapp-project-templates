import { TopView, asyncTimeOut, getPlatform } from '@/duxapp'
import WechatJSSDK from 'wechat-jssdk/dist/client.umd'
import { Image, View } from '@tarojs/components'
import qs from 'qs'
import { getPageConfig } from './util'
import tipicon from '../images/share-tips.png'
import './h5.scss'

const data = {
  configPromise: null,
  wechatObj: null
}

export const init = async () => {
  if (getPlatform() === 'wechat') {
    await asyncTimeOut(20)
    if (!data.configPromise) {
      return console.log('Share初始化失败：请调用 Share.h5ConfigPromise() 注册一个获取jssdk参数的函数')
    }
    const _config = await data.configPromise()
    data.wechatObj = new WechatJSSDK(_config)
    await data.wechatObj.initialize().catch(err => { })
  }
}

export const registerH5ConfigPromise = promise => {
  data.configPromise = promise
}

// const shareMenus = ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone']

export const setPageShare = async (config, globalParams, Share) => {
  if (data.wechatObj) {
    let _config = getPageConfig(config)
    if (_config) {
      if (_config.async) {
        _config = { ..._config, ...await _config.async() }
      }
      data.wechatObj.callWechatApi('showAllNonBaseMenuItem')
      const query = qs.stringify({ ...globalParams, ..._config.params })
      // const link = `${window.location.origin}${window.location.pathname}${window.location.search}#/${_config.path}${query ? (_config.path.includes('?') ? '&' : '?') : ''}${query}`

      // 不使用url的参数，参数交给分享处理
      const link = _config.h5Url || `${window.location.origin}${window.location.pathname}#/${_config.path}${query ? (_config.path.includes('?') ? '&' : '?') : ''}${query}`

      data.wechatObj.callWechatApi('updateAppMessageShareData', {
        title: _config.title, // 分享标题
        link, // 分享链接
        imgUrl: _config.image, // 分享图标
        desc: _config.desc, // 分享描述
        success: result => {
          Share.shareEvent.trigger({
            type: 'h5-0',
            result
          })
        }
      })
      data.wechatObj.callWechatApi('updateTimelineShareData', {
        title: _config.title, // 分享标题
        link, // 分享链接
        imgUrl: _config.image, // 分享图标
        success: result => {
          Share.shareEvent.trigger({
            type: 'h5-1',
            result
          })
        }
      })
    } else {
      data.wechatObj.callWechatApi('hideAllNonBaseMenuItem')
    }
  }
}

export const H5Guide = ({ onClose }) => {
  return <View onClick={onClose} className='ShareH5Guide absolute inset-0 z-1'>
    <Image src={tipicon} mode='widthFix' className='w-full' />
  </View>
}

H5Guide.show = () => {
  const { remove } = TopView.add([H5Guide, {
    onClose: () => remove()
  }])
}

export const APPShare = () => {
  return null
}

export const useWeappShare = () => {

}

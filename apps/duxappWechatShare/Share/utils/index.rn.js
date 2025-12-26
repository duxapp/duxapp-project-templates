import { PullView, TopView, duxappTheme, px } from '@/duxapp'
import ExpoWeChat from 'expo-wechat'
import { Image, View, Text } from '@tarojs/components'
import qs from 'qs'
import { getUserConfig } from './util'
import weixinIcon from '../images/weixin.png'
import pengyouquanIcon from '../images/pengyouquan.png'
import shoucangIcon from '../images/shoucang.png'
import xiaochengxuIcon from '../images/xiaochengxu.png'
import './rn.scss'

export const init = async () => {

}

export const registerH5ConfigPromise = () => { }

export const setPageShare = () => {

}

export const H5Guide = () => {
  return null
}

export const APPShare = ({
  menus,
  onClose,
}) => {
  return <PullView onClose={onClose}>
    <View className='ShareAPPShare bg-white rt-3'>
      <View className='ShareAPPShare__head items-center justify-center'>
        <Text style={{ fontSize: px(32) }}>分享</Text>
      </View>
      <View className='flex-row'>
        {
          menus.map((item, index) => {
            return <View className='items-center flex-grow gap-2' key={index}
              onClick={() => {
                onClose()
                setTimeout(() => {
                  item.callback()
                }, 20)
              }}
            >
              <Image src={item.icon} style={{ width: px(70), height: px(70) }} />
              <Text style={{ color: duxappTheme.textColor1 }}>{item.name}</Text>
            </View>
          })
        }
      </View>
    </View>
  </PullView>
}

APPShare.show = (config, WechatShare) => {
  const app = getUserConfig().platform?.app || {}
  if (!app?.weappUserName && !app.h5Url) {
    return console.log('openShare: 未启用app端分享，请配置option.wechat.share.platform.app')
  }

  const menus = []
  const query = qs.stringify({ ...config.globalParams, ...config.params })
  const path = `${config.path.startsWith('/') ? '' : '/'}${config.path}${query ? (config.path.includes('?') ? '&' : '?') : ''}${query}`
  if (app?.weappUserName) {
    const miniParams = {
      path,
      id: app.weappUserName,
      title: config.title,
      description: config.desc,
      thumbBase64OrImageUri: config.image,
      webpageUrl: `${app?.h5Url || 'http://duxapp.com'}/#${path}`
    }
    menus.push({
      icon: xiaochengxuIcon,
      name: '小程序',
      callback: async () => {
        const result = await ExpoWeChat.shareMiniProgram({
          ...miniParams,
          scene: 'session'
        })
        WechatShare.shareEvent.trigger({
          type: 'weapp-0',
          result
        })
      }
    })
  }

  if (app?.h5Url || config.h5Url) {
    const webpageParams = {
      title: config.title,
      description: config.desc,
      thumbImageUrl: config.image,
      webpageUrl: config.h5Url || `${app.h5Url}/#${path}`
    }
    menus.push({
      icon: weixinIcon,
      name: '微信好友',
      callback: async () => {
        const result = await ExpoWeChat.shareWebpage({
          ...webpageParams,
          scene: 'session'
        })
        WechatShare.shareEvent.trigger({
          type: 'h5-0',
          result
        })
      }
    }, {
      icon: pengyouquanIcon,
      name: '朋友圈',
      callback: async () => {
        const result = await ExpoWeChat.shareWebpage({
          ...webpageParams,
          scene: 'timeline'
        })
        WechatShare.shareEvent.trigger({
          type: 'h5-1',
          result
        })
      }
    }, {
      icon: shoucangIcon,
      name: '微信收藏',
      callback: async () => {
        const result = await ExpoWeChat.shareWebpage({
          ...webpageParams,
          scene: 'favorite'
        })
        WechatShare.shareEvent.trigger({
          type: 'h5-2',
          result
        })
      }
    })
  }

  if (!menus.length) {
    return console.log('未配置任何分享方式')
  } else if (menus.length === 1) {
    menus[0].callback()
  } else {
    const { remove } = TopView.add([APPShare, {
      menus,
      onClose: () => remove()
    }])
  }
}

export const useWeappShare = () => {

}

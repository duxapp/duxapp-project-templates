import { ViewProps } from '@tarojs/components'
import { FC } from 'react'

interface SharePageParamsBase {
  /** 分享标题 默认会取当前页面Header的标题 */
  title?: string
  /** 分享描述 这在小程序端无效 在H5和APP 分享H5的时候有效 */
  desc?: string
  /**
   * 分享路径默认当前页面 需要加上pages这一层
   * 请不要在最前面加上 /
   * 小程序端分享到朋友圈时，这个参数将无效
   */
  path?: string
  /**
   * 分享参数
   * 如果你定义了分享参数，那么将会忽略当前路由的参数，但是会加上全局参数
   */
  params?: {
    [key: string]: string | number
  }
  /**
   * 分享图片 仅H5和APP端生效
   * 小程序端默认使用截屏 如需指定小程序端分享图片请使用 weappImage
   */
  image?: string
  /**
   * 小程序端分享图片
   * 如果未设置写个值，当采用小程序默认的截屏方案
   */
  weappImage?: string
}

interface SharePageParams extends SharePageParamsBase {
  /**
   * 异步返回分享参数
   * 请注意，传入这个函数需要用 useCallback 进行包装，否则将导致错误
   */
  async: () => Promise<SharePageParamsBase>
}

export class WechatShare {
  /**
   * 在页面上调用，用来注册当前页面的分享参数
   * 特别注意，页面上调用的时候，你当前页面的TopView组件，需要使用 TopView.HOC 的形式，否则你注册的参数将不生效
   * 此函数直接传入参数，而不是回调函数在返回参数，因为在微信H5端需要在页面运行的时候就把参数注册进去，而不是等用户点击分享
   */
  static useSharePage: (params: SharePageParams) => void

  /**
   * 分享点击按钮，
   * 在小程序端使用Taro Button组件，发起分享，按钮的样式已经被清除，可以将起作为一个View使用
   * 在APP端和小程序端如果你传入单个子元素，会使用你传入的子元素的点击事件发起分享，否则会创建一个View
   * APP端分享会调出菜单，用于分享到好友或者朋友圈等
   * H5端分享会弹出分享提示，提示用户打开菜单进行分享
   */
  static Button: FC<ViewProps>

  /**
   * 用函数的形式打开分享面板
   * 这仅对APP和H5端生效
   * 一般使用 WechatShare.Button 组件完成这个操作
   */
  static openShare: () => void

  /**
   * 用于监听分享事件
   * 这并不能代表用户分享成功，只能表示用户点击了分享按钮
   */
  static onShare: (callback: (params: {
    /**
     * 分享类型
     * weapp-0 分享小程序到好友
     * weapp-1 分享小程序到朋友圈
     * h5-0 分享网页到好友
     * h5-1 分享网页到朋友圈
     * h5-2 分享网页到收藏
     */
    type: 'weapp-0' | 'weapp-1' | 'h5-0' | 'h5-1' | 'h5-2'
    /**
     * 分享结果
     * 这是调用分享接口的返回值，每个端不一样
     */
    result?: any
  }) => void) => {
    /**
     * 移除监听
     */
    remove: () => void
  }

  /**
   * 设置全局分享参数
   * 调用后，这些参数在所有页面的分享中都会被带上
   * 你可以传入一个对象，这样他会和现有参数合并
   * 你还可以传入一个函数，函数的参数是当前全局参数，你需要返回新的全局参数
   */
  static setGlobalParams: (params: { [key: string]: any } | ((params: { [key: string]: any }) => { [key: string]: any })) => void

  /**
   * 设置那些路由参数禁止携带在分享参数上
   * 例如你登录的token如果在你的url参数上，可以设置禁用分享这些参数
   */
  static setDisableGlobalParams: (...keys: string[]) => void

  /**
   * 对于H5端需要注册一个函数，返回JSSDK的初始化参数，否则分享功能将无效
   * 其中的 jsApiList 至少需要包含下面这些
   * updateAppMessageShareData
   * updateTimelineShareData
   * showAllNonBaseMenuItem
   * hideAllNonBaseMenuItem
   * openLocation
   *
   * 其中 openLocation 不是用于分享的，而是用于在基础路由中，可以用路由调起微信的位置预览功能
   *
   * 参数参见 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
   */
  static h5ConfigPromise: (callback: () => Promise<{
    debug: boolean
    appId: string
    timestamp: number
    nonceStr: string
    signature: string
    jsApiList: string[]
  }>) => void
}

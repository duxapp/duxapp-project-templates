import { cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TopView, noop, useRoute, QuickEvent, useDeepObject, deepCopy } from '@/duxapp'
import { Button, View } from '@tarojs/components'
import classNames from 'classnames'
import { registerH5ConfigPromise, init, setPageShare, H5Guide, APPShare, useWeappShare } from './utils'
import { getPageConfig } from './utils/util'
import './index.scss'

const context = createContext({
  addPageShare: noop
})

const TopViewProvider = TopView.context.Provider

const ShareRoot = (() => {
  let pageKey = 0
  return ({ children }) => {

    const { params, path } = useRoute()

    const findParams = useMemo(() => {
      if (!WechatShare.disableGlobalParams.length) {
        return params
      }
      const _params = { ...params }
      WechatShare.disableGlobalParams.forEach(key => {
        if (key in _params) {
          delete _params[key]
        }
      })
      return _params
    }, [params])

    const paramsDeep = useDeepObject(findParams)

    const _key = useMemo(() => pageKey++, [])

    useMemo(() => {
      WechatShare.addPage({ pageKey: _key, path, params: findParams })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_key])

    const addPageShare = useCallback(option => {
      WechatShare.addPage({ pageKey: _key, path, params: paramsDeep, ...option, pageRegister: true })
    }, [_key, paramsDeep, path])

    useEffect(() => {
      return () => WechatShare.removePage(_key)
    }, [_key])

    // 小程序端分享
    useWeappShare(_key, WechatShare)

    const setConfig = useCallback(({ title }) => {
      WechatShare.addPage({ pageKey: _key, headerTitle: title })
    }, [_key])

    return <context.Provider value={{ addPageShare }}>
      <TopViewProvider value={{ setConfig }}>
        {children}
      </TopViewProvider>
    </context.Provider>
  }
})();

export class WechatShare {

  static init = async () => {
    if (!TopView.containers.includes(ShareRoot)) {
      TopView.addContainer(ShareRoot)
      await init()
      const callback = current => {
        setPageShare(current, this.globalParams, WechatShare)
      }
      const current = this.getCurrentPage()
      current && callback(current)
      this.onCurrentPage(callback)
    }
  }

  // 动态设置全局分享参数
  static globalParams = {}
  static globalParamsEvent = new QuickEvent()
  static setGlobalParams = data => {
    if (typeof data === 'function') {
      data = data(this.globalParams)
    }
    if (data && typeof data === 'object') {
      this.globalParams = data
      this.globalParamsEvent.trigger(this.globalParams)
      // h5
      const h5Config = this.getCurrentPage()
      h5Config && setPageShare(h5Config, this.globalParams, WechatShare)
    }
  }
  // 获取全局分享参数
  static useGlobalParams = () => {
    const [data, setData] = useState(this.globalParams)

    const { remove } = useMemo(() => {
      return this.globalParamsEvent.on(setData)
    }, [])

    useEffect(() => {
      return () => remove()
    }, [remove])

    return data
  }

  static disableGlobalParams = []
  /**
   * 禁用页面自带的参数 如传入的一些分销参数，登录的code等，防止参数被分享给别人
   * @param  {...any} list
   */
  static setDisableGlobalParams = (...keys) => {
    this.disableGlobalParams = keys
  }

  /**
   * 注册一个异步方法用于获取分享参数
   */
  static h5ConfigPromise = registerH5ConfigPromise

  /**
   * 分享页面数据
   */
  static sharePageData = []
  static addPage = data => {
    const i = this.sharePageData.findIndex(v => v.pageKey === data.pageKey)
    if (~i) {
      this.sharePageData[i] = { ...this.sharePageData[i], ...data }
    } else {
      this.sharePageData.push(data)
    }
    const config = this.getCurrentPage()
    config && this.currentPageEvent.trigger(config)
  }
  static removePage = key => {
    const i = this.sharePageData.findIndex(v => v.pageKey === key)
    if (~i) {
      this.sharePageData.splice(i, 1)
      const config = this.getCurrentPage()
      config && this.currentPageEvent.trigger(config)
    }
  }

  static currentPageEvent = new QuickEvent()
  static getCurrentPage = () => deepCopy(this.sharePageData[this.sharePageData.length - 1])
  /**
   * 监听当前页面变化
   * @param {*} callback
   */
  static onCurrentPage = this.currentPageEvent.on
  /**
   * 注册页面分享
   * @param {*} option
   */
  static useSharePage = option => {

    const { addPageShare } = useContext(context)

    const _option = useDeepObject(option)

    useEffect(() => {
      if (typeof option?.async === 'function') {
        _option.async = option.async
      }
      if (Object.keys(_option).length) {
        addPageShare(_option)
      }
    }, [addPageShare, _option, option?.async])
  }

  /**
   * 打开页面分享
   */
  static openShare = async () => {

    let config = getPageConfig(this.getCurrentPage())
    if (!config) {
      return console.log('openShare:当前页面未配置分享参数，或者不支持分享')
    }

    if (process.env.TARO_ENV === 'weapp') {
      return console.log('openShare:小程序端不支持打开分享，请使用Button掉起分享')
    } else if (process.env.TARO_ENV === 'h5') {
      // 调用弹窗引导用户分享
      H5Guide.show()
    } else if (process.env.TARO_ENV === 'rn') {
      // 打开分享面板
      if (config.async) {
        config = { ...config, ...await config.async() }
      }
      APPShare.show({ ...config, globalParams: this.globalParams }, WechatShare)
    }
  }

  static Button = ({ style, className, ...props }) => {
    if (process.env.TARO_ENV === 'weapp') {
      return <Button style={style} openType='share' className={classNames('button-clean wechat-share-btn', className)} {...props} />
    } else {
      if (isValidElement(props.children)) {
        return cloneElement(props.children, {
          style: {
            ...style,
            ...props.children.props.style
          },
          onClick: this.openShare
        })
      }
      return <View style={style} onClick={this.openShare} {...props} />
    }
  }

  static shareEvent = new QuickEvent()
  /**
   * 监听分享成功
   * @param {*} callback
   */
  static onShare = this.shareEvent.on

}

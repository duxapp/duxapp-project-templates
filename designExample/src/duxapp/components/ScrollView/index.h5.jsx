import { Component } from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { ScrollView as TaroScrollView, View } from '@tarojs/components'
import { Loading } from '../Loading'
import { Horizontal } from './Horizontal'
import './index.scss'

export class ScrollView extends Component {

  state = {
    refreshLocal: false
  }

  componentDidMount() {
    Taro.nextTick(() => this.onReady())
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.refresh !== nextProps.refresh) {
      if (!nextProps.refresh) {
        this.hideRefresh()
      } else {
        this.showRefresh()
      }
    }
  }

  static Horizontal = Horizontal

  onReady() {
    // 查找当前的根View
    this.rootEle = this.root
    this.scrollEle = this.rootEle.getElementsByClassName('taro-scroll-view__scroll-y')[0]

    this.scrollInfoEle = this.rootEle.getElementsByClassName('scroll-refresh')[0]

    this.scrollInfoEle.style.height = this.refreshHeihgt + 'px'

    this.rootEle.addEventListener('touchstart', e => {
      this.scrollEle = this.scrollEle || this.rootEle.getElementsByClassName('taro-scroll-view__scroll-y')[0]

      if (!this.props.onRefresh || !e.changedTouches[0] || this.scrollEle.scrollTop !== 0) return
      this.scrollEle.style.transition = 'transform 0s'
      this.scrollInfoEle.style.transition = 'transform 0s'
      this.touchStartPos = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY,
        status: true
      }
    }, false)
    // 移动
    this.rootEle.addEventListener('touchmove', e => {
      if (!this.touchStartPos.status) return
      let y = e.changedTouches[0].pageY - this.touchStartPos.y
      if (this.refreshStatus) {
        y += this.refreshHeihgt
      }
      y = Math.max(0, y)
      y = (1 - Math.pow(Math.E, -(y / this.refreshMaxHeihgt))) * this.refreshMaxHeihgt
      this.scrollEle.style.transform = `translateY(${y}px)`
      this.scrollInfoEle.style.transform = `translateY(${y}px)`
      // 阻止微信页面被下拉
      y > 1 && e.preventDefault()
    }, false)

    this.rootEle.addEventListener('touchend', e => {
      if (!this.touchStartPos.status) return
      let y = Math.max(0, e.changedTouches[0].pageY - this.touchStartPos.y)
      y = (1 - Math.pow(Math.E, -(y / this.refreshMaxHeihgt))) * this.refreshMaxHeihgt
      this.touchStartPos.status = false
      this.refreshStatus = y > this.refreshHeihgt
      this.scrollEle.style.transition = 'transform 0.15s'
      this.scrollInfoEle.style.transition = 'transform 0.15s'
      this.scrollEle.style.transform = `translateY(${this.refreshStatus ? this.refreshHeihgt : 0}px)`
      this.scrollInfoEle.style.transform = `translateY(${this.refreshStatus ? this.refreshHeihgt : 0}px)`
      this.refreshStatus && this.refresh()
    }, false)
  }

  showRefresh() {
    if (!this.scrollEle) return
    this.scrollEle.style.transition = 'transform 0.3s'
    this.scrollInfoEle.style.transition = 'transform 0.3s'
    this.scrollEle.style.transform = `translateY(${this.refreshHeihgt}px)`
    this.scrollInfoEle.style.transform = `translateY(${this.refreshHeihgt}px)`
    this.refreshStatus = true
  }

  hideRefresh() {
    if (this.timerRefresh || !this.scrollEle) return
    this.scrollEle.style.transition = 'transform 0.3s'
    this.scrollInfoEle.style.transition = 'transform 0.3s'
    this.scrollEle.style.transform = `translateY(0px)`
    this.scrollInfoEle.style.transform = `translateY(0px)`
    this.refreshStatus = false
  }

  touchStartPos = {
    x: 0,
    y: 0,
    status: false
  }
  // 下拉刷新的高度 px
  refreshHeihgt = 70
  // 最大下拉刷新高度
  refreshMaxHeihgt = 300
  refreshStatus = false
  scrollEle = null
  scrollInfoEle = null

  refresh() {
    const { refreshLocal } = this.state
    const { refresh } = this.props
    if (!refresh && !refreshLocal) {
      this.props.onRefresh && this.props.onRefresh(this)
      // 防止过快隐藏刷新
      this.timerRefresh = true
      setTimeout(() => {
        this.timerRefresh = false
        !refresh && this.hideRefresh()
      }, 500)
    }
  }

  reload() {
    this.props.onReload && this.props.onReload()
  }

  render() {
    const {
      flip = false,
      className,
      style,
      _designKey,
      ...props
    } = this.props

    return (
      <View
        className={classNames('scroll-root', className)}
        style={style}
        ref={ref => this.root = ref}
        _designKey={_designKey}
      >
        <TaroScrollView
          scrollY
          className={classNames(
            'scroll-auto-height-h5 scroll',
            flip && 'scroll-flip'
          )}
          onTouchMove={() => { }}
          {...props}
        >
          {this.props.children}
        </TaroScrollView>
        <View className='scroll-refresh' >
          <Loading />
        </View>
      </View>
    )
  }
}

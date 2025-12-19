/* eslint-disable react-hooks/rules-of-hooks */
import { Skia } from '@shopify/react-native-skia'
import { useEffect, useReducer } from 'react'
import { PixelRatio } from 'react-native'
import { Context } from '../Context'
import { CanvasImage } from './Image'

export class Canvas {

  constructor(option = {}) {
    this.option = option
  }

  getContext(type) {
    if (type !== '2d') {
      throw new Error('仅支持获取 2d 类型')
    }
    if (this.context) {
      return this.context
    }
    if (!this.layout) {
      throw new Error('无效的布局信息 layout')
    }

    this._createCanvas()

    const context = this.context = new Context(this.canvas, this.surface)

    const image = Skia.Image.MakeNull()

    // 自动执行绘制
    const draw = () => {
      if (this._isActive === false) {
        return
      }
      this.surface.makeImageSnapshot(this.rect, image)
      if (!this.image) {
        this.image = image
      }
      if (this.forceUpdate) {
        this.forceUpdate()
      }
    }
    context.onDraw(draw)
    // 立即执行，绑定 surface
    context.clearRect(0, 0, 100, 100)
    this.dispose = () => {
      this._isActive = false
      this.surface.dispose()
      this.rect.dispose()
      image.dispose()
      context.dispose()
      this.image = null
      this.context = null
    }

    return context
  }

  createImage() {
    return new CanvasImage()
  }

  get width() {
    return this.size?.width
  }

  get height() {
    return this.size?.height
  }

  // 帧动画功能
  requestAnimationFrame = requestAnimationFrame
  cancelAnimationFrame = cancelAnimationFrame

  _createCanvas() {
    this.surface?.dispose()
    this.rect?.dispose()

    const dpi = PixelRatio.get()

    const width = this.layout.width * dpi
    const height = this.layout.height * dpi
    this.size = {
      width,
      height
    }

    this.surface = Skia.Surface.Make(width, height)

    this.canvas = this.surface.getCanvas()

    this.canvas.scale(dpi, dpi)

    this.rect = Skia.XYWHRect(0, 0, width, height)
  }

  setLayout(layout) {
    this.layout = layout
    if (this.context) {
      // 重新创建canvas
      this._createCanvas()
      this.context.updateCanvas(this.canvas, this.surface)
    }
  }

  layout

  useImage() {
    const [, forceUpdate] = useReducer(x => x > 10 ? 0 : x + 1, 0)

    useEffect(() => {
      this.forceUpdate = forceUpdate
      return () => {
        this.forceUpdate = null
        this.dispose?.()
      }
    }, [])

    return this.image
  }
}

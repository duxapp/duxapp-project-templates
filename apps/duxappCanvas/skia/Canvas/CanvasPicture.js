/* eslint-disable react-hooks/rules-of-hooks */
import { createPicture, Skia } from '@shopify/react-native-skia'
import { PixelRatio } from 'react-native'
import { Context } from '../Context'
import { CanvasBase } from './CanvasBase'

export class Canvas extends CanvasBase {

  constructor() {
    super()
    this.context = new Context()
    this.context.canvas = this
    this.context.onDraw(() => {
      this.forceUpdate?.()
    })
  }

  getContext(type) {
    if (type !== '2d') {
      throw new Error('仅支持获取 2d 类型')
    }

    this._isActive = true

    return this.context
  }

  get width() {
    return this.layout?.width
  }

  set width(_value) {
    // Chart.js 等库可能会尝试设置 canvas.width 来调整 backing store，
    // 这里保持兼容（实际尺寸由布局决定）。
  }

  get height() {
    return this.layout?.height
  }

  set height(_value) {
    // 同 width
  }

  toDataURL(type, encoderOptions) {
    if (!this.layout) {
      throw new Error('无效的布局信息 layout')
    }

    const dpi = PixelRatio.get()
    const width = Math.max(1, Math.round(this.layout.width * dpi))
    const height = Math.max(1, Math.round(this.layout.height * dpi))

    const surface = Skia.Surface.Make(width, height)
    if (!surface) {
      throw new Error('无法创建 surface')
    }

    const picture = this.context?.picture ?? this._getEmptyPicture()
    const skiaCanvas = surface.getCanvas()
    skiaCanvas.clear(Skia.Color('#00000000'))
    skiaCanvas.save()
    skiaCanvas.scale(dpi, dpi)
    skiaCanvas.drawPicture(picture)
    skiaCanvas.restore()

    const image = surface.makeImageSnapshot()
    const dataURL = this._encodeImageToDataURL(image, type, encoderOptions)

    image.dispose?.()
    surface.dispose?.()

    return dataURL
  }

  dispose() {
    if (this._isActive) {
      this._isActive = false
      setTimeout(() => {
        this.context.dispose()
        this.context = null
        this._emptyPicture?.dispose?.()
        this._emptyPicture = null
      }, 1000)
    }
  }

  usePicture() {
    this.useForceUpdate(() => this.dispose())

    return this.context.picture ?? this._getEmptyPicture()
  }

  _emptyPicture
  _getEmptyPicture() {
    if (!this._emptyPicture) {
      this._emptyPicture = createPicture(() => { })
    }
    return this._emptyPicture
  }
}

/* eslint-disable react-hooks/rules-of-hooks */
import { Skia } from '@shopify/react-native-skia'
import { PixelRatio } from 'react-native'
import { Context } from '../Context'
import { CanvasBase } from './CanvasBase'

export class Canvas extends CanvasBase {

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

    const context = this.context = new Context(this.skiaCanvas, this.surface)
    context.canvas = this
    context.setDevicePixelRatio?.(this._dpi)
    // Keep internal DPR scaling but expose "1x" transforms to upper libs (e.g. Chart.js).
    context.resetTransform?.()

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
    context.clearRect(0, 0, 10, 10)
    draw()

    this.dispose = () => {
      this._isActive = false
      setTimeout(() => {
        this.surface.dispose()
        this.rect.dispose()
        image.dispose()
        context.dispose()
        this.image = null
        this.context = null
      }, 1000)
    }

    return context
  }

  get width() {
    // Expose logical size (layout px), backing store is DPI-scaled internally.
    return this.layout?.width ?? this.size?.width
  }

  set width(_value) {
    // Chart.js 等库可能会尝试设置 canvas.width 来调整 backing store。
    // RN 端真实尺寸由布局与 DPR 决定，这里仅保证不会因为只读属性而抛错。
  }

  get height() {
    return this.layout?.height ?? this.size?.height
  }

  set height(_value) {
    // 同 width
  }

  toDataURL(type, encoderOptions) {
    if (!this.layout) {
      throw new Error('无效的布局信息 layout')
    }

    if (!this.context) {
      this.getContext('2d')
    }

    if (!this.surface || !this.rect) {
      throw new Error('无法创建 surface')
    }

    const snapshot = this.surface.makeImageSnapshot(this.rect)
    const dataURL = this._encodeImageToDataURL(snapshot, type, encoderOptions)
    snapshot.dispose?.()
    return dataURL
  }

  _createCanvas() {
    this.surface?.dispose()
    this.rect?.dispose()

    const dpi = PixelRatio.get()
    this._dpi = dpi

    const width = this.layout.width * dpi
    const height = this.layout.height * dpi
    this.size = {
      width,
      height
    }

    this.surface = Skia.Surface.Make(width, height)

    if (!this.surface) {
      throw new Error('无法创建 surface')
    }

    // Keep Skia canvas off the `.canvas` field to avoid collisions with Web canvas/ctx conventions.
    this.skiaCanvas = this.surface.getCanvas()

    this.rect = Skia.XYWHRect(0, 0, width, height)
  }

  skiaCanvas

  setLayout(layout) {
    this.layout = layout
    if (this.context) {
      // 重新创建canvas
      this._createCanvas()
      this.context.updateCanvas(this.skiaCanvas, this.surface)
      this.context.setDevicePixelRatio?.(this._dpi)
      this.context.resetTransform?.()
    }
  }

  layout

  useImage() {
    this.useForceUpdate(() => this.dispose?.())

    return this.image
  }
}

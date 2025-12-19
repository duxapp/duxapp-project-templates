import { Skia } from '@shopify/react-native-skia'
import { PixelRatio } from 'react-native'
import { Context } from '../Context'

/**
 * OffscreenCanvas 的 RN 端实现
 * - 只支持 2D 上下文
 * - 不启动内部 requestAnimationFrame 循环，由外部手动控制绘制
 */
export class OffscreenCanvas {
  constructor(width, height) {
    const w = Number(width)
    const h = Number(height)
    if (!Number.isFinite(w) || !Number.isFinite(h)) {
      throw new TypeError('OffscreenCanvas width/height must be finite numbers')
    }

    this._width = 0
    this._height = 0

    this._surface = null
    this._canvas = null
    this._rect = null
    this._context = null

    this._resize(w, h)
  }

  get width() {
    return this._width
  }

  set width(value) {
    this._resize(value, this._height)
  }

  get height() {
    return this._height
  }

  set height(value) {
    this._resize(this._width, value)
  }

  /**
   * 与标准 OffscreenCanvas 类似，只支持 '2d'
   */
  getContext(contextId /*, options */) {
    if (contextId !== '2d') {
      throw new Error('OffscreenCanvas 仅支持 2d 上下文')
    }
    if (this._context) {
      return this._context
    }
    if (!this._canvas) {
      throw new Error('OffscreenCanvas: 无效的尺寸')
    }
    this._context = new Context(this._canvas, this._surface)
    return this._context
  }

  /**
   * 内部尺寸变更
   * 会重建 surface，并在已有 context 时更新其 canvas
   */
  _resize(width, height) {
    const w = Math.max(0, Number(width) || 0)
    const h = Math.max(0, Number(height) || 0)

    this._width = w
    this._height = h

    this._recreateSurface()
  }

  _recreateSurface() {
    // 释放旧资源
    this._surface?.dispose?.()
    this._rect?.dispose?.()

    const dpi = PixelRatio.get()
    const widthPx = this._width * dpi
    const heightPx = this._height * dpi

    if (!widthPx || !heightPx) {
      this._surface = null
      this._canvas = null
      this._rect = null
      if (this._context) {
        this._context.updateCanvas(null, null)
      }
      return
    }

    this._surface = Skia.Surface.Make(widthPx, heightPx)
    this._canvas = this._surface.getCanvas()
    this._canvas.scale(dpi, dpi)
    this._rect = Skia.XYWHRect(0, 0, widthPx, heightPx)

    if (this._context) {
      this._context.updateCanvas(this._canvas, this._surface)
    }
  }

  /**
   * 提供给 drawImage 使用的快照（SkImage）
   * 符合 CanvasImage 约定：obj.image 是 SkImage
   */
  get image() {
    if (!this._surface || !this._rect) {
      return null
    }
    return this._surface.makeImageSnapshot(this._rect)
  }
}

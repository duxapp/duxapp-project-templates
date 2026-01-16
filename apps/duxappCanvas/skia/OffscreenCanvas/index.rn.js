import { Skia } from '@shopify/react-native-skia'
import { PixelRatio } from 'react-native'
import { Context } from '../Context'
import { CanvasBase } from '../Canvas/CanvasBase'

export class OffscreenCanvas extends CanvasBase {
  constructor(width, height) {
    super()
    const w = Number(width)
    const h = Number(height)
    if (!Number.isFinite(w) || !Number.isFinite(h)) {
      throw new TypeError('OffscreenCanvas width/height must be finite numbers')
    }

    this._width = 0
    this._height = 0

    this._surface = null
    // Internal Skia canvas (not exposed as `.canvas` to avoid collisions with web/Chart.js conventions)
    this._skiaCanvas = null
    this._rect = null
    this._context = null
    this._dpi = 1

    this._resizeQueued = false
    this._resizeQueueToken = 0
    this._lastResizeProp = null

    this._resize(w, h)
  }

  dispose() {
    this._surface?.dispose?.()
    this._rect?.dispose?.()
    this._surface = null
    this._skiaCanvas = null
    this._rect = null
    if (this._context) {
      this._context.updateCanvas(null, null)
      this._context = null
    }
    this._resizeQueued = false
    this._resizeQueueToken++
    this._lastResizeProp = null
  }

  get width() {
    return this._width
  }

  set width(value) {
    const w = Math.max(0, Number(value) || 0)
    if (w === this._width) {
      return
    }
    this._width = w
    if (this._resizeQueued && this._lastResizeProp === 'height') {
      this._flushResize()
      return
    }
    this._queueResize('width')
  }

  get height() {
    return this._height
  }

  set height(value) {
    const h = Math.max(0, Number(value) || 0)
    if (h === this._height) {
      return
    }
    this._height = h
    if (this._resizeQueued && this._lastResizeProp === 'width') {
      this._flushResize()
      return
    }
    this._queueResize('height')
  }

  /**
   * 与标准 OffscreenCanvas 类似，只支持 '2d'
   */
  getContext(contextId /*, options */) {
    if (contextId !== '2d') {
      throw new Error('OffscreenCanvas 仅支持 2d 上下文')
    }
    this._flushResizeIfNeeded()
    if (this._context) {
      return this._context
    }
    if (!this._skiaCanvas) {
      throw new Error('OffscreenCanvas: 无效的尺寸')
    }
    this._context = new Context(this._skiaCanvas, this._surface)
    this._context.canvas = this
    this._context.setDevicePixelRatio?.(this._dpi)
    // Expose 1x transforms to callers while keeping internal backing store scaled by DPR.
    this._context.resetTransform?.()
    return this._context
  }

  toDataURL(type, encoderOptions) {
    this._flushResizeIfNeeded()
    if (!this._surface || !this._rect) {
      throw new Error('OffscreenCanvas: 无效的尺寸')
    }
    const snapshot = this._surface.makeImageSnapshot(this._rect)
    const dataURL = this._encodeImageToDataURL(snapshot, type, encoderOptions)
    snapshot.dispose?.()
    return dataURL
  }

  /**
   * 内部尺寸变更
   * 会重建 surface，并在已有 context 时更新其 canvas
   */
  _resize(width, height) {
    const w = Math.max(0, Number(width) || 0)
    const h = Math.max(0, Number(height) || 0)

    if (w === this._width && h === this._height && this._surface && !this._resizeQueued) {
      return
    }

    this._width = w
    this._height = h

    this._resizeQueued = false
    this._resizeQueueToken++
    this._lastResizeProp = null
    this._recreateSurface()
  }

  _queueResize(prop) {
    this._lastResizeProp = prop

    if (this._resizeQueued) {
      return
    }
    this._resizeQueued = true

    const token = ++this._resizeQueueToken

    Promise.resolve().then(() => {
      if (this._resizeQueueToken !== token) {
        return
      }
      this._resizeQueued = false
      this._lastResizeProp = null
      this._recreateSurface()
    })
  }

  _flushResizeIfNeeded() {
    if (!this._resizeQueued) {
      return
    }
    this._flushResize()
  }

  _flushResize() {
    this._resizeQueued = false
    this._resizeQueueToken++
    this._lastResizeProp = null
    this._recreateSurface()
  }

  _recreateSurface() {
    // 释放旧资源
    this._surface?.dispose?.()
    this._rect?.dispose?.()

    const dpi = PixelRatio.get()
    this._dpi = dpi
    const widthPx = Math.max(0, Math.round(this._width * dpi))
    const heightPx = Math.max(0, Math.round(this._height * dpi))

    if (!widthPx || !heightPx) {
      this._surface = null
      this._skiaCanvas = null
      this._rect = null
      if (this._context) {
        this._context.updateCanvas(null, null)
      }
      return
    }

    this._surface = Skia.Surface.Make(widthPx, heightPx)
    this._skiaCanvas = this._surface.getCanvas()
    this._rect = Skia.XYWHRect(0, 0, widthPx, heightPx)

    if (this._context) {
      this._context.updateCanvas(this._skiaCanvas, this._surface)
      this._context.setDevicePixelRatio?.(this._dpi)
      this._context.resetTransform?.()
    }
  }

  /**
   * 提供给 drawImage 使用的快照（SkImage）
   * 符合 CanvasImage 约定：obj.image 是 SkImage
   */
  get image() {
    this._flushResizeIfNeeded()
    if (!this._surface || !this._rect) {
      return null
    }
    return this._surface.makeImageSnapshot(this._rect)
  }
}

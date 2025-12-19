import { getWindowInfo } from '@/duxapp'
import { createOffscreenCanvas } from '@tarojs/taro'

/**
 * 非 RN 端的 OffscreenCanvas 实现
 * - H5：使用 document.createElement('canvas')
 * - 小程序等：使用 Taro.createOffscreenCanvas({ type: '2d', width, height })
 */
export class OffscreenCanvas {
  constructor(width, height) {
    const dpi = getWindowInfo().pixelRatio
    const w = Math.max(0, Number(width) || 0) * dpi
    const h = Math.max(0, Number(height) || 0) * dpi

    let canvas

    if (process.env.TARO_ENV === 'h5') {
      if (typeof document === 'undefined') {
        throw new Error('OffscreenCanvas H5 环境缺少 document')
      }
      canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      this._canvas = canvas
    } else {
      // 其他端按照 Taro 的 createOffscreenCanvas API
      canvas = createOffscreenCanvas({
        type: '2d',
        width: w,
        height: h
      })
    }
    const ctx = canvas.getContext('2d')
    ctx.scale(dpi, dpi)
    return canvas
  }
}

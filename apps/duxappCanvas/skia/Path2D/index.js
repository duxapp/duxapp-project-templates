import { createOffscreenCanvas } from '@tarojs/taro'

export class Path2D {
  constructor(path) {
    if (!Path2D.canvas) {
      Path2D.canvas = createOffscreenCanvas({ width: 1, height: 1 })
    }
    const safePath = path ?? ''
    try {
      return Path2D.canvas.createPath2D(safePath)
    } catch (err) {
      // 部分版本的微信，传入空参数会导致报错
      console.error('[Path2D] createPath2D failed, fallback to empty path', err)
      return Path2D.canvas.createPath2D('')
    }
  }
}

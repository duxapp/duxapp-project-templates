import { createOffscreenCanvas } from '@tarojs/taro'

export class Path2D {
  constructor(path) {
    if (!Path2D.canvas) {
      Path2D.canvas = createOffscreenCanvas({ width: 1, height: 1 })
    }
    return Path2D.canvas.createPath2D(path)
  }
}

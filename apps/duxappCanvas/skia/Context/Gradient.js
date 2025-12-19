import { Skia, TileMode } from '@shopify/react-native-skia'

// 简单的 CanvasGradient 实现，仅在 RN 端使用
export class CanvasGradient {
  constructor(type, params) {
    this.type = type // 'linear' | 'radial'
    this.params = params
    this.colorStops = []
  }

  addColorStop(offset, color) {
    const position = Number(offset)
    if (!Number.isFinite(position) || position < 0 || position > 1) {
      console.warn('CanvasGradient.addColorStop: offset 必须在 [0,1] 范围内')
      return
    }
    this.colorStops.push({
      offset: position,
      color
    })
  }

  /**
   * 应用到 paint 上
   * @param {*} paint SkPaint
   */
  applyToPaint(paint) {
    if (!this.colorStops.length) {
      paint.setShader(null)
      return
    }

    const colors = this.colorStops.map(stop => Skia.Color(stop.color))
    const positions = this.colorStops.map(stop => stop.offset)

    let shader = null

    if (this.type === 'linear') {
      const { x0, y0, x1, y1 } = this.params
      const start = { x: x0, y: y0 }
      const end = { x: x1, y: y1 }
      shader = Skia.Shader.MakeLinearGradient(
        start,
        end,
        colors,
        positions,
        TileMode.Clamp,
        undefined,
        0
      )
    } else if (this.type === 'radial') {
      const { x0, y0, r0, x1, y1, r1 } = this.params

      // 当前使用场景为 x0 === x1, y0 === y1, r0 === 0
      // 直接用终点圆作为径向渐变中心
      const center = { x: x1, y: y1 }
      const radius = r1

      shader = Skia.Shader.MakeRadialGradient(
        center,
        radius,
        colors,
        positions,
        TileMode.Clamp,
        undefined,
        0
      )
    }

    paint.setShader(shader)
  }
}


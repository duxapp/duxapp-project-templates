import { Skia, TileMode } from '@shopify/react-native-skia'

const DEFAULT_SHADER_CACHE_TTL_MS = 5 * 60 * 1000

/**
 * @typedef {{ shader: any, lastUsedAt: number }} ShaderCacheEntry
 */

/** @type {Map<string, ShaderCacheEntry>} */
const shaderCache = new Map()
let shaderCacheSweeperTimer = null

function startShaderCacheSweeperOnce() {
  if (shaderCacheSweeperTimer) return

  const ttlMs = DEFAULT_SHADER_CACHE_TTL_MS

  shaderCacheSweeperTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of shaderCache.entries()) {
      if (!entry || typeof entry.lastUsedAt !== 'number') {
        shaderCache.delete(key)
        continue
      }
      if (now - entry.lastUsedAt <= ttlMs) continue

      shaderCache.delete(key)
      try {
        entry.shader?.dispose?.()
      } catch (_) {
        // ignore
      }
    }
  }, 60000)
}

// 简单的 CanvasGradient 实现，仅在 RN 端使用
export class CanvasGradient {

  constructor(type, params) {
    startShaderCacheSweeperOnce()
    this.type = type // 'linear' | 'radial'
    this.params = params
    this.colorStops = []
    this._cacheKey = null
  }

  addColorStop(offset, color) {
    const position = Number(offset)
    if (!Number.isFinite(position) || position < 0 || position > 1) {
      console.warn('CanvasGradient.addColorStop: offset 必须在 [0,1] 范围内')
      return
    }
    let colorValue
    try {
      colorValue = Skia.Color(color)
    } catch (e) {
      console.warn('CanvasGradient.addColorStop: 无效的颜色值', color)
      return
    }

    // 保持按 offset 升序（同 offset 保持插入顺序），保证渐变结果稳定
    const stop = {
      offset: position,
      color,
      colorValue
    }
    let insertAt = this.colorStops.length
    for (let i = 0; i < this.colorStops.length; i++) {
      if (position < this.colorStops[i].offset) {
        insertAt = i
        break
      }
    }
    this.colorStops.splice(insertAt, 0, stop)

    // stops 变化后需要重建 shader
    this._cacheKey = null
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

    const positions = this.colorStops.map(stop => stop.offset)
    const colors = this.colorStops.map(stop => stop.colorValue)

    const params = this.params || {}
    const key = this.type === 'linear'
      ? `linear|${Number(params.x0) || 0},${Number(params.y0) || 0},${Number(params.x1) || 0},${Number(params.y1) || 0}|${positions.join(',')}|${colors.join(',')}`
      : `radial|${Number(params.x0) || 0},${Number(params.y0) || 0},${Number(params.r0) || 0},${Number(params.x1) || 0},${Number(params.y1) || 0},${Number(params.r1) || 0}|${positions.join(',')}|${colors.join(',')}`

    this._cacheKey = key
    const cached = shaderCache.get(key)
    if (cached?.shader) {
      cached.lastUsedAt = Date.now()
      paint.setShader(cached.shader)
      return
    }

    let shader = null

    if (this.type === 'linear') {
      const { x0, y0, x1, y1 } = params
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
      const { x1, y1, r1 } = params

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

    if (shader) {
      shaderCache.set(key, { shader, lastUsedAt: Date.now() })
    }

    paint.setShader(shader)
  }
}

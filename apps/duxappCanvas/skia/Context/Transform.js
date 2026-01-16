import { Skia } from '@shopify/react-native-skia'
import { ContextAttr } from './Attr'

export class ContextTransform extends ContextAttr {
  // Internal backing-store scale (DPR). External-facing transforms do not include this value.
  _baseDpr = 1

  setDevicePixelRatio(dpr) {
    const v = Number(dpr) || 1
    this._baseDpr = v > 0 ? v : 1
  }

  save() {
    this.skiaCanvas.save()
    this.transformStack.push({
      attr: { ...this.attr },
      origin: { ...this.attrOrigin }
    })
  }

  restore() {
    if (this.transformStack.length > 0) {
      this.skiaCanvas.restore()
      const { attr, origin } = this.transformStack.pop()
      this.attrOrigin = origin
      this.setAttrs(attr)
    } else {
      if (!this._recorder) {
        console.warn('Attempted to restore with empty transform stack')
      }
    }
  }

  translate(x, y) {
    this.skiaCanvas.translate(x, y)
  }

  scale(x, y = x) {
    this.skiaCanvas.scale(x, y)
  }

  rotate(angleRad) {
    const angleDeg = angleRad * (180 / Math.PI)
    this.skiaCanvas.rotate(angleDeg, 0, 0)
  }

  transform(a, b, c, d, e, f) {
    this.skiaCanvas.concat(Skia.Matrix([a, c, e, b, d, f, 0, 0, 1]))
  }

  _setTransformInternal(a, b, c, d, e, f) {
    if (arguments.length !== 6) {
      throw new TypeError('setTransform 需要 6 个参数 (a,b,c,d,e,f)')
    }

    const current = this._getTotalMatrixValues()
    // getTotalMatrix 期望返回 3x3（9 个值）；不满足时无法可靠计算 delta，退化为 transform
    if (!Array.isArray(current) || current.length < 9) {
      this.transform(a, b, c, d, e, f)
      return
    }

    const target = [a, b, c, d, e, f]
    const currentAffine = [current[0], current[3], current[1], current[4], current[2], current[5]]
    const invCurrent = this._invertAffine(currentAffine)
    if (!invCurrent) {
      // 矩阵不可逆时，退化为 concat（不重置），避免直接破坏状态
      this.transform(a, b, c, d, e, f)
      return
    }

    // Skia concat 使用后乘（current * delta），因此需要 delta = inv(current) * target
    const delta = this._mulAffine(invCurrent, target)
    // _mulAffine 返回 Canvas 2D 的 [a,b,c,d,e,f,0,0,1]，Skia.Matrix 需要 [a,c,e,b,d,f,0,0,1]
    this.skiaCanvas.concat(Skia.Matrix([
      delta[0], delta[2], delta[4],
      delta[1], delta[3], delta[5],
      0, 0, 1
    ]))
  }

  // External-facing setTransform: keep internal DPR scale.
  setTransform(a, b, c, d, e, f) {
    const r = this._baseDpr || 1
    this._setTransformInternal(a * r, b * r, c * r, d * r, e * r, f * r)
  }

  resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0)
  }

  _getInternalTransform() {
    const values = this._getTotalMatrixValues()
    if (Array.isArray(values) && values.length >= 6) {
      const [a, c, e, b, d, f] = values
      return { a, b, c, d, e, f }
    }
    return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
  }

  getTransform() {
    const m = this._getInternalTransform()
    const r = this._baseDpr || 1
    if (!r || r === 1) return m
    return {
      a: m.a / r,
      b: m.b / r,
      c: m.c / r,
      d: m.d / r,
      e: m.e / r,
      f: m.f / r
    }
  }

  _getTotalMatrixValues() {
    const m = this.skiaCanvas?.getTotalMatrix?.()
    if (!m) {
      return null
    }
    const values = m.get?.()
    m.dispose?.()
    return values
  }

  _mulAffine(m1, m2) {
    const [a1, b1, c1, d1, e1, f1] = m1
    const [a2, b2, c2, d2, e2, f2] = m2
    return [
      a1 * a2 + c1 * b2,
      b1 * a2 + d1 * b2,
      a1 * c2 + c1 * d2,
      b1 * c2 + d1 * d2,
      a1 * e2 + c1 * f2 + e1,
      b1 * e2 + d1 * f2 + f1,
      0, 0, 1
    ]
  }

  _invertAffine(m) {
    const [a, b, c, d, e, f] = m
    const det = a * d - b * c
    if (!Number.isFinite(det) || det === 0) {
      return null
    }
    const invDet = 1 / det
    return [
      d * invDet,
      -b * invDet,
      -c * invDet,
      a * invDet,
      (c * f - d * e) * invDet,
      (b * e - a * f) * invDet
    ]
  }
}

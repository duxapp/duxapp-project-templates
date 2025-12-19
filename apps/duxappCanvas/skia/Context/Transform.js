import { Skia } from '@shopify/react-native-skia'
import { ContextAttr } from './Attr'

export class ContextTransform extends ContextAttr {
  constructor(canvas) {
    super(canvas)
    this.transformStack = []
  }

  save() {
    this.canvas.save()
    this.transformStack.push({
      attr: { ...this.attr },
      origin: { ...this.attrOrigin }
    })
  }

  restore() {
    if (this.transformStack.length > 0) {
      this.canvas.restore()
      const { attr, origin } = this.transformStack.pop()
      this.attrOrigin = origin
      this.setAttrs(attr)
    } else {
      console.warn('Attempted to restore with empty transform stack')
    }
  }

  translate(x, y) {
    this.canvas.translate(x, y)
  }

  scale(x, y = x) {
    this.canvas.scale(x, y)
  }

  rotate(angleRad) {
    const angleDeg = angleRad * (180 / Math.PI)
    this.canvas.rotate(angleDeg, 0, 0)
  }

  transform(a, b, c, d, e, f) {
    this.canvas.concat(Skia.Matrix([a, c, e, b, d, f, 0, 0, 1]))
  }

  setTransform(a, b, c, d, e, f) {
    // Skia RN canvas has no direct reset; keep behavior consistent and warn only
    console.warn('CanvasContext.setTransform has no effect on RN')
  }

  resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0)
  }

  getTransform() {
    const matrix = this.canvas.getTotalMatrix()
    const values = matrix && matrix.get ? matrix.get() : null
    if (matrix && matrix.dispose) {
      matrix.dispose()
    }
    if (Array.isArray(values) && values.length >= 6) {
      // Skia.Matrix order [a, c, e, b, d, f, 0, 0, 1]
      const [a, c, e, b, d, f] = values
      return { a, b, c, d, e, f }
    }
    return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
  }
}

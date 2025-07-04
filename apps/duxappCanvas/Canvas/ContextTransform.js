import { Skia } from '@shopify/react-native-skia'
import { ContextAttr } from './ContextAttr'

export class ContextTransform extends ContextAttr {
  constructor(canvas) {
    super(canvas)
    this.transformStack = []
  }

  save() {
    this.canvas.save()
    this.transformStack.push({
      attr: { ...this.attr },
      attrOther: { ...this.attrOther }
    })
  }

  restore() {
    if (this.transformStack.length > 0) {
      this.canvas.restore()
      const { attr, attrOther } = this.transformStack.pop()
      this.setAttrs(attr)
      this.attrOther = attrOther
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
    this.canvas.restoreToCount(this.transformStack[this.transformStack.length - 1] || 0)
    this.transform(a, b, c, d, e, f)
  }

  resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0)
  }
}

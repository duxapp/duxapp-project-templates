import { Skia, FillType, BlendMode, TextAlign } from '@shopify/react-native-skia'
import { ContextTransform } from './ContextTransform'

export class Context extends ContextTransform {
  constructor(canvas) {
    super(canvas)
    this.path = Skia.Path.Make()
    // 渲染状态 默认需要渲染
    this.drawStatus = true
  }

  // --- Path ---
  beginPath() {
    this.path.reset()
    this.moveToStatus = false
  }

  closePath() {
    this.path.close()
  }

  moveTo(x, y) {
    this.path.moveTo(x, y)
    this.moveToStatus = true
  }

  lineTo(x, y) {
    if (!this.moveToStatus) {
      this.moveTo(x, y)
    } else {
      this.path.lineTo(x, y)
    }
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    const sweepAngle = (endAngle - startAngle) * (180 / Math.PI)
    const startDeg = startAngle * (180 / Math.PI)
    const rect = Skia.XYWHRect(x - radius, y - radius, radius * 2, radius * 2)
    this.path.addArc(
      rect,
      startDeg,
      anticlockwise ? -sweepAngle : sweepAngle
    )
    rect.dispose()
  }

  arcTo(x1, y1, x2, y2, radius) {
    this.path.arcToTangent(x1, y1, x2, y2, radius)
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.path.cubicTo(cp1x, cp1y, cp2x, cp2y, x, y)
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this.path.quadTo(cpx, cpy, x, y)
  }

  rect(x, y, width, height) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this.path.addRect(rect)
    rect.dispose()
  }

  roundRect(x, y, width, height, radii) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this.path.addRRect(Skia.RRectXY(rect, radii, radii))
    rect.dispose()
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    this.save()
    this.translate(x, y)
    this.rotate(rotation)
    this.scale(radiusX / radiusY, 1)
    this.arc(0, 0, radiusY, startAngle, endAngle, anticlockwise)
    this.restore()
  }

  // --- 绘制方法 ---
  stroke() {
    this.canvas.drawPath(this.path, this.paintStroke)
    this.draw()
  }

  fill(fillRule = 'nonzero') {
    this.path.setFillType(
      fillRule === 'evenodd'
        ? FillType.EvenOdd
        : FillType.Winding
    )
    this.canvas.drawPath(this.path, this.paintFill)
    this.draw()
  }

  clip(fillRule = 'nonzero') {
    this.path.setFillType(
      fillRule === 'evenodd'
        ? FillType.EvenOdd
        : FillType.Winding
    )
    this.canvas.clipPath(this.path, true)
  }

  isPointInPath(x, y, fillRule = 'nonzero') {
    return this.path.contains(x, y)
  }

  // --- Rect ---
  fillRect(x, y, width, height) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this.canvas.drawRect(rect, this.paintFill)
    rect.dispose()
    this.draw()
  }

  strokeRect(x, y, width, height) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this.canvas.drawRect(rect, this.paintStroke)
    rect.dispose()
    this.draw()
  }

  clearRect(x, y, width, height) {
    const clearPaint = Skia.Paint()
    clearPaint.setBlendMode(BlendMode.Clear)
    const rect = Skia.XYWHRect(x, y, width, height)
    this.canvas.drawRect(rect, clearPaint)
    rect.dispose()
    clearPaint.dispose()
    this.draw()
  }

  // --- Text ---
  _drawText(text, x, y, maxWidth, isStroke = false) {
    // 1. 测量文本
    const bounds = this.attr.font.measureText(text)

    // 2. 处理 maxWidth 缩放
    if (maxWidth) {
      const scale = maxWidth / bounds.width
      this.scale(scale, 1)
    }

    // 3. 应用 textAlign 水平偏移
    let adjustedX = x
    if (this.attr.textAlign === TextAlign.Center) {
      adjustedX -= bounds.width / 2
    } else if (this.attr.textAlign === TextAlign.End || this.attr.textAlign === TextAlign.Right) {
      adjustedX -= bounds.width
    }

    // 4. 应用 textBaseline 垂直偏移
    let adjustedY = y
    if (this.attr.textBaseline === 'middle') {
      adjustedY += bounds.height / 2
    } else if (this.attr.textBaseline === 'top' || this.attr.textBaseline === 'hanging') {
      adjustedY += bounds.height
    }

    // 6. 绘制文本
    this.canvas.drawText(text, adjustedX, adjustedY, isStroke ? this.paintStroke : this.paintFill, this.attr.font)
    this.draw()
  }

  fillText(text, x, y, maxWidth) {
    this._drawText(text, x, y, maxWidth, false)
  }

  strokeText(text, x, y, maxWidth) {
    this._drawText(text, x, y, maxWidth, true)
  }

  measureText(text) {
    const bounds = this.attr.font.measureText(text)
    return {
      width: bounds.width,
      actualBoundingBoxLeft: -bounds.x,
      actualBoundingBoxRight: bounds.width + bounds.x,
      fontBoundingBoxAscent: -bounds.y,
      fontBoundingBoxDescent: bounds.height + bounds.y
    }
  }

  // --- Image ---
  drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    if (!image?.image) return this
    image = image.image

    const srcRect = arguments.length === 9
      ? Skia.XYWHRect(sx, sy, sWidth, sHeight)
      : Skia.XYWHRect(0, 0, image.width(), image.height())

    const dstRect = arguments.length === 9
      ? Skia.XYWHRect(dx, dy, dWidth, dHeight)
      : Skia.XYWHRect(sx, sy, sWidth ?? image.width(), sHeight ?? image.height())

    this.canvas.drawImageRect(image, srcRect, dstRect, this.paintFill)

    srcRect.dispose()

    this.draw()
  }

  // --- 自定义方法，用于自动将更新绘制到画布上 ---
  draw() {
    this.drawStatus = true
  }

  // 重新创建canvas实例之后更新
  updateCanvas(canvas) {
    this.canvas = canvas
  }

  // 销毁
  dispose() {
    this.paintStroke.dispose()
    this.paintFill.dispose()
    this.path.dispose()
    // 清除字体
    for (const key in this.cache.font) {
      this.cache.font[key].dispose()
    }
    // 清理lineDash
    this.cache.lineDash?.dispose()
  }
}

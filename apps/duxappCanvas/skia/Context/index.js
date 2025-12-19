import {
  Skia,
  FillType,
  BlendMode,
  TextAlign,
  ColorType,
  AlphaType,
  ClipOp
} from '@shopify/react-native-skia'
import { ContextTransform } from './Transform'
import { CanvasGradient } from './Gradient'
import { CanvasPattern } from './Pattern'

export class Context extends ContextTransform {
  constructor(canvas, surface) {
    super(canvas)
    this.surface = surface
    this.path = Skia.Path.Make()
    // 渲染状态 默认需要渲染
    this.drawStatus = false
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
    const unitPath = Skia.Path.Make()
    const rect = Skia.XYWHRect(-1, -1, 2, 2) // 单位圆
    const sweepDeg = (endAngle - startAngle) * (180 / Math.PI)
    const startDeg = startAngle * (180 / Math.PI)

    unitPath.addArc(
      rect,
      startDeg,
      anticlockwise ? -sweepDeg : sweepDeg
    )

    rect.dispose()

    const cos = Math.cos(rotation)
    const sin = Math.sin(rotation)
    // T(x,y) * R(rotation) * S(rx, ry)
    const matrix = Skia.Matrix([
      cos * radiusX, -sin * radiusY, x,
      sin * radiusX, cos * radiusY, y,
      0, 0, 1
    ])

    this.path.addPath(unitPath, matrix)
    unitPath.dispose()
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
    this.canvas.clipPath(this.path, ClipOp.Intersect, true)
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
    text = String(text)
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
    const bounds = this.attr.font.measureText(String(text))
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
    if (!image?.image) return
    image = image.image

    const srcRect = arguments.length === 9
      ? Skia.XYWHRect(sx, sy, sWidth, sHeight)
      : Skia.XYWHRect(0, 0, image.width(), image.height())

    const dstRect = arguments.length === 9
      ? Skia.XYWHRect(dx, dy, dWidth, dHeight)
      : Skia.XYWHRect(sx, sy, sWidth ?? image.width(), sHeight ?? image.height())

    this.canvas.drawImageRect(image, srcRect, dstRect, this.paintImage)

    srcRect.dispose()
    dstRect.dispose()

    this.draw()
  }

  // --- 渐变 ---
  createLinearGradient(x0, y0, x1, y1) {
    return new CanvasGradient('linear', { x0, y0, x1, y1 })
  }

  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    return new CanvasGradient('radial', { x0, y0, r0, x1, y1, r1 })
  }

  createPattern(image, repetition) {
    return new CanvasPattern(image, repetition)
  }

  // --- 像素操作 ---
  getImageData(x, y, width, height) {
    const w = Math.max(0, Math.floor(width))
    const h = Math.max(0, Math.floor(height))
    const sx = Math.floor(x)
    const sy = Math.floor(y)

    if (!w || !h) {
      return {
        width: w,
        height: h,
        data: new Uint8ClampedArray(w * h * 4)
      }
    }

    const imageInfo = {
      width: w,
      height: h,
      colorType: ColorType.RGBA_8888,
      alphaType: AlphaType.Premul
    }

    let pixels = this.canvas.readPixels(sx, sy, imageInfo)

    if (!pixels) {
      return {
        width: w,
        height: h,
        data: new Uint8ClampedArray(w * h * 4)
      }
    }

    if (pixels instanceof Float32Array) {
      const out = new Uint8ClampedArray(pixels.length)
      for (let i = 0; i < pixels.length; i++) {
        out[i] = Math.max(0, Math.min(255, Math.round(pixels[i] * 255)))
      }
      pixels = out
    } else if (!(pixels instanceof Uint8ClampedArray)) {
      pixels = new Uint8ClampedArray(pixels)
    }

    return {
      width: w,
      height: h,
      data: pixels
    }
  }

  putImageData(imageData, x, y) {
    if (!imageData || !imageData.data) {
      return
    }
    const w = Math.max(0, Math.floor(imageData.width))
    const h = Math.max(0, Math.floor(imageData.height))
    const dx = Math.floor(x)
    const dy = Math.floor(y)

    if (!w || !h) {
      return
    }

    const bytes = imageData.data instanceof Uint8ClampedArray
      ? new Uint8Array(imageData.data)
      : imageData.data

    const info = {
      width: w,
      height: h,
      colorType: ColorType.RGBA_8888,
      alphaType: AlphaType.Premul
    }

    const data = Skia.Data.fromBytes(bytes)
    const image = Skia.Image.MakeImage(info, data, w * 4)

    if (!image) {
      data.dispose?.()
      return
    }

    // putImageData should work in pixel space and ignore current transform
    const { a, b, c, d, e, f } = this.getTransform()
    const det = a * d - b * c
    this.canvas.save()
    if (det) {
      // Apply inverse transform so pixels are not re-scaled/re-positioned
      const inv = Skia.Matrix([
        d / det, -c / det, (c * f - d * e) / det,
        -b / det, a / det, (b * e - a * f) / det,
        0, 0, 1
      ])
      this.canvas.concat(inv)
      inv.dispose?.()
    }
    const srcRect = Skia.XYWHRect(0, 0, w, h)
    const dstRect = Skia.XYWHRect(dx, dy, w, h)
    this.canvas.drawImageRect(image, srcRect, dstRect, this.paintImage)
    srcRect.dispose()
    dstRect.dispose()
    this.canvas.restore()

    image.dispose()
    data.dispose?.()

    this.draw()
  }

  /**
   * RN-Skia 专用：直接在 GPU 侧复制一块区域到目标位置，避免 get/putImageData 的 JS 往返
   * 坐标使用像素空间，需要传入经过 currentTransform 转换后的值
   * @returns {boolean} 是否复制成功
   */
  nativeBlitRegion(sx, sy, sw, sh, dx, dy, dw = sw, dh = sh) {
    if (!this.surface || !sw || !sh) {
      return false
    }

    const srcRect = Skia.XYWHRect(sx, sy, sw, sh)
    const image = this.surface.makeImageSnapshot(srcRect)
    srcRect.dispose()

    if (!image) {
      return false
    }

    const dstRect = Skia.XYWHRect(dx, dy, dw, dh)

    // 忽略当前 transform，保证像素级复制
    const { a, b, c, d, e, f } = this.getTransform()
    const det = a * d - b * c
    this.canvas.save()
    if (det) {
      const inv = Skia.Matrix([
        d / det, -c / det, (c * f - d * e) / det,
        -b / det, a / det, (b * e - a * f) / det,
        0, 0, 1
      ])
      this.canvas.concat(inv)
      inv.dispose?.()
    }

    const imageRect = Skia.XYWHRect(0, 0, image.width(), image.height())
    this.canvas.drawImageRect(image, imageRect, dstRect, this.paintImage)
    imageRect.dispose()
    dstRect.dispose()
    this.canvas.restore()

    image.dispose()
    this.draw()
    return true
  }

  // --- 自定义方法，用于自动将更新绘制到画布上 ---
  draw() {
    if (this._lock) {
      return
    }
    if (!this.drawStatus) {
      this.drawStatus = true
      if (this._drawCallback) {
        requestAnimationFrame(() => {
          this.drawStatus = false
          this._drawCallback()
        })
      }
    }
  }

  _drawCallback
  onDraw(callback) {
    this._drawCallback = callback
  }

  // 重新创建canvas实例之后更新
  updateCanvas(canvas, surface) {
    this.canvas = canvas
    this.surface = surface ?? this.surface
  }

  // 销毁
  dispose() {
    this._lock = true
    this.paintStroke.dispose()
    this.paintFill.dispose()
    this.paintImage.dispose()
    this.path.dispose()
    // 清除字体
    for (const key in this.cache.font) {
      this.cache.font[key].dispose()
    }
    // 清理lineDash
    this.cache.lineDash?.dispose()
  }
}

import {
  Skia,
  FillType,
  TextAlign,
  ColorType,
  AlphaType,
  ClipOp
} from '@shopify/react-native-skia'
import { ContextTransform } from './Transform'
import { CanvasGradient } from './Gradient'
import { CanvasPattern } from './Pattern'
import { Path2D } from '../Path2D'

export class Context extends ContextTransform {
  constructor(skiaCanvas, surface) {
    super(skiaCanvas)
    this.surface = surface
    this.path = new Path2D()
    this.drawStatus = false
  }

  // --- Path ---
  beginPath() {
    this.path.reset()
  }

  closePath() {
    this.path.closePath()
  }

  moveTo(x, y) {
    this.path.moveTo(x, y)
  }

  lineTo(x, y) {
    this.path.lineTo(x, y)
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    this.path.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  }

  arcTo(x1, y1, x2, y2, radius) {
    this.path.arcTo(x1, y1, x2, y2, radius)
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this.path.quadraticCurveTo(cpx, cpy, x, y)
  }

  rect(x, y, width, height) {
    this.path.rect(x, y, width, height)
  }

  roundRect(x, y, width, height, radii) {
    this.path.roundRect(x, y, width, height, radii)
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    this.path.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
  }

  // --- 绘制方法 ---
  stroke(path) {
    const skPath = this._resolveSkiaPath(path)
    if (!skPath) {
      return
    }
    this.skiaCanvas.drawPath(skPath, this.paintStroke)
    this.draw()
  }

  fill(pathOrRule = 'nonzero', fillRule) {
    const { skPath, rule } = this._resolvePathAndRule(pathOrRule, fillRule)
    if (!skPath) {
      return
    }
    this._applyFillRule(skPath, rule)
    this.skiaCanvas.drawPath(skPath, this.paintFill)
    this.draw()
  }

  clip(pathOrRule = 'nonzero', fillRule) {
    const { skPath, rule } = this._resolvePathAndRule(pathOrRule, fillRule)
    if (!skPath) {
      return
    }
    this._applyFillRule(skPath, rule)
    this.skiaCanvas.clipPath(skPath, ClipOp.Intersect, true)
  }

  isPointInPath(pathOrX, yOrRule, fillRule) {
    let targetPath = this.path
    let x = pathOrX
    let y = yOrRule
    let rule = fillRule

    if (pathOrX instanceof Path2D || typeof pathOrX?.getPath === 'function') {
      targetPath = pathOrX
      x = yOrRule
      y = fillRule
      rule = arguments.length > 3 ? arguments[3] : 'nonzero'
    }

    const skPath = this._getSkiaPath(targetPath)
    if (!skPath) {
      return false
    }
    this._applyFillRule(skPath, rule)
    return skPath.contains(x, y)
  }

  // --- Rect ---
  fillRect(x, y, width, height) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this.skiaCanvas.drawRect(rect, this.paintFill)
    rect.dispose()
    this.draw()
  }

  strokeRect(x, y, width, height) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this.skiaCanvas.drawRect(rect, this.paintStroke)
    rect.dispose()
    this.draw()
  }

  clearRect(x, y, width, height) {
    // 读取录制器，不要删除
    this.skiaCanvas
    if (!this._recorder) {
      const rect = Skia.XYWHRect(x, y, width, height)
      this.skiaCanvas.drawRect(rect, this.paintClear)
      rect.dispose()
      this.draw()
    }
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
    const paint = isStroke ? this.paintStroke : this.paintFill
    this.skiaCanvas.drawText(text, adjustedX, adjustedY, paint, this.attr.font)
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

    this.skiaCanvas.drawImageRect(image, srcRect, dstRect, this.paintImage)

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

    let pixels = this.skiaCanvas.readPixels(sx, sy, imageInfo)

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
    const { a, b, c, d, e, f } = typeof this._getInternalTransform === 'function'
      ? this._getInternalTransform()
      : this.getTransform()
    const det = a * d - b * c
    this.skiaCanvas.save()
    if (det) {
      // Apply inverse transform so pixels are not re-scaled/re-positioned
      const inv = Skia.Matrix([
        d / det, -c / det, (c * f - d * e) / det,
        -b / det, a / det, (b * e - a * f) / det,
        0, 0, 1
      ])
      this.skiaCanvas.concat(inv)
      inv.dispose?.()
    }
    const srcRect = Skia.XYWHRect(0, 0, w, h)
    const dstRect = Skia.XYWHRect(dx, dy, w, h)
    this.skiaCanvas.drawImageRect(image, srcRect, dstRect, this.paintImage)
    srcRect.dispose()
    dstRect.dispose()
    this.skiaCanvas.restore()

    image.dispose()
    data.dispose?.()

    this.draw()
  }

  /**
   * RN-Skia 专用：直接在 GPU 侧复制一块区域到目标位置，避免 get/putImageData 的 JS 往返
   * 坐标使用逻辑空间（不包含 DPR），内部会自动乘以 DPR 并忽略当前 transform，保证像素级复制
   * @returns {boolean} 是否复制成功
   */
  nativeBlitRegion(sx, sy, sw, sh, dx, dy, dw = sw, dh = sh) {
    if (!this.surface || !sw || !sh) {
      return false
    }

    const r = this._baseDpr || 1
    const px = (v) => Math.round(v * r)
    const psx = px(sx)
    const psy = px(sy)
    const psw = px(sw)
    const psh = px(sh)
    const pdx = px(dx)
    const pdy = px(dy)
    const pdw = px(dw)
    const pdh = px(dh)

    const srcRect = Skia.XYWHRect(psx, psy, psw, psh)
    const image = this.surface.makeImageSnapshot(srcRect)
    srcRect.dispose()

    if (!image) {
      return false
    }

    const dstRect = Skia.XYWHRect(pdx, pdy, pdw, pdh)

    // 忽略当前 transform，保证像素级复制
    const { a, b, c, d, e, f } = typeof this._getInternalTransform === 'function'
      ? this._getInternalTransform()
      : this.getTransform()
    const det = a * d - b * c
    this.skiaCanvas.save()
    if (det) {
      const inv = Skia.Matrix([
        d / det, -c / det, (c * f - d * e) / det,
        -b / det, a / det, (b * e - a * f) / det,
        0, 0, 1
      ])
      this.skiaCanvas.concat(inv)
      inv.dispose?.()
    }

    const imageRect = Skia.XYWHRect(0, 0, image.width(), image.height())
    this.skiaCanvas.drawImageRect(image, imageRect, dstRect, this.paintImage)
    imageRect.dispose()
    dstRect.dispose()
    this.skiaCanvas.restore()

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
          // createPicture 会结束录制，canvas 不能跨回调复用；在每帧回调前提交 picture
          this._commitRecordingToPicture?.()
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
    this.skiaCanvas = canvas
    this.surface = surface ?? this.surface
  }

  // 销毁
  dispose() {
    this._lock = true
    this.paintStroke.dispose()
    this.paintFill.dispose()
    this.paintImage.dispose()
    this.path.dispose?.()
    // 清除字体
    for (const key in this.cache.font) {
      this.cache.font[key].dispose()
    }
    // 清理lineDash
    this.cache.lineDash?.dispose()
    this.cache.shadowFilter?.dispose?.()

    if (this.picture) {
      this.picture.dispose()
    }
  }

  _getSkiaPath(path) {
    if (!path) {
      return null
    }
    if (path instanceof Path2D || typeof path.getPath === 'function') {
      return path.getPath()
    }
    return path
  }

  _resolveSkiaPath(path) {
    return this._getSkiaPath(path || this.path)
  }

  _resolvePathAndRule(pathOrRule, fillRule) {
    if (pathOrRule instanceof Path2D || typeof pathOrRule?.getPath === 'function') {
      return {
        skPath: this._getSkiaPath(pathOrRule),
        rule: fillRule ?? 'nonzero'
      }
    }
    return {
      skPath: this._getSkiaPath(this.path),
      rule: pathOrRule ?? 'nonzero'
    }
  }

  _applyFillRule(path, fillRule) {
    path.setFillType(
      fillRule === 'evenodd'
        ? FillType.EvenOdd
        : FillType.Winding
    )
  }
}

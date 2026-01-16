import { ComponentType, CSSProperties } from 'react'

type GlobalCompositeOperation =
  | 'source-over'    // 默认：新图形覆盖在现有内容上
  | 'source-in'      // 只显示新图形与现有内容重叠的部分
  | 'source-out'     // 只显示新图形不与现有内容重叠的部分
  | 'source-atop'    // 新图形仅在现有内容上方显示
  | 'destination-over' // 现有内容覆盖在新图形上
  | 'destination-in'   // 只显示现有内容与新图形重叠的部分
  | 'destination-out'  // 只显示现有内容不与新图形重叠的部分
  | 'destination-atop' // 现有内容仅在新图形上方显示
  | 'lighter'        // 重叠区域颜色值相加（变亮）
  | 'copy'           // 只显示新图形，完全忽略现有内容
  | 'xor'            // 重叠区域透明
  // --- 以下为扩展混合模式（部分浏览器支持）---
  | 'multiply'       // 正片叠底（颜色相乘）
  | 'screen'         // 滤色（颜色反转后相乘再反转）
  | 'overlay'        // 叠加（结合 multiply 和 screen）
  | 'darken'         // 取暗色
  | 'lighten'        // 取亮色
  | 'color-dodge'    // 颜色减淡
  | 'color-burn'     // 颜色加深
  | 'hard-light'     // 强光（根据新图形颜色决定 multiply 或 screen）
  | 'soft-light'     // 柔光（类似强光但更柔和）
  | 'difference'     // 差值（绝对差）
  | 'exclusion'      // 排除（类似差值但对比度更低）
  | 'hue'            // 保留新图形的色相，混合其他通道
  | 'saturation'     // 保留新图形的饱和度，混合其他通道
  | 'color'          // 保留新图形的色相和饱和度，混合明度
  | 'luminosity'     // 保留新图形的明度，混合色相和饱和度

interface CanvasGradient {
  addColorStop(offset: number, color: string): void
}

interface CanvasPattern {}

export class Path2D {
  constructor(path?: Path2D | string)
  addPath(path: Path2D, transform?: { a: number, b: number, c: number, d: number, e: number, f: number } | number[]): void
  closePath(): void
  moveTo(x: number, y: number): void
  lineTo(x: number, y: number): void
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
  rect(x: number, y: number, width: number, height: number): void
  roundRect(x: number, y: number, width: number, height: number, radii: number): void
  ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
}

interface CanvasContext {
  // --- 状态管理 ---
  save(): void
  restore(): void

  // --- 变换操作 ---
  translate(x: number, y: number): void
  scale(x: number, y?: number): void
  rotate(angle: number): void
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void
  resetTransform(): void
  getTransform(): {
    a: number
    b: number
    c: number
    d: number
    e: number
    f: number
  }

  // --- 路径相关 ---
  beginPath(): void
  closePath(): void
  moveTo(x: number, y: number): void
  lineTo(x: number, y: number): void
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
  rect(x: number, y: number, width: number, height: number): void
  roundRect(x: number, y: number, width: number, height: number, radii: number): void
  ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void

  // --- 绘制方法 ---
  fill(fillRule?: 'nonzero' | 'evenodd'): void
  fill(path: Path2D, fillRule?: 'nonzero' | 'evenodd'): void
  stroke(): void
  stroke(path: Path2D): void
  clip(fillRule?: 'nonzero' | 'evenodd'): void
  clip(path: Path2D, fillRule?: 'nonzero' | 'evenodd'): void
  isPointInPath(x: number, y: number, fillRule?: 'nonzero' | 'evenodd'): boolean
  isPointInPath(path: Path2D, x: number, y: number, fillRule?: 'nonzero' | 'evenodd'): boolean

  // --- 矩形方法 ---
  fillRect(x: number, y: number, width: number, height: number): void
  strokeRect(x: number, y: number, width: number, height: number): void
  clearRect(x: number, y: number, width: number, height: number): void

  // --- 文本相关 ---
  fillText(text: string, x: number, y: number, maxWidth?: number): void
  strokeText(text: string, x: number, y: number, maxWidth?: number): void
  measureText(text: string): {
    width: number
    actualBoundingBoxLeft: number
    actualBoundingBoxRight: number
    fontBoundingBoxAscent: number
    fontBoundingBoxDescent: number
  }

  // --- 图像绘制 ---
  drawImage(
    image: CanvasImage,
    dx: number, dy: number
  ): void
  drawImage(
    image: CanvasImage,
    dx: number, dy: number,
    dWidth: number, dHeight: number
  ): void
  drawImage(
    image: CanvasImage,
    sx: number, sy: number,
    sWidth: number, sHeight: number,
    dx: number, dy: number,
    dWidth: number, dHeight: number
  ): void

  // --- 线条样式 ---
  lineWidth: number
  lineCap: 'butt' | 'round' | 'square'
  lineJoin: 'miter' | 'round' | 'bevel'
  miterLimit: number
  setLineDash(segments: number[]): void
  getLineDash(): number[]
  lineDashOffset: number

  // --- 填充和描边样式 ---
  fillStyle: string | CanvasGradient | CanvasPattern
  strokeStyle: string | CanvasGradient | CanvasPattern
  globalAlpha: number
  shadowColor: string
  shadowBlur: number
  shadowOffsetX: number
  shadowOffsetY: number

  // --- 文本样式 ---
  font: string
  textAlign: 'left' | 'right' | 'center' | 'start' | 'end'
  textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
  direction: 'ltr' | 'rtl' | 'inherit'

  // --- 合成 ---
  globalCompositeOperation: GlobalCompositeOperation

  // --- 渐变 ---
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient
  createRadialGradient(
    x0: number, y0: number, r0: number,
    x1: number, y1: number, r1: number
  ): CanvasGradient
  createPattern(image: OffscreenCanvas, repetition?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'): CanvasPattern

  // --- 像素操作 ---
  getImageData(
    sx: number,
    sy: number,
    sw: number,
    sh: number
  ): {
    width: number
    height: number
    data: Uint8ClampedArray
  }

  putImageData(
    imageData: {
      width: number
      height: number
      data: Uint8ClampedArray
    },
    dx: number,
    dy: number
  ): void
}

interface CanvasImage {
  src: string
  onload: () => void
  onerror: () => void
  width: number
  height: number
}

interface CanvasElement {
  width: number
  height: number
  getContext: (type: '2d') => CanvasContext
  requestAnimationFrame: (callback: (time: number) => void) => number
  cancelAnimationFrame: (handle: number) => void
  createImage: () => CanvasImage
  createImageData: (width: number, height: number) => any
  toDataURL: (type?: string, encoderOptions?: number) => string
}

export const defineCanvasRef: () => {
  getCanvas: () => Promise<{
    canvas: CanvasElement,
    size: {
      width: number
      height: number
      x: number
      y: number
    }
  }>
}
export const defineCanvas: (canvas?: CanvasElement) => CanvasElement

export const defineCanvasContext: (ctx?: CanvasContext) => CanvasContext

interface CanvasProps {
  /**
   * 尺寸改变事件
   * 需要监听这个事件，在回调里面需要重绘你的内容
   * 在RN端可以适应任何尺寸变化
   * 小程序 H5 端监听的是整个窗口resize事件，一般是在PC端拖动窗口大小或者全屏
   * 首次布局不会触发，会在布局更新的时候触发
   */
  onLayout?: (size: {
    width: number
    height: number
    x: number
    y: number
  }) => void

  /**
   * RN 端启用 SkiaPictureView 渲染 开启后会有更好的性能
   * 每次同步渲染之后都会使用一个新的 canvas 因此变换状态和渲染数据会丢失
   * 满足下面这些条件可以启用
   * 1、不需要局部更新，每次都是全局更新
   * 2、每次渲染之后所有的变换都是重新计算的
   * 3、picture 模式下 clearRect 不会执行任何内容，因为每次都是新的画布
   */
  picture?: boolean

  className?: string

  style?: CSSProperties
}

export const Canvas: ComponentType<CanvasProps>

export class OffscreenCanvas {
  constructor(width: number, height: number)
  width: number
  height: number
  getContext(type: '2d'): any
  cancelAnimationFrame: typeof cancelAnimationFrame
  requestAnimationFrame: typeof requestAnimationFrame
  createImage: () => any
  createImageData: (width: number, height: number) => any
  toDataURL: (type?: string, encoderOptions?: number) => string
}

export const createOffscreenCanvas: (option: {
  type?: '2d'
  width: number
  height: number
  compInst?: any
}) => OffscreenCanvas

export const canvasToTempFilePath: (option: {
  /**
   * RN 端（Skia）会导出为缓存文件（`file://...`），用于替代 Taro 的 `canvasToTempFilePath`。
   * 兼容 `Canvas` / `OffscreenCanvas` 等实现。
   */
  canvas: CanvasElement | OffscreenCanvas
  x?: number
  y?: number
  width?: number
  height?: number
  destWidth?: number
  destHeight?: number
  fileType?: 'png' | 'jpg' | 'jpeg' | 'webp'
  /**
   * 0~1，仅在 `jpg/jpeg/webp` 下生效
   */
  quality?: number
}) => Promise<{
  tempFilePath: string
  mime: string
}>

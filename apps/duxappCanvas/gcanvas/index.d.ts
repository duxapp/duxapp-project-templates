import { ComponentType, CSSProperties, MutableRefObject } from 'react'

type CanvasContext = CanvasRenderingContext2D
type CanvasImage = HTMLImageElement
type CanvasElement = HTMLCanvasElement & {
  createImage?: () => CanvasImage
  requestAnimationFrame?: (callback: (time: number) => void) => number
  cancelAnimationFrame?: (handle: number) => void
  toDataURL?: (type?: string, encoderOptions?: number) => string
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
} | null
export type CanvasRef = NonNullable<ReturnType<typeof defineCanvasRef>>
export const defineCanvas: (canvas?: CanvasElement) => CanvasElement

export const defineCanvasContext: (ctx?: CanvasContext) => CanvasContext
export const useCanvasRef: () => MutableRefObject<ReturnType<typeof defineCanvasRef>>

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

  className?: string

  style?: CSSProperties
}

export const Canvas: ComponentType<CanvasProps>

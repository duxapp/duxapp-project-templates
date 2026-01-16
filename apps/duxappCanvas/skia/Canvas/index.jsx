import { getWindowInfo, throttle } from '@/duxapp'
import { Canvas as CanvasTaro } from '@tarojs/components'
import { createSelectorQuery, nextTick, onWindowResize, offWindowResize } from '@tarojs/taro'
import { forwardRef, useMemo, useImperativeHandle, useEffect, useCallback } from 'react'
import { applyCompatTransform, createCompatState, createCompatWrappers } from '../compat/canvas2dCompat'

// 小程序/非 RN 端：内部 backing store 使用 dpr 放大以保证清晰度，但对外暴露“标准 1x canvas”语义：
// - canvas.width/height 为逻辑尺寸（CSS px）
// - ctx 的 transform/getTransform 等不包含 dpr（上层库不会感知内部缩放）
// - 内部实际绘制会把外部 transform 乘以 dpr 应用到真实 ctx
export const Canvas = forwardRef(({ onLayout, ...props }, ref) => {

  const refs = useMemo(() => {
    if (!Canvas.id) {
      Canvas.id = 0
    }
    return {
      id: `_duxapp-skia-canvas-like-${++Canvas.id}`,
      size: null,
      dpr: 1,
      compat: createCompatState()
    }
  }, [])

  refs.onLayout = onLayout

  const ensureCompatWrappers = (canvas, ctx) => {
    if (!canvas || !ctx) return { canvas, ctx }
    if (refs.compatWrapper?.rawCanvas === canvas && refs.compatWrapper?.rawCtx === ctx) {
      return { canvas: refs.compatWrapper.canvas, ctx: refs.compatWrapper.ctx }
    }

    const syncBackingStore = () => {
      const dpr = refs.dpr || 1
      canvas.width = Math.max(1, Math.ceil(refs.compat.logicalWidth * dpr))
      canvas.height = Math.max(1, Math.ceil(refs.compat.logicalHeight * dpr))
    }

    const wrappers = createCompatWrappers({
      rawCanvas: canvas,
      rawCtx: ctx,
      state: refs.compat,
      getDpr: () => refs.dpr || 1,
      syncBackingStore
    })

    refs.compatWrapper = {
      rawCanvas: canvas,
      rawCtx: ctx,
      canvas: wrappers.canvas,
      ctx: wrappers.ctx
    }
    return wrappers
  }

  const getCanvas = useCallback(() => {
    return new Promise((resolve, reject) => {
      nextTick(() => {
        const query = createSelectorQuery()
        query.select(`#${refs.id}`)
          .fields({ node: true, size: true, rect: true })
          .exec(res => {
            const canvas = res[0]?.node
            if (!canvas) {
              reject(new Error('无法获取canvas节点'))
              return
            }
            if (process.env.TARO_ENV === 'h5') {
              if (!canvas.createImage) {
                canvas.createImage = () => new Image()
              }
              if (!canvas.requestAnimationFrame) {
                canvas.requestAnimationFrame = window.requestAnimationFrame.bind(window)
              }
              if (!canvas.cancelAnimationFrame) {
                canvas.cancelAnimationFrame = window.cancelAnimationFrame.bind(window)
              }
            }
            const ctx = canvas.getContext('2d')

            const dpr = getWindowInfo().pixelRatio
            const size = getSize(res[0])

            refs.dpr = dpr
            refs.compat.logicalWidth = size.width
            refs.compat.logicalHeight = size.height

            const w = Math.max(1, Math.ceil(size.width * dpr))
            const h = Math.max(1, Math.ceil(size.height * dpr))

            if (!w || !h) {
              reject(new Error('无效的尺寸信息'))
              return
            }

            // 尺寸相同，防止二次缩放 导致被放大
            if (refs.canvas && refs.canvas.width === w && refs.canvas.height === h) {
              reject(new Error('相同的尺寸'))
              return
            }
            canvas.width = w
            canvas.height = h

            // 对外暴露 1x 语义，但内部永远带 dpr
            refs.compat.ext = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
            refs.compat.stack = []
            applyCompatTransform(ctx, refs.dpr, refs.compat.ext)

            refs.canvas = canvas
            refs.ctx = ctx

            const compat = ensureCompatWrappers(canvas, ctx)
            resolve({
              size,
              canvas: compat.canvas
            })
          })
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(ref, () => {
    return {
      getCanvas
    }
  }, [getCanvas])

  useEffect(() => {
    const callback = throttle(async () => {
      if (!refs.canvas) {
        return
      }
      try {
        const { size } = await getCanvas()
        refs.onLayout?.(size)
      } catch (_e) {
        // ignore (e.g. same size)
      }
    }, 20, false)

    onWindowResize(callback)
    return () => offWindowResize(callback)
  }, [getCanvas, refs])

  return <CanvasTaro
    type='2d'
    {...props}
    id={refs.id}
  />
})

export const defineCanvasRef = () => null

export const defineCanvas = canvas => canvas
export const defineCanvasContext = ctx => ctx

const getSize = (info) => {
  if (process.env.TARO_ENV === 'h5') {
    const rect = info.node.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top
    }
  } else {
    return {
      width: info.width,
      height: info.height,
      x: info.left,
      y: info.top
    }
  }
}

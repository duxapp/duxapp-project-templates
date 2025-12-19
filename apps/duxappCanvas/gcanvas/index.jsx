import { getWindowInfo, throttle } from '@/duxapp'
import { Canvas as CanvasTaro } from '@tarojs/components'
import { createSelectorQuery, nextTick, onWindowResize, offWindowResize } from '@tarojs/taro'
import { forwardRef, useMemo, useImperativeHandle, useEffect, useRef } from 'react'

export const Canvas = forwardRef(({ onLayout, ...props }, ref) => {

  const refs = useMemo(() => {
    if (!Canvas.id) {
      Canvas.id = 0
    }
    return {
      id: `_duxapp-skia-canvas-like-${++Canvas.id}`
    }
  }, [])

  refs.onLayout = onLayout

  useImperativeHandle(ref, () => {
    return {
      getCanvas: () => {
        return new Promise(resolve => {
          nextTick(() => {
            const query = createSelectorQuery()
            query.select(`#${refs.id}`)
              .fields({ node: true, size: true, rect: true })
              .exec((_res) => {
                const canvas = _res[0].node
                if (process.env.TARO_ENV === 'h5' && !canvas.createImage) {
                  canvas.createImage = () => {
                    return new Image()
                  }
                }
                const ctx = canvas.getContext('2d')

                const dpr = getWindowInfo().pixelRatio
                const size = getSize(_res[0])
                canvas.width = size.width * dpr
                canvas.height = size.height * dpr

                ctx.scale(dpr, dpr)

                refs.canvas = canvas
                refs.ctx = ctx

                resolve({
                  size,
                  canvas
                })
              })
          })
        })
      }
    }
  }, [refs])

  useEffect(() => {
    const query = createSelectorQuery()
    const callback = throttle(() => {
      if (!refs.canvas) {
        return
      }
      query.select(`#${refs.id}`)
        .fields({ size: true, rect: true, node: true })
        .exec((_res) => {
          const dpr = getWindowInfo().pixelRatio
          const size = getSize(_res[0])
          refs.canvas.width = size.width * dpr
          refs.canvas.height = size.height * dpr

          refs.ctx.scale(dpr, dpr)

          refs.onLayout?.(size)
        })
    }, 20, false)
    onWindowResize(callback)
    return () => offWindowResize(callback)
  }, [refs])

  return <CanvasTaro
    type='2d'
    {...props}
    id={refs.id}
  />
})

export const defineCanvasRef = () => null

export const defineCanvas = canvas => canvas
export const defineCanvasContext = ctx => ctx
export const useCanvasRef = () => useRef(defineCanvasRef())

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

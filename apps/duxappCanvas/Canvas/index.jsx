import { getWindowInfo, throttle } from '@/duxapp'
import { Canvas as CanvasTaro } from '@tarojs/components'
import { createSelectorQuery, nextTick, onWindowResize, offWindowResize } from '@tarojs/taro'
import { forwardRef, useMemo, useImperativeHandle, useEffect } from 'react'

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
                const getContext = canvas.getContext.bind(canvas)

                canvas.getContext = type => {
                  if (type !== '2d') {
                    throw new Error('getContext: 仅支持获取 2d 类型')
                  }
                  return getContext(type)
                }
                const ctx = getContext('2d')

                const dpr = getWindowInfo().pixelRatio
                const layout = _res[0]
                canvas.width = layout.width * dpr
                canvas.height = layout.height * dpr
                ctx.scale(dpr, dpr)

                refs.canvas = canvas
                refs.ctx = ctx

                resolve({
                  size: {
                    width: layout.width,
                    height: layout.height,
                    x: layout.left,
                    y: layout.right
                  },
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
          const info = _res[0]
          refs.canvas.width = info.width * dpr
          refs.canvas.height = info.height * dpr

          refs.onLayout?.({
            width: info.width,
            height: info.height,
            x: info.left,
            y: info.top
          })
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

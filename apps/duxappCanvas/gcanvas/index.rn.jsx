import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { Image as RNImage, PixelRatio } from 'react-native'
import { View } from '@tarojs/components'
import { GCanvasView } from '@flyskywhy/react-native-gcanvas'

const normalizeSrc = (src) => {
  if (typeof src === 'number') {
    return RNImage.resolveAssetSource(src)?.uri || ''
  }
  if (src && typeof src === 'object' && src.uri) {
    return src.uri
  }
  return src
}

export const Canvas = forwardRef(({ style, onLayout, className, ...props }, ref) => {

  const refs = useRef({
    waiters: []
  }).current

  refs.onLayout = onLayout

  const resolveWaiters = useCallback(() => {
    if (refs.canvas && refs.size && refs.waiters.length) {
      const payload = {
        canvas: refs.canvas,
        size: refs.size
      }
      refs.waiters.splice(0).forEach(resolve => resolve(payload))
    }
  }, [refs])

  useImperativeHandle(ref, () => ({
    getCanvas: () => new Promise(resolve => {
      if (refs.canvas && refs.size) {
        resolve({
          canvas: refs.canvas,
          size: refs.size
        })
      } else {
        refs.waiters.push(resolve)
      }
    })
  }), [refs])

  const updateSize = useCallback(({ width, height }) => {
    const size = {
      width,
      height,
      x: refs.position?.x ?? 0,
      y: refs.position?.y ?? 0
    }
    refs.size = size
    refs.onLayout?.(size)
    resolveWaiters()
  }, [refs, resolveWaiters])

  const applyDprSize = useCallback((canvas, width, height) => {
    // const dpr = PixelRatio.get()
    // refs.dpr = dpr
    // canvas.width = width * dpr
    // canvas.height = height * dpr
    // const ctx = canvas.getContext?.('2d')
    // if (ctx) {
    //   if (typeof ctx.setTransform === 'function') {
    //     ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    //   } else {
    //     ctx.scale?.(dpr, dpr)
    //   }
    // }
  }, [refs])

  const handleCanvasCreate = useCallback((canvas) => {
    refs.canvas = canvas
    if (canvas && !canvas.createImage && typeof Image !== 'undefined') {
      canvas.createImage = () => {
        const img = new Image()
        const proto = Object.getPrototypeOf(img)
        const descriptor = proto ? Object.getOwnPropertyDescriptor(proto, 'src') : null
        const originalGet = descriptor?.get
        const originalSet = descriptor?.set
        let cacheSrc = ''
        Object.defineProperty(img, 'src', {
          configurable: true,
          enumerable: true,
          get: () => originalGet ? originalGet.call(img) : cacheSrc,
          set: (value) => {
            const uri = normalizeSrc(value)
            cacheSrc = uri
            if (originalSet) {
              originalSet.call(img, uri)
            } else if (img.setAttribute) {
              img.setAttribute('src', uri)
            }
          }
        })
        return img
      }
    }
    if (canvas && !canvas.requestAnimationFrame) {
      canvas.requestAnimationFrame = requestAnimationFrame
    }
    if (canvas && !canvas.cancelAnimationFrame) {
      canvas.cancelAnimationFrame = cancelAnimationFrame
    }
    if (refs.size) {
      applyDprSize(canvas, refs.size.width, refs.size.height)
    }
    resolveWaiters()
  }, [refs, resolveWaiters, applyDprSize])

  const handleCanvasResize = useCallback(({ width, height, canvas }) => {
    const target = canvas || refs.canvas
    if (target) {
      applyDprSize(target, width, height)
    }
    updateSize({ width, height })
  }, [refs, updateSize, applyDprSize])

  const handleLayout = useCallback((event) => {
    const layout = event.nativeEvent.layout
    refs.position = {
      x: layout.x,
      y: layout.y
    }
    if (layout.width && layout.height) {
      updateSize({
        width: layout.width,
        height: layout.height
      })
    }
  }, [refs, updateSize])

  return <View
    style={style}
    onLayout={handleLayout}
    {...props}
  >
    <GCanvasView
      style={{ flex: 1, width: '100%', height: '100%' }}
      onCanvasCreate={handleCanvasCreate}
      onCanvasResize={handleCanvasResize}
    />
  </View>
})

export const defineCanvasRef = () => null

export const defineCanvas = canvas => canvas
export const defineCanvasContext = ctx => ctx
export const useCanvasRef = () => useRef(defineCanvasRef())

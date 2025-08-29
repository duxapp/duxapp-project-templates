import { forwardRef, useMemo, useState, useImperativeHandle, useRef, useLayoutEffect } from 'react'
import { Canvas as CanvasSkia, Image, useCanvasRef } from '@shopify/react-native-skia'
import { View } from 'react-native'
import { Canvas as DuxCanvas } from './Canvas'

export const Canvas = forwardRef(({ style, onLayout, ...props }, ref) => {

  const [layout, setLayout] = useState({})

  const canvas = useMemo(() => new DuxCanvas(), [])

  const image = canvas.useImage()

  const layoutCallback = useRef()

  const refs = useRef({}).current
  refs.onLayout = onLayout

  useImperativeHandle(ref, () => {
    return {
      getCanvas: async () => {
        if (!canvas.layout) {
          return new Promise(resolve => {
            layoutCallback.current = () => {
              layoutCallback.current = null
              resolve({
                canvas,
                size: canvas.layout
              })
            }
          })
        }
        return {
          canvas,
          size: canvas.layout
        }
      }
    }
  }, [canvas])

  const init = useRef(false)

  const canvasRef = useCanvasRef()

  useLayoutEffect(() => {
    canvasRef.current?.measure((_x, _y, width, height) => {
      if (!init.current) {
        init.current = true
        return
      }
      const l = { x: 0, y: 0, width, height }
      setLayout(l)
      canvas.setLayout(l)
      refs.onLayout?.(l)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const layoutChange = e => {
  //   if (!init.current) {
  //     init.current = true
  //     return
  //   }
  //   const l = e.nativeEvent.layout
  //   setLayout(l)
  //   canvas.setLayout(l)
  //   onLayout?.(l)
  // }

  return <>
    {
      layout.height && image ?
        <CanvasSkia
          style={style}
          // onLayout={layoutChange}
          ref={canvasRef}
          {...props}
        >
          <Image image={image} x={0} y={0} width={layout.width} height={layout.height} />
        </CanvasSkia> :
        <View
          style={style}
          {...props}
          onLayout={e => {
            const l = e.nativeEvent.layout
            setLayout(l)
            canvas.setLayout(l)
            layoutCallback.current?.()
          }}
        />
    }
  </>
})

export const defineCanvasRef = () => null

export const defineCanvas = canvas => canvas
export const defineCanvasContext = ctx => ctx

import { forwardRef, useMemo, useImperativeHandle, useRef, memo, useState, useLayoutEffect } from 'react'
import { SkiaPictureView, Canvas as CanvasSkia, Image, useCanvasRef } from '@shopify/react-native-skia'
import { View } from 'react-native'
import useClickable from '@tarojs/components-rn/dist/components/hooks/useClickable'
import { Canvas as CanvasPicture } from './CanvasPicture'
import { Canvas as CanvasImage } from './CanvasImage'

export const Canvas = memo(({ picture, ...props }) => {
  if (picture) {
    return <PictureView {...props} />
  }
  return <ImageView {...props} />
})

export const defineCanvasRef = () => null

export const defineCanvas = canvas => canvas
export const defineCanvasContext = ctx => ctx

const PictureView = forwardRef(({ style, onLayout, ...props }, ref) => {

  const pictureViewRef = useRef(null)

  const canvas = useMemo(() => new CanvasPicture(), [])

  const picture = canvas.usePicture()

  const refs = useRef({}).current
  refs.onLayout = onLayout
  const clickable = useClickable({ style, ...props })

  useImperativeHandle(ref, () => {
    return {
      getCanvas: async () => {
        if (!canvas.layout) {
          return new Promise(resolve => {
            refs.layoutCallback = () => {
              refs.layoutCallback = null
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const layoutChange = e => {
    const l = e.nativeEvent.layout
    canvas.setLayout(l)
    // refs.onLayout?.(l)
    setTimeout(() => {
      canvas.context.updateCanvas(null, pictureViewRef.current)
      refs.layoutCallback?.()
    }, 0)
  }

  return <SkiaPictureView
    {...clickable}
    onLayout={layoutChange}
    ref={pictureViewRef}
    picture={picture}
  />
})

export const ImageView = forwardRef(({ style, onLayout, ...props }, ref) => {

  const [layout, setLayout] = useState({})

  const canvas = useMemo(() => new CanvasImage(), [])

  const image = canvas.useImage()

  const layoutCallback = useRef()

  const refs = useRef({}).current
  refs.onLayout = onLayout
  const clickable = useClickable({ style, ...props })

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
          {...clickable}
          // onLayout={layoutChange}
          ref={canvasRef}
        >
          <Image image={image} x={0} y={0} width={layout.width} height={layout.height} />
        </CanvasSkia> :
        <View
          {...clickable}
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

/* eslint-disable react-hooks/rules-of-hooks */
import { ImageFormat } from '@shopify/react-native-skia'
import { useEffect, useReducer, useRef } from 'react'
import { CanvasImage } from './Image'

export class CanvasBase {

  createImage() {
    return new CanvasImage()
  }

  createImageData(width, height) {
    const ctx = this.getContext?.('2d')
    if (ctx?.createImageData) {
      return ctx.createImageData(width, height)
    }
    const w = Math.max(0, Number(width) || 0)
    const h = Math.max(0, Number(height) || 0)
    return {
      width: w,
      height: h,
      data: new Uint8ClampedArray(w * h * 4)
    }
  }

  // 帧动画功能
  requestAnimationFrame = requestAnimationFrame
  cancelAnimationFrame = cancelAnimationFrame

  setLayout(layout) {
    this.layout = layout
  }

  layout

  useForceUpdate(onUnmount) {
    const onUnmountRef = useRef(onUnmount)
    onUnmountRef.current = onUnmount
    const [, forceUpdate] = useReducer(x => x > 10 ? 0 : x + 1, 0)

    useEffect(() => {
      this.forceUpdate = forceUpdate
      return () => {
        this.forceUpdate = null
        onUnmountRef.current?.()
      }
    }, [])
  }

  forceUpdate

  _encodeImageToDataURL(image, type, encoderOptions) {
    const mime = normalizeMimeType(type)
    const { format, quality } = resolveEncoderOptions(mime, encoderOptions)
    const base64 = image.encodeToBase64(format, quality)
    return `data:${mime};base64,${base64}`
  }
}

function normalizeMimeType(type) {
  if (!type || typeof type !== 'string') {
    return 'image/png'
  }
  const t = type.trim().toLowerCase()
  if (!t) {
    return 'image/png'
  }
  if (t === 'image/jpg') {
    return 'image/jpeg'
  }
  if (t === 'image/png' || t === 'image/jpeg' || t === 'image/webp') {
    return t
  }
  return 'image/png'
}

function resolveEncoderOptions(mime, encoderOptions) {
  let format = ImageFormat.PNG
  switch (mime) {
    case 'image/jpeg':
      format = ImageFormat.JPEG
      break
    case 'image/webp':
      format = ImageFormat.WEBP
      break
    default:
      format = ImageFormat.PNG
      break
  }

  if (format === ImageFormat.PNG) {
    return { format, quality: 100 }
  }

  const raw = typeof encoderOptions === 'number' ? encoderOptions : 0.92
  const clamped = Math.min(1, Math.max(0, raw))
  return { format, quality: Math.round(clamped * 100) }
}

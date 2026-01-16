import { ImageFormat, Skia } from '@shopify/react-native-skia'
import { Directory, EncodingType, File, Paths } from 'expo-file-system'
import { PixelRatio } from 'react-native'

export const canvasToTempFilePath = async (option = {}) => {
  const {
    canvas,
    fileType = 'png',
    quality = 1
  } = option

  if (!canvas) {
    throw new Error('canvasToTempFilePath: 缺少 canvas')
  }

  const dpi = PixelRatio.get()

  const { width: canvasWidth, height: canvasHeight } = getCanvasLogicalSize(canvas)

  const x = Number.isFinite(option.x) ? option.x : 0
  const y = Number.isFinite(option.y) ? option.y : 0

  const width = Number.isFinite(option.width) ? option.width : canvasWidth - x
  const height = Number.isFinite(option.height) ? option.height : canvasHeight - y

  const destWidth = Number.isFinite(option.destWidth) ? option.destWidth : width * dpi
  const destHeight = Number.isFinite(option.destHeight) ? option.destHeight : height * dpi

  const sx = Math.round(x * dpi)
  const sy = Math.round(y * dpi)
  const sw = Math.round(width * dpi)
  const sh = Math.round(height * dpi)
  const dw = Math.round(destWidth)
  const dh = Math.round(destHeight)

  if (sw <= 0 || sh <= 0) {
    throw new Error('canvasToTempFilePath: width/height 不能小于等于 0')
  }
  if (dw <= 0 || dh <= 0) {
    throw new Error('canvasToTempFilePath: destWidth/destHeight 不能小于等于 0')
  }

  const { format, mime, ext, skQuality } = resolveEncodeOptions(fileType, quality)

  const base64 = renderCanvasRegionToBase64(
    canvas,
    {
      x,
      y,
      width,
      height,
      sx,
      sy,
      sw,
      sh,
      dw,
      dh,
      dpi
    },
    format,
    skQuality
  )

  const filename = `canvas_${Date.now()}_${randomString(6)}.${ext}`
  const dir = new Directory(Paths.cache, 'duxapp-canvas')
  dir.create({ intermediates: true, idempotent: true })

  const file = new File(dir, filename)
  file.create({ intermediates: true, overwrite: true })
  file.write(base64, { encoding: 'base64' })

  return {
    tempFilePath: file.uri,
    mime
  }
}

function getCanvasLogicalSize(canvas) {
  const layoutW = canvas?.layout?.width
  const layoutH = canvas?.layout?.height
  if (Number.isFinite(layoutW) && Number.isFinite(layoutH)) {
    return { width: layoutW, height: layoutH }
  }

  const w = canvas?.width
  const h = canvas?.height
  if (Number.isFinite(w) && Number.isFinite(h)) {
    return { width: w, height: h }
  }

  throw new Error('canvasToTempFilePath: 无法获取 canvas 尺寸')
}

function resolveEncodeOptions(fileType, quality) {
  const t = String(fileType || 'png').trim().toLowerCase()
  const ext = t === 'jpg' ? 'jpg' : t === 'jpeg' ? 'jpg' : t === 'webp' ? 'webp' : 'png'
  const mime = ext === 'jpg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : 'image/png'
  const format = ext === 'jpg'
    ? ImageFormat.JPEG
    : ext === 'webp'
      ? ImageFormat.WEBP
      : ImageFormat.PNG

  if (format === ImageFormat.PNG) {
    return { format, mime, ext: 'png', skQuality: 100 }
  }

  const raw = typeof quality === 'number' ? quality : 0.92
  const clamped = Math.min(1, Math.max(0, raw))
  const skQuality = Math.round(clamped * 100)
  return { format, mime, ext, skQuality }
}

function renderCanvasRegionToBase64(canvas, region, format, skQuality) {
  canvas?._flushResizeIfNeeded?.()
  if (typeof canvas?.getContext === 'function') {
    canvas.getContext('2d')
  }

  if (canvas?._surface && canvas?._rect) {
    return renderSurfaceRegionToBase64(canvas._surface, region, format, skQuality)
  }

  if (canvas?.surface && canvas?.rect) {
    return renderSurfaceRegionToBase64(canvas.surface, region, format, skQuality)
  }

  if (canvas?.context) {
    return renderPictureRegionToBase64(canvas, region, format, skQuality)
  }

  throw new Error('canvasToTempFilePath: 不支持的 canvas 类型')
}

function renderSurfaceRegionToBase64(surface, region, format, skQuality) {
  const srcRect = Skia.XYWHRect(region.sx, region.sy, region.sw, region.sh)
  const srcImage = surface.makeImageSnapshot(srcRect)
  srcRect.dispose()

  try {
    if (region.sw === region.dw && region.sh === region.dh) {
      return srcImage.encodeToBase64(format, skQuality)
    }

    const dstSurface = Skia.Surface.Make(region.dw, region.dh)
    if (!dstSurface) {
      throw new Error('canvasToTempFilePath: 无法创建 surface')
    }
    const dstCanvas = dstSurface.getCanvas()
    dstCanvas.clear(Skia.Color('#00000000'))

    const srcBounds = Skia.XYWHRect(0, 0, region.sw, region.sh)
    const dstBounds = Skia.XYWHRect(0, 0, region.dw, region.dh)
    dstCanvas.drawImageRect(srcImage, srcBounds, dstBounds)
    srcBounds.dispose()
    dstBounds.dispose()

    const dstImage = dstSurface.makeImageSnapshot()
    try {
      return dstImage.encodeToBase64(format, skQuality)
    } finally {
      dstImage.dispose?.()
      dstSurface.dispose?.()
    }
  } finally {
    srcImage.dispose?.()
  }
}

function renderPictureRegionToBase64(canvas, region, format, skQuality) {
  if (!canvas.layout) {
    throw new Error('canvasToTempFilePath: 无效的布局信息 layout')
  }

  const picture = canvas.context?.picture ?? canvas._getEmptyPicture?.()
  if (!picture) {
    throw new Error('canvasToTempFilePath: 无法获取 picture')
  }

  const surface = Skia.Surface.Make(region.dw, region.dh)
  if (!surface) {
    throw new Error('canvasToTempFilePath: 无法创建 surface')
  }

  const skCanvas = surface.getCanvas()
  skCanvas.clear(Skia.Color('#00000000'))
  skCanvas.save()

  const scaleX = region.dw / region.width
  const scaleY = region.dh / region.height
  skCanvas.scale(scaleX, scaleY)
  skCanvas.translate(-region.x, -region.y)
  skCanvas.drawPicture(picture)
  skCanvas.restore()

  const image = surface.makeImageSnapshot()
  try {
    return image.encodeToBase64(format, skQuality)
  } finally {
    image.dispose?.()
    surface.dispose?.()
  }
}

function randomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

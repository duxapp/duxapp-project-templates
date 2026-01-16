import { OffscreenCanvas } from './OffscreenCanvas'

export * from './Canvas'
export * from './canvasToTempFilePath'
export * from './Path2D'

export {
  OffscreenCanvas
}

export const createOffscreenCanvas = (option, height, compInst) => {
  if (typeof option === 'number') {
    return new OffscreenCanvas(option, height, compInst)
  }

  const opt = option || {}
  const type = opt.type || '2d'
  if (type !== '2d') {
    throw new Error('createOffscreenCanvas: 仅支持 type=2d')
  }

  if (!Number.isFinite(opt.width) || !Number.isFinite(opt.height)) {
    throw new TypeError('createOffscreenCanvas: width/height 必须是有限数字')
  }

  return new OffscreenCanvas(opt.width, opt.height, opt.compInst)
}

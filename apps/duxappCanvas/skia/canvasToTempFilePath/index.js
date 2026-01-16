import { canvasToTempFilePath as taroCanvasToTempFilePath } from '@tarojs/taro'

// 兼容 duxappCanvas 的 wrapper canvas：Taro 的 canvasToTempFilePath 需要原生 canvas 实例。
export const canvasToTempFilePath = (option = {}) => {
  const opt = option || {}
  const canvas = opt.canvas
  if (canvas && canvas.__rawCanvas) {
    return taroCanvasToTempFilePath({
      ...opt,
      canvas: canvas.__rawCanvas
    })
  }
  return taroCanvasToTempFilePath(opt)
}

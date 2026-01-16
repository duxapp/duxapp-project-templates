import { getWindowInfo } from '@/duxapp'
import { createOffscreenCanvas } from '@tarojs/taro'
import { applyCompatTransform, createCompatState, createCompatWrappers } from '../compat/canvas2dCompat'

/**
 * 非 RN 端的 OffscreenCanvas 实现
 * - H5：使用 document.createElement('canvas')
 * - 小程序等：使用 Taro.createOffscreenCanvas({ type: '2d', width, height })
 */
export class OffscreenCanvas {
  constructor(width, height, compInst) {
    const w = Number(width)
    const h = Number(height)
    if (!Number.isFinite(w) || !Number.isFinite(h)) {
      throw new TypeError('OffscreenCanvas width/height must be finite numbers')
    }
    this.compInst = compInst

    const dpi = getWindowInfo().pixelRatio || 1

    const state = {
      dpi,
      width: Math.max(0, w),
      height: Math.max(0, h),
      compat: createCompatState(),
      ctx: null,
      ctxWrapper: null,
      canvasWrapper: null,
      resizeQueued: false,
      resizeQueueToken: 0,
      lastResizeProp: null,
      backingWidthPx: null,
      backingHeightPx: null,
      backingVersion: 0,
      appliedBackingVersion: 0,
      setBackingWidth: null,
      setBackingHeight: null,
      originalGetContext: null
    }
    state.compat.logicalWidth = state.width
    state.compat.logicalHeight = state.height

    const canvas = this._createCanvas(state)
    this._patchCanvas(canvas, state)

    return canvas
  }

  _createCanvas(state) {
    const dpi = state.dpi || 1
    const widthPx = Math.ceil(state.width * dpi)
    const heightPx = Math.ceil(state.height * dpi)

    if (process.env.TARO_ENV === 'h5') {
      if (typeof document === 'undefined') {
        throw new Error('OffscreenCanvas H5 环境缺少 document')
      }
      return document.createElement('canvas')
    }

    // 其他端按照 Taro 的 createOffscreenCanvas API
    // 部分端对 0 尺寸不友好，创建时至少给 1px，后续 resize 再同步目标尺寸
    return createOffscreenCanvas({
      type: '2d',
      width: Math.max(1, widthPx || 1),
      height: Math.max(1, heightPx || 1),
      compInst: this.compInst
    })
  }

  _patchCanvas(canvas, state) {
    const findDesc = (obj, key) => {
      let cur = obj
      while (cur) {
        const desc = Object.getOwnPropertyDescriptor(cur, key)
        if (desc) {
          return desc
        }
        cur = Object.getPrototypeOf(cur)
      }
      return null
    }

    const widthDesc = findDesc(canvas, 'width')
    const heightDesc = findDesc(canvas, 'height')

    const canOverrideSizeProps = typeof widthDesc?.set === 'function' && typeof heightDesc?.set === 'function'

    state.setBackingWidth = typeof widthDesc?.set === 'function'
      ? (v) => widthDesc.set.call(canvas, v)
      : (v) => { canvas.width = v }
    state.setBackingHeight = typeof heightDesc?.set === 'function'
      ? (v) => heightDesc.set.call(canvas, v)
      : (v) => { canvas.height = v }

    state.originalGetContext = typeof canvas.getContext === 'function'
      ? canvas.getContext.bind(canvas)
      : null

    const applyCompat = () => {
      if (!state.ctx) return
      applyCompatTransform(state.ctx, state.dpi || 1, state.compat.ext)
    }

    const syncBackingStoreSize = (force = false) => {
      const dpr = state.dpi || 1
      const widthPx = Math.ceil(state.width * dpr)
      const heightPx = Math.ceil(state.height * dpr)
      const shouldUpdate = force
        || state.backingWidthPx !== widthPx
        || state.backingHeightPx !== heightPx

      if (shouldUpdate) {
        state.setBackingWidth(widthPx)
        state.setBackingHeight(heightPx)
        state.backingWidthPx = widthPx
        state.backingHeightPx = heightPx
        state.backingVersion++
      }
      applyCompat()
    }

    const flushResize = () => {
      state.resizeQueued = false
      state.resizeQueueToken++
      state.lastResizeProp = null
      syncBackingStoreSize()
    }

    const queueResize = (prop) => {
      state.lastResizeProp = prop
      if (state.resizeQueued) {
        return
      }
      state.resizeQueued = true
      const token = ++state.resizeQueueToken
      Promise.resolve().then(() => {
        if (state.resizeQueueToken !== token) {
          return
        }
        state.resizeQueued = false
        state.lastResizeProp = null
        syncBackingStoreSize()
      })
    }

    const flushResizeIfNeeded = () => {
      if (!state.resizeQueued) {
        return
      }
      flushResize()
    }

    const defineLogicalSizeProps = (widthKey, heightKey) => {
      Object.defineProperty(canvas, widthKey, {
        configurable: true,
        enumerable: true,
        get() {
          return state.width
        },
        set(value) {
          const w = Math.max(0, Number(value) || 0)
          if (w === state.width) {
            // 对齐标准 canvas 行为：即使设置同样的宽度，也会重置 buffer/transform
            syncBackingStoreSize(true)
            return
          }
          state.width = w
          state.compat.logicalWidth = w
          if (state.resizeQueued && state.lastResizeProp === 'height') {
            flushResize()
            return
          }
          queueResize('width')
        }
      })

      Object.defineProperty(canvas, heightKey, {
        configurable: true,
        enumerable: true,
        get() {
          return state.height
        },
        set(value) {
          const h = Math.max(0, Number(value) || 0)
          if (h === state.height) {
            // 对齐标准 canvas 行为：即使设置同样的高度，也会重置 buffer/transform
            syncBackingStoreSize(true)
            return
          }
          state.height = h
          state.compat.logicalHeight = h
          if (state.resizeQueued && state.lastResizeProp === 'width') {
            flushResize()
            return
          }
          queueResize('height')
        }
      })
    }

    // 绝大多数实现（H5 Canvas / 小程序 OffscreenCanvas）width/height 都是可拦截的 accessor。
    // 若某些实现是不可拦截的 data 属性，则保留原生 width/height（作为 backing store 尺寸），并提供 logicalWidth/logicalHeight 给业务侧使用。
    if (canOverrideSizeProps) {
      defineLogicalSizeProps('width', 'height')
    } else {
      defineLogicalSizeProps('logicalWidth', 'logicalHeight')
    }

    const ensureWrappers = () => {
      if (state.canvasWrapper && state.ctxWrapper) {
        return
      }
      const syncBackingStore = () => {
        state.width = state.compat.logicalWidth
        state.height = state.compat.logicalHeight
        syncBackingStoreSize(true)
      }
      const wrappers = createCompatWrappers({
        rawCanvas: canvas,
        rawCtx: state.ctx,
        state: state.compat,
        getDpr: () => state.dpi || 1,
        syncBackingStore,
        rawGetContext: state.originalGetContext
      })
      state.canvasWrapper = wrappers.canvas
      state.ctxWrapper = wrappers.ctx
    }

    canvas.getContext = (contextId, options) => {
      if (contextId !== '2d') {
        throw new Error('OffscreenCanvas 仅支持 2d 上下文')
      }
      flushResizeIfNeeded()
      if (state.ctx) {
        ensureWrappers()
        return state.ctxWrapper
      }
      if (!state.originalGetContext) {
        throw new Error('OffscreenCanvas: canvas 缺少 getContext')
      }
      const ctx = state.originalGetContext('2d', options)
      if (!ctx) {
        throw new Error('OffscreenCanvas: 无法获取 2d 上下文')
      }
      state.ctx = ctx
      // 对外暴露 1x 语义，但内部永远带 dpr
      state.compat.logicalWidth = state.width
      state.compat.logicalHeight = state.height
      state.compat.ext = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      state.compat.stack = []
      syncBackingStoreSize(true)
      ensureWrappers()
      return state.ctxWrapper
    }

    // 初始同步 backing store，保证首次 getContext 之前也有正确尺寸
    syncBackingStoreSize(true)
  }
}

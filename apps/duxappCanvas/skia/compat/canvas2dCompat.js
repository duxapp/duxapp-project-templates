// Canvas 2D compat layer:
// - backing store is scaled by DPR for sharp rendering
// - external-facing canvas.width/height and ctx transforms behave like a "standard 1x canvas"
//   (i.e. external transforms do not include DPR)

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }

export const createCompatState = () => ({
  logicalWidth: 0,
  logicalHeight: 0,
  ext: { ...IDENTITY },
  stack: []
})

export const mulAffine = (m1, m2) => {
  const a = m1.a * m2.a + m1.c * m2.b
  const b = m1.b * m2.a + m1.d * m2.b
  const c = m1.a * m2.c + m1.c * m2.d
  const d = m1.b * m2.c + m1.d * m2.d
  const e = m1.a * m2.e + m1.c * m2.f + m1.e
  const f = m1.b * m2.e + m1.d * m2.f + m1.f
  return { a, b, c, d, e, f }
}

export const applyCompatTransform = (rawCtx, dpr, ext) => {
  const r = dpr || 1
  const { a, b, c, d, e, f } = ext || IDENTITY
  if (typeof rawCtx?.setTransform === 'function') {
    rawCtx.setTransform(a * r, b * r, c * r, d * r, e * r, f * r)
    return
  }
  if (typeof rawCtx?.resetTransform === 'function') {
    rawCtx.resetTransform()
  }
  rawCtx.scale(r, r)
  // Note: without setTransform, this is not fully equivalent. Prefer setTransform-capable impls.
  rawCtx.transform(a, b, c, d, e, f)
}

const findDesc = (obj, key) => {
  let cur = obj
  while (cur) {
    const desc = Object.getOwnPropertyDescriptor(cur, key)
    if (desc) return desc
    cur = Object.getPrototypeOf(cur)
  }
  return null
}

const bindAll = (wrapper, raw, overrides = {}) => {
  const seen = new Set()
  for (const key of Object.getOwnPropertyNames(overrides)) {
    const od = Object.getOwnPropertyDescriptor(overrides, key)
    if (!od) continue
    Object.defineProperty(wrapper, key, od)
    seen.add(key)
  }

  let cur = raw
  while (cur) {
    for (const key of Object.getOwnPropertyNames(cur)) {
      if (seen.has(key)) continue
      seen.add(key)

      const desc = findDesc(raw, key)
      if (!desc) continue

      if (typeof desc.value === 'function') {
        Object.defineProperty(wrapper, key, {
          configurable: true,
          enumerable: false,
          value: desc.value.bind(raw)
        })
        continue
      }

      Object.defineProperty(wrapper, key, {
        configurable: true,
        enumerable: false,
        get: desc.get ? () => desc.get.call(raw) : () => raw[key],
        set: desc.set ? (v) => desc.set.call(raw, v) : (v) => { raw[key] = v }
      })
    }
    cur = Object.getPrototypeOf(cur)
  }
  return wrapper
}

/**
 * Create "standard 1x" wrappers for a (canvas, ctx) pair while keeping backing store at DPR scale.
 *
 * @param {object} params
 * @param {any} params.rawCanvas
 * @param {any} params.rawCtx
 * @param {object} params.state - compat state (logicalWidth/Height, ext, stack)
 * @param {() => number} params.getDpr
 * @param {() => void} params.syncBackingStore - should update rawCanvas backing width/height using state.logical*
 */
export const createCompatWrappers = ({ rawCanvas, rawCtx, state, getDpr, syncBackingStore, rawGetContext }) => {
  const getContextRaw = rawGetContext || (typeof rawCanvas?.getContext === 'function'
    ? rawCanvas.getContext.bind(rawCanvas)
    : null)

  const ctxWrapper = bindAll(Object.create(null), rawCtx, {
    getTransform: () => ({ ...state.ext }),
    setTransform: (a, b, c, d, e, f) => {
      state.ext = { a, b, c, d, e, f }
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    resetTransform: () => {
      state.ext = { ...IDENTITY }
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    transform: (a, b, c, d, e, f) => {
      state.ext = mulAffine(state.ext, { a, b, c, d, e, f })
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    translate: (x, y) => {
      state.ext = mulAffine(state.ext, { a: 1, b: 0, c: 0, d: 1, e: x, f: y })
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    scale: (x, y = x) => {
      state.ext = mulAffine(state.ext, { a: x, b: 0, c: 0, d: y, e: 0, f: 0 })
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    rotate: (angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      state.ext = mulAffine(state.ext, { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 })
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    save: () => {
      state.stack.push({ ...state.ext })
      rawCtx.save()
    },
    restore: () => {
      rawCtx.restore()
      state.ext = state.stack.pop() || { ...IDENTITY }
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    }
  })

  const canvasWrapper = bindAll(Object.create(null), rawCanvas, {
    get width() {
      return state.logicalWidth
    },
    set width(value) {
      state.logicalWidth = Math.max(0, Number(value) || 0)
      syncBackingStore()
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    get height() {
      return state.logicalHeight
    },
    set height(value) {
      state.logicalHeight = Math.max(0, Number(value) || 0)
      syncBackingStore()
      applyCompatTransform(rawCtx, getDpr(), state.ext)
    },
    getContext: (type, options) => {
      const real = getContextRaw ? getContextRaw(type, options) : null
      return type === '2d' ? ctxWrapper : real
    }
  })

  // Ensure ctx.canvas points to wrapper when used by higher-level libs.
  Object.defineProperty(ctxWrapper, 'canvas', {
    configurable: true,
    enumerable: false,
    get() {
      return canvasWrapper
    }
  })

  // Expose raw objects for APIs that require native canvas instances (e.g. Taro canvasToTempFilePath).
  Object.defineProperty(canvasWrapper, '__rawCanvas', {
    configurable: true,
    enumerable: false,
    value: rawCanvas
  })
  Object.defineProperty(ctxWrapper, '__rawCtx', {
    configurable: true,
    enumerable: false,
    value: rawCtx
  })
  Object.defineProperty(ctxWrapper, '__rawCanvas', {
    configurable: true,
    enumerable: false,
    value: rawCanvas
  })

  return { canvas: canvasWrapper, ctx: ctxWrapper }
}

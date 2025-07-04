import {
  BlendMode,
  Skia,
  StrokeCap,
  StrokeJoin,
  TextAlign,
  matchFont,
  PaintStyle
} from '@shopify/react-native-skia'
import { Platform } from 'react-native'
import { defineCanvas } from './types'

export class ContextAttr {
  constructor(canvas) {
    this.canvas = defineCanvas(canvas)
    // 填充属性
    this.paintStroke = Skia.Paint()
    this.paintStroke.setStyle(PaintStyle.Stroke)
    this.paintFill = Skia.Paint()
    this.paintFill.setStyle(PaintStyle.Fill)
    // 临时缓存，需要清理的东西
    this.cache = {
      font: {},
      lineDash: null
    }
    // 字体样式
    this.attr.font = createFont(this.attrOrigin.font, this.cache.font)
  }

  attr = {
    // 线条样式
    lineWidth: 1,
    lineCap: StrokeCap.Butt,
    lineJoin: StrokeJoin.Miter,
    miterLimit: 10,
    lineDash: [],
    lineDashOffset: 0,

    // 颜色和填充
    strokeStyle: Skia.Color('#000'),
    strokeOpacity: null,
    fillStyle: Skia.Color('#000'),
    fillOpacity: null,
    globalAlpha: 1,

    // 文本样式
    font: null,
    textAlign: TextAlign.Start,
    textBaseline: 'alphabetic',
    direction: 'ltr',

    // 混合模式
    globalCompositeOperation: BlendMode.SrcOver,
  }

  // 记录原始值
  attrOrigin = {
    strokeStyle: '#000',
    fillStyle: '#000',
    font: 'sans-serif 12px'
  }

  setAttrs(attr) {
    for (const key in attr) {
      this.setAttr(key, attr[key])
    }
  }

  setAttr(name, value) {
    if (this.attr[name] === value) {
      return
    }
    switch (name) {
      case 'fillStyle': {
        this.paintFill.setColor(value)
        break
      }
      case 'strokeStyle': {
        this.paintStroke.setColor(value)
        break
      }
      case 'lineWidth': {
        this.paintStroke.setStrokeWidth(value)
        break
      }
      case 'lineCap': {
        this.paintStroke.setStrokeCap(value)
        break
      }
      case 'lineJoin': {
        this.paintStroke.setStrokeJoin(value)
        break
      }
      case 'miterLimit': {
        this.paintStroke.setStrokeMiter(value)
        break
      }
      case 'globalAlpha': {
        if (this.attr.strokeOpacity === null) {
          this.paintStroke.setAlphaf(value)
        } else {
          this.paintStroke.setAlphaf(this.attr.strokeOpacity * value)
        }
        if (this.attr.fillOpacity === null) {
          this.paintFill.setAlphaf(value)
        } else {
          this.paintFill.setAlphaf(this.attr.fillOpacity * value)
        }
        break
      }
      case 'strokeOpacity': {
        if (value === null) {
          break
        }
        this.paintStroke.setAlphaf(value * this.attr.globalAlpha)
        break
      }
      case 'fillOpacity': {
        if (value === null) {
          break
        }
        this.paintFill.setAlphaf(value * this.attr.globalAlpha)
        break
      }
      case 'globalCompositeOperation': {
        this.paintStroke.setBlendMode(value)
        this.paintFill.setBlendMode(value)
        break
      }
      case 'lineDash': {
        if (value.length) {
          this.cache.lineDash?.dispose()
          this.cache.lineDash = Skia.PathEffect.MakeDash(value, this.attr.lineDashOffset)
          this.paintStroke.setPathEffect(this.cache.lineDash)
        } else {
          this.paintStroke.setPathEffect(null)
        }
        break
      }
      case 'lineDashOffset': {
        if (!this.attr.lineDash.length) {
          break
        }
        this.cache.lineDash?.dispose()
        this.cache.lineDash = Skia.PathEffect.MakeDash(this.attr.lineDash, value)
        this.paintStroke.setPathEffect(this.cache.lineDash)
        break
      }
      case 'font':
      case 'textAlign':
      case 'textBaseline': {
        break
      }
      default: {
        console.log('不支持的属性:' + name)
        break
      }
    }
    // 赋值
    this.attr[name] = value
  }

  // 线条样式
  get lineWidth() { return this.attr.lineWidth }
  set lineWidth(value) { this.setAttr('lineWidth', value) }

  get lineCap() { return this.getEnumAttr('lineCap') }
  set lineCap(value) { this.setEnumAttr(value, 'lineCap') }

  get lineJoin() { return this.getEnumAttr('lineJoin') }
  set lineJoin(value) { this.setEnumAttr(value, 'lineJoin') }

  get miterLimit() { return this.attr.miterLimit }
  set miterLimit(value) { this.setAttr('miterLimit', value) }

  get lineDashOffset() { return this.attr.lineDashOffset }
  set lineDashOffset(value) { this.setAttr('lineDashOffset', value) }

  // 颜色和填充
  get strokeStyle() { return this.attrOrigin.strokeStyle }
  set strokeStyle(value) {
    if (this.attrOrigin.strokeStyle === value) return
    this.attrOrigin.strokeStyle = value
    const [color, opacity] = normalizeColor(value)
    this.setAttr('strokeStyle', Skia.Color(color))
    this.setAttr('strokeOpacity', opacity)
  }

  get fillStyle() { return this.attrOrigin.fillStyle }
  set fillStyle(value) {
    if (this.attrOrigin.fillStyle === value) {
      return
    }
    this.attrOrigin.fillStyle = value
    const [color, opacity] = normalizeColor(value)
    this.setAttr('fillStyle', Skia.Color(color))
    this.setAttr('fillOpacity', opacity)
  }

  get globalAlpha() { return this.attr.globalAlpha }
  set globalAlpha(value) {
    this.setAttr('globalAlpha', Math.max(0, Math.min(1, value)))
  }

  // 文本样式
  get textAlign() { return this.getEnumAttr('textAlign') }
  set textAlign(value) { this.setEnumAttr(value, 'textAlign') }

  get textBaseline() { return this.attr.textBaseline }
  set textBaseline(value) { this.setAttr('textBaseline', value) }

  get direction() { return this.attr.direction }
  set direction(value) {
    if (value === 'ltr' || value === 'rtl') {
      this.setAttr('direction', value)
    }
  }

  get font() { return this.attrOrigin.font }
  set font(value) {
    if (this.attrOrigin.font === value) return
    this.attrOrigin.font = value
    this.setAttr('font', createFont(value, this.cache.font))
  }

  // 混合模式
  get globalCompositeOperation() { return this.getEnumAttr('globalCompositeOperation') }
  set globalCompositeOperation(value) { this.setEnumAttr(value, 'globalCompositeOperation') }

  // --- Line dash ---
  setLineDash(value) {
    this.setAttr('lineDash', Array.isArray(value) ? value : [])
  }

  getLineDash() {
    return this.attr.lineDash
  }

  // 辅助方法
  getEnumAttr(name) {
    const value = this.attr[name]
    for (const key in enums[name]) {
      if (enums[name][key] === value) {
        return key
      }
    }
    throw new Error(`读取无效的属性${name}`)
  }

  setEnumAttr(value, name) {
    const val = enums[name][value]
    if (typeof val !== 'undefined') {
      this.setAttr(name, val)
    } else {
      throw new Error(`无效的${name}属性：${value}`)
    }
  }
}

const enums = {
  // 1. 路径与描边样式
  lineCap: {
    butt: StrokeCap.Butt,
    round: StrokeCap.Round,
    square: StrokeCap.Square
  },
  lineJoin: {
    miter: StrokeJoin.Miter,
    round: StrokeJoin.Round,
    bevel: StrokeJoin.Bevel
  },

  // 2. 文本样式
  textAlign: {
    left: TextAlign.Left,
    right: TextAlign.Right,
    center: TextAlign.Center,
    start: TextAlign.Start,
    end: TextAlign.End
  },
  direction: {
    ltr: 'ltr',
    rtl: 'rtl'
  },

  // 3. 混合模式
  globalCompositeOperation: {
    'source-over': BlendMode.SrcOver,
    'source-in': BlendMode.SrcIn,
    'source-out': BlendMode.SrcOut,
    'source-atop': BlendMode.SrcATop,
    'destination-over': BlendMode.DstOver,
    'destination-in': BlendMode.DstIn,
    'destination-out': BlendMode.DstOut,
    'destination-atop': BlendMode.DstATop,
    lighter: BlendMode.Plus,
    copy: BlendMode.Src,
    xor: BlendMode.Xor,
    multiply: BlendMode.Multiply,
    screen: BlendMode.Screen,
    overlay: BlendMode.Overlay,
    darken: BlendMode.Darken,
    lighten: BlendMode.Lighten,
    'color-dodge': BlendMode.ColorDodge,
    'color-burn': BlendMode.ColorBurn,
    'hard-light': BlendMode.HardLight,
    'soft-light': BlendMode.SoftLight,
    difference: BlendMode.Difference,
    exclusion: BlendMode.Exclusion,
    hue: BlendMode.Hue,
    saturation: BlendMode.Saturation,
    color: BlendMode.Color,
    luminosity: BlendMode.Luminosity
  },

  // 4. 图像平滑质量
  imageSmoothingQuality: {
    low: 'low',
    medium: 'medium',
    high: 'high'
  }
}

function parseFont(font) {
  const regex = /^(italic|oblique)?\s*(bold|bolder|lighter|\d{3})?\s*(\d+)px\s*(.+)$/
  const match = font.match(regex) || []
  const fontStyle = match[1] || 'normal'
  const fontWeight = match[2] || 'normal'
  const fontSize = match[3] ? parseInt(match[3]) : 16
  const fontFamily = getSafeFontFamily(match[4])
  const key = `${fontStyle}-${fontWeight}-${fontSize}-${fontFamily}`
  return {
    style: {
      fontStyle,
      fontWeight,
      fontSize,
      fontFamily
    },
    key
  }
}

let cachedSystemFonts = null

function getSafeFontFamily(userFontFamily) {
  const systemFonts = getCachedSystemFonts()

  if (userFontFamily && systemFonts.includes(userFontFamily)) {
    return userFontFamily
  }

  return getPlatformDefaultFont(systemFonts)
}

function getCachedSystemFonts() {
  if (!cachedSystemFonts) {
    const fontMgr = Skia.FontMgr.System()
    cachedSystemFonts = Array.from(
      { length: fontMgr.countFamilies() },
      (_, i) => fontMgr.getFamilyName(i)
    )
  }
  return cachedSystemFonts
}

function getPlatformDefaultFont(availableFonts) {
  const platformPriority = {
    ios: ['San Francisco', 'Helvetica Neue', 'Arial'],
    android: ['Roboto', 'Noto Sans', 'Droid Sans', 'Arial'],
    windows: ['Segoe UI', 'Arial'],
    default: ['Arial', 'Helvetica']
  }

  const priorityList = platformPriority[Platform.OS] || platformPriority.default

  return priorityList.find(font => availableFonts.includes(font)) || 'Arial'
}

/**
 * 将颜色字符串转换为 Skia 兼容格式
 * - 支持 `rgb(255, 0, 0)` → `[1, 0, 0, 1]`
 * - 支持 `rgba(255, 0, 0, 0.5)` → `[1, 0, 0, 0.5]`
 * - 其他字符串（如十六进制、颜色名称）原样返回
 */
function normalizeColor(color) {
  if (Array.isArray(color)) return color

  // 处理 rgba 字符串
  const rgbaMatch = color.match(
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([01]?\.\d+|0|1)\s*\)$/i
  )

  if (rgbaMatch) {
    return [`rgb(${rgbaMatch.slice(1, 4).join(',')})`, +rgbaMatch[4]]
  }

  return [color, null]
}

/**
 * 创建字体如果，如果有缓存，返回缓存
 * @param {*} font
 * @param {*} fonts
 * @returns
 */
function createFont(font, fonts) {
  const { key, style } = parseFont(font)
  if (!fonts[key]) {
    fonts[key] = matchFont(style)
  }
  return fonts[key]
}

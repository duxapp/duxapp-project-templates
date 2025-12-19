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
import { CanvasGradient } from './Gradient'
import { CanvasPattern } from './Pattern'
import { defineCanvas } from './types'

export class ContextAttr {
  constructor(canvas) {
    this.canvas = defineCanvas(canvas)
    // 填充属性
    this.paintFill = Skia.Paint()
    this.paintStroke = Skia.Paint()
    this.paintStroke.setStyle(PaintStyle.Stroke)
    this.paintImage = Skia.Paint()
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
    // strokeOpacity: null,
    fillStyle: Skia.Color('#000'),
    // fillOpacity: null,
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
    const isStyle = name === 'fillStyle' || name === 'strokeStyle'
    if (!isStyle && this.attr[name] === value) {
      return
    }
    switch (name) {
      case 'fillStyle': {
        if (value instanceof CanvasGradient) {
          // 渐变填充
          value.applyToPaint(this.paintFill)
        } else if (value instanceof CanvasPattern) {
          // 图案填充
          value.applyToPaint(this.paintFill)
        } else if (value) {
          // 纯色填充，清除之前的 shader
          this.paintFill.setShader(null)
          this.paintFill.setColor(value)
        }
        break
      }
      case 'strokeStyle': {
        if (value instanceof CanvasGradient) {
          // 渐变描边
          value.applyToPaint(this.paintStroke)
        } else if (value instanceof CanvasPattern) {
          // 图案描边
          value.applyToPaint(this.paintStroke)
        } else {
          // 纯色描边，清除之前的 shader
          this.paintStroke.setShader(null)
          this.paintStroke.setColor(value)
        }
        break
      }
      // case 'fillOpacity': {
      //   if (value === null) {
      //     this.paintFill.setAlphaf(this.attr.globalAlpha)
      //     break
      //   }
      //   this.paintFill.setAlphaf(value * this.attr.globalAlpha)
      //   break
      // }
      // case 'strokeOpacity': {
      //   if (value === null) {
      //     this.paintStroke.setAlphaf(this.attr.globalAlpha)
      //     break
      //   }
      //   this.paintStroke.setAlphaf(value * this.attr.globalAlpha)
      //   break
      // }
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
        this.paintStroke.setAlphaf(value)
        this.paintFill.setAlphaf(value)
        this.paintImage.setAlphaf(value)
        // if (this.attr.strokeOpacity === null) {
        //   this.paintStroke.setAlphaf(value)
        // } else {
        //   this.paintStroke.setAlphaf(this.attr.strokeOpacity * value)
        // }
        // if (this.attr.fillOpacity === null) {
        //   this.paintFill.setAlphaf(value)
        // } else {
        //   this.paintFill.setAlphaf(this.attr.fillOpacity * value)
        // }
        // this.paintImage.setAlphaf(value)
        break
      }
      case 'globalCompositeOperation': {
        this.paintStroke.setBlendMode(value)
        this.paintFill.setBlendMode(value)
        this.paintImage.setBlendMode(value)
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
    // const [color, opacity] = normalizeColor(value)
    this.setAttr('strokeStyle', normalizeColor(value))
    // this.setAttr('strokeOpacity', opacity)
  }

  get fillStyle() { return this.attrOrigin.fillStyle }
  set fillStyle(value) {
    if (this.attrOrigin.fillStyle === value) {
      return
    }
    this.attrOrigin.fillStyle = value
    // const [color, opacity] = normalizeColor(value)
    this.setAttr('fillStyle', normalizeColor(value))
    // this.setAttr('fillOpacity', opacity)
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
  const sizeMatch = font.match(/(\d+(?:\.\d+)?)px/i)
  const fontSize = sizeMatch ? parseFloat(sizeMatch[1]) : 16

  // 解析 size 前面的可选样式/粗细（顺序灵活）
  let fontStyle = 'normal'
  let fontWeight = 'normal'
  const leadingFamilyTokens = []
  if (sizeMatch && sizeMatch.index > 0) {
    const tokens = font.slice(0, sizeMatch.index).trim().split(/\s+/).filter(Boolean)
    tokens.forEach(token => {
      const lower = token.toLowerCase()
      if (lower === 'italic' || lower === 'oblique' || lower === 'normal') {
        fontStyle = lower
      } else if (lower === 'bold' || lower === 'bolder' || lower === 'lighter' || /^\d{3}$/.test(lower) || lower === 'normal') {
        fontWeight = lower
      } else {
        leadingFamilyTokens.push(token)
      }
    })
  }

  // 解析字号后的 font-family 列表，按逗号优先级选择可用字体
  let familyStr = ''
  if (sizeMatch) {
    familyStr = font.slice(sizeMatch.index + sizeMatch[0].length).trim()
  }
  const familyList = []
  familyStr.replace(/"([^"]+)"|'([^']+)'|([^,]+)/g, (_, d1, d2, d3) => {
    const name = (d1 || d2 || d3 || '').trim()
    if (name) {
      familyList.push(name)
    }
    return ''
  })

  const fontFamilyCandidates = [...leadingFamilyTokens, ...familyList]
  const fontFamily = getSafeFontFamily(fontFamilyCandidates.length ? fontFamilyCandidates : '')
  // const key = `${fontStyle}-${fontWeight}-${fontSize}-${fontFamily}`
  return {
    fontStyle,
    fontWeight,
    fontSize,
    fontFamily
  }
}

let cachedSystemFonts = null

function getSafeFontFamily(userFontFamily) {
  const systemFonts = getCachedSystemFonts()

  if (Array.isArray(userFontFamily)) {
    for (const name of userFontFamily) {
      const normalized = name.trim()
      if (normalized && systemFonts.includes(normalized)) {
        return normalized
      }
    }
  } else if (userFontFamily && systemFonts.includes(userFontFamily)) {
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
 */
function normalizeColor(color) {
  if (typeof color === 'string') {
    return Skia.Color(color)
  }
  return color
}

/**
 * 创建字体如果，如果有缓存，返回缓存
 * @param {*} font
 * @param {*} fonts
 * @returns
 */
function createFont(font, fonts) {
  if (!fonts[font]) {
    fonts[font] = matchFont(parseFont(font))
  }
  return fonts[font]
}

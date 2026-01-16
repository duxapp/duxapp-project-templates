import { Skia } from '@shopify/react-native-skia'

export class Path2D {
  constructor(path) {
    this._path = Skia.Path.Make()
    this._moveToStatus = false
    if (path) {
      this._init(path)
    }
  }

  _init(path) {
    if (path instanceof Path2D) {
      const source = path.getPath()
      if (source) {
        this._path.addPath(source)
        this._moveToStatus = true
      }
      return
    }

    if (typeof path === 'string') {
      const svgPath = Skia.Path.MakeFromSVGString(path)
      if (svgPath) {
        this._path.addPath(svgPath)
        this._moveToStatus = true
        svgPath.dispose?.()
      }
      return
    }

    if (path?.addPath && path?.moveTo) {
      this._path.addPath(path)
      this._moveToStatus = true
    }
  }

  _createMatrix(transform) {
    if (!transform) {
      return null
    }

    let a
    let b
    let c
    let d
    let e
    let f

    if (Array.isArray(transform)) {
      if (transform.length >= 6) {
        [a, b, c, d, e, f] = transform
      }
    } else if (typeof transform === 'object') {
      ({ a, b, c, d, e, f } = transform)
    }

    a = Number(a)
    b = Number(b)
    c = Number(c)
    d = Number(d)
    e = Number(e)
    f = Number(f)

    if (![a, b, c, d, e, f].every(Number.isFinite)) {
      return null
    }

    return Skia.Matrix([
      a, c, e,
      b, d, f,
      0, 0, 1
    ])
  }

  getPath() {
    return this._path
  }

  reset() {
    this._path.reset()
    this._moveToStatus = false
  }

  dispose() {
    this._path?.dispose?.()
    this._path = null
    this._moveToStatus = false
  }

  addPath(path, transform) {
    const source = path instanceof Path2D
      ? path.getPath()
      : path

    if (!source) {
      return
    }

    const matrix = this._createMatrix(transform)
    if (matrix) {
      this._path.addPath(source, matrix, false)
      matrix.dispose?.()
    } else {
      this._path.addPath(source)
    }
    this._moveToStatus = true
  }

  closePath() {
    this._path.close()
    if (this._path) {
      this._moveToStatus = true
    }
  }

  moveTo(x, y) {
    this._path.moveTo(x, y)
    this._moveToStatus = true
  }

  lineTo(x, y) {
    if (!this._moveToStatus) {
      this.moveTo(x, y)
    } else {
      this._path.lineTo(x, y)
    }
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    const r = Number(radius) || 0

    // Chart.js 在 pie（innerRadius=0）时会调用 `arc(..., 0, ...)` 来回到圆心。
    // Skia 的 addArc 在 r=0 时不会形成有效轮廓，最终只会得到“圆弧 + 弦”的形状。
    if (r <= 0) {
      if (!this._moveToStatus) {
        this.moveTo(x, y)
      } else {
        this.lineTo(x, y)
      }
      return
    }

    // 兼容 CanvasRenderingContext2D.arc 的方向语义：
    // - 角度按弧度输入；正方向为顺时针（屏幕坐标系下 y 轴向下）
    // - anticlockwise=true 时沿逆时针方向走到 endAngle
    const TAU = Math.PI * 2
    let delta = endAngle - startAngle
    if (!Number.isFinite(delta)) {
      delta = 0
    }
    if (!anticlockwise && delta < 0) {
      delta = delta % TAU + TAU
    } else if (anticlockwise && delta > 0) {
      delta = delta % TAU - TAU
    }
    if (delta > TAU) delta = TAU
    if (delta < -TAU) delta = -TAU

    const sweepDeg = delta * (180 / Math.PI)
    const startDeg = startAngle * (180 / Math.PI)
    const rect = Skia.XYWHRect(x - r, y - r, r * 2, r * 2)

    const arcPath = Skia.Path.Make()
    arcPath.addArc(
      rect,
      startDeg,
      sweepDeg
    )

    // Canvas arc 语义：如果当前子路径已有点，则会连接到圆弧起点；否则相当于 moveTo 到起点。
    // Skia 的 addArc 是独立轮廓，这里通过 addPath(extend=true) 模拟连接行为。
    const identity = Skia.Matrix([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ])
    this._path.addPath(arcPath, identity, !!this._moveToStatus)
    identity.dispose?.()
    this._moveToStatus = true

    arcPath.dispose()
    rect.dispose()
  }

  arcTo(x1, y1, x2, y2, radius) {
    this._path.arcToTangent(x1, y1, x2, y2, radius)
    this._moveToStatus = true
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this._path.cubicTo(cp1x, cp1y, cp2x, cp2y, x, y)
    this._moveToStatus = true
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this._path.quadTo(cpx, cpy, x, y)
    this._moveToStatus = true
  }

  rect(x, y, width, height) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this._path.addRect(rect)
    rect.dispose()
    this._moveToStatus = true
  }

  roundRect(x, y, width, height, radii) {
    const rect = Skia.XYWHRect(x, y, width, height)
    this._path.addRRect(Skia.RRectXY(rect, radii, radii))
    rect.dispose()
    this._moveToStatus = true
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    const unitPath = Skia.Path.Make()
    const rect = Skia.XYWHRect(-1, -1, 2, 2) // 单位圆
    const sweepDeg = (endAngle - startAngle) * (180 / Math.PI)
    const startDeg = startAngle * (180 / Math.PI)

    unitPath.addArc(
      rect,
      startDeg,
      anticlockwise ? -sweepDeg : sweepDeg
    )

    rect.dispose()

    const cos = Math.cos(rotation)
    const sin = Math.sin(rotation)
    // T(x,y) * R(rotation) * S(rx, ry)
    const matrix = Skia.Matrix([
      cos * radiusX, -sin * radiusY, x,
      sin * radiusX, cos * radiusY, y,
      0, 0, 1
    ])

    this._path.addPath(unitPath, matrix)
    matrix.dispose?.()
    unitPath.dispose()
    this._moveToStatus = true
  }
}

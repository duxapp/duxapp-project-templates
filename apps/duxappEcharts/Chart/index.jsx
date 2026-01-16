import { Canvas, defineCanvasRef } from '@/duxappCanvas'
import { View } from '@tarojs/components'
import { use, init, setPlatformAPI } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useMemo, useRef } from 'react'
import './index.scss'

const defaultOption = {}

export const Chart = ({ option = defaultOption, components = [], onInit, className, style }) => {

  const refs = useRef({})
  refs.current.onInit = onInit

  const isH5 = process.env.TARO_ENV === 'h5'
  const containerRef = useRef(null)
  const canvasRef = useRef(defineCanvasRef())
  const chartRef = useRef(null)
  const initOptionRef = useRef(option)
  const events = useMemo(() => createEvents(), [])

  const rootClassName = useMemo(() => (
    ['chart-component', className].filter(Boolean).join(' ')
  ), [className])

  const eventProps = useMemo(() => {
    if (!events) return null
    return {
      onTouchStart: events.touchstart,
      onTouchMove: events.touchmove,
      onTouchEnd: events.touchend,
      onClick: events.click
    }
  }, [events])

  setComponents([...components, CanvasRenderer])

  useEffect(() => {
    initOptionRef.current = option
  }, [option])

  useEffect(() => {
    if (isH5) {
      return
    }
    let canceled = false

    canvasRef.current.getCanvas().then(({ canvas, size: canvasSize }) => {
      if (canceled) return
      const width = canvasSize?.width
      const height = canvasSize?.height

      if (!chartRef.current) {
        const ctx = canvas.getContext('2d')
        const chartCanvas = new EchartsCanvas(ctx, canvas, events)
        setPlatformAPI({ createCanvas: () => chartCanvas })

        const chart = init(chartCanvas, 'light', {
          renderer: 'canvas',
          width,
          height,
          devicePixelRatio: 1
        })
        chartCanvas.setChart?.(chart)
        chartRef.current = chart
        chart.setOption(initOptionRef.current)
        refs.current.onInit?.(chart, { canvas: chartCanvas })
        return
      }

      chartRef.current.resize({ width, height })
    }).catch(() => {
      // getCanvas may reject on same size; reuse existing chart instance.
    })

    return () => {
      canceled = true
    }
  }, [events, isH5])

  useEffect(() => {
    if (!isH5) {
      return
    }
    const container = containerRef.current
    if (!container) {
      return
    }

    const updateSize = () => {
      if (!chartRef.current) {
        return
      }
      const rect = container.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        return
      }
      chartRef.current.resize({ width: rect.width, height: rect.height })
    }

    if (!chartRef.current) {
      const rect = container.getBoundingClientRect()
      const chart = init(container, 'light', {
        renderer: 'canvas',
        width: rect.width,
        height: rect.height,
        devicePixelRatio: 1
      })
      chartRef.current = chart
      chart.setOption(initOptionRef.current)
      refs.current.onInit?.(chart, { canvas: null })
    } else {
      updateSize()
    }

    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [isH5])

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.setOption(option)
  }, [option])

  useEffect(() => {
    return () => {
      chartRef.current?.dispose?.()
      chartRef.current = null
    }
  }, [])

  return <View
    className={rootClassName}
    style={style}
    ref={containerRef}
  >
    {isH5 ? null : (
      <Canvas
        className='w-full h-full'
        ref={canvasRef}
        picture
        {...eventProps}
      />
    )}
  </View>
}

const setComponents = (() => {
  const list = []
  return (_list = []) => {
    const res = _list.filter(v => !list.includes(v))
    if (res.length) {
      use(res)
      list.push(...res)
    }
  }
})()

const createEvents = () => {
  const callbacks = {}
  const target = (name, e) => {
    if (!callbacks[name]) return
    callbacks[name].forEach(cb => cb(e))
  }
  return {
    click: e => target('click', e),
    touchstart: e => target('touchstart', e),
    touchmove: e => target('touchmove', e),
    touchend: e => target('touchend', e),
    addEventListener: (type, callback) => {
      if (!callbacks[type]) {
        callbacks[type] = []
      }
      callbacks[type].push(callback)
    }
  }
}

class EchartsCanvas {
  constructor(ctx, canvasNode, events) {
    this.ctx = ctx
    this.chart = null
    this.events = events
    this.canvasNode = canvasNode
    this._initEvent()
  }

  getContext(contextType) {
    if (contextType === '2d') {
      return this.ctx
    }
  }

  setChart(chart) {
    this.chart = chart
  }

  addEventListener() {
    // noop
  }

  removeEventListener() {
    // noop
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  _initEvent() {
    const eventNames = [
      {
        wxName: 'touchstart',
        ecName: ['mousedown', 'mousemove']
      },
      {
        wxName: 'touchmove',
        ecName: ['mousemove']
      },
      {
        wxName: 'touchend',
        ecName: ['mouseup', 'click']
      }
    ]
    eventNames.forEach((name) => {
      this.events.addEventListener(name.wxName, (e) => {
        if (this.chart) {
          const touch = e.changedTouches[0]
          name.ecName.forEach(ecName => {
            this.chart.getZr().handler.dispatch(ecName, {
              zrX: touch.x,
              zrY: touch.y,
              preventDefault: () => { },
              stopImmediatePropagation: () => { },
              stopPropagation: () => { }
            })
          })
        }
      })
    })
  }

  set width(w) {
    if (this.canvasNode) this.canvasNode.width = w
  }

  set height(h) {
    if (this.canvasNode) this.canvasNode.height = h
  }

  get width() {
    if (this.canvasNode) return this.canvasNode.width
    return 0
  }

  get height() {
    if (this.canvasNode) return this.canvasNode.height
    return 0
  }
}

import { Canvas, defineCanvasRef } from '@/duxappCanvas'
import { BasicPlatform, Chart as ChartJS } from 'chart.js'
import { useEffect, useMemo, useRef } from 'react'
import { View } from '@tarojs/components'

export const Chart = ({ config, style, className, onInit }) => {
  const canvasRef = useRef(defineCanvasRef())
  const chartRef = useRef(null)
  const ctxRef = useRef(null)
  const sizeRef = useRef(null)
  const initConfigRef = useRef(null)

  const normalizedConfig = useMemo(() => {
    if (!config) return null
    return {
      ...config,
      platform: config.platform || BasicPlatform,
      options: {
        responsive: false,
        ...(config.options || {})
      }
    }
  }, [config])

  useEffect(() => {
    initConfigRef.current = normalizedConfig
  }, [normalizedConfig])

  useEffect(() => {
    if (!initConfigRef.current) {
      return
    }

    let canceled = false

    canvasRef.current.getCanvas().then(({ canvas, size }) => {
      if (canceled) return
      const ctx = canvas.getContext('2d')
      ctxRef.current = { canvas, ctx }
      sizeRef.current = size
      if (!chartRef.current) {
        chartRef.current = new ChartJS(canvas, initConfigRef.current)
        onInit?.(chartRef.current, { canvas, ctx })
      } else {
        // 避免在数据刷新时触发 resize（小程序端可能会被 Chart.js 改写 canvas 尺寸导致视觉“放大”）
        if (chartRef.current.width !== size.width || chartRef.current.height !== size.height) {
          chartRef.current.resize(size.width, size.height)
        }
      }
    }).catch(() => {
      // 某些端 getCanvas 在尺寸未变化时会 reject（用于防止二次缩放），这里复用已创建的 chart
    })

    return () => {
      canceled = true
    }
  }, [onInit])

  useEffect(() => {
    if (!chartRef.current || !normalizedConfig) return
    const chart = chartRef.current

    // 不要覆盖 chart.config（它是 Chart.js 内部 Config 实例），否则会导致 `config.update/clearCache` 丢失。
    const nextType = normalizedConfig.type
    const curType = chart.config?.type
    const shouldRecreate = nextType && curType && nextType !== curType

    if (shouldRecreate) {
      const ctx = ctxRef.current?.ctx
      const canvas = ctxRef.current?.canvas
      if (!ctx) return
      chart.destroy()
      chartRef.current = new ChartJS(canvas, normalizedConfig)
      onInit?.(chartRef.current, { canvas, ctx })
      return
    }

    if (normalizedConfig.data) {
      mergeChartData(chart.data, normalizedConfig.data)
    }
    if (normalizedConfig.options) {
      chart.options = normalizedConfig.options
    }
    if (normalizedConfig.plugins) {
      chart.config.plugins = normalizedConfig.plugins
    }

    chart.update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedConfig])

  useEffect(() => {
    return () => {
      chartRef.current?.destroy?.()
      chartRef.current = null
      ctxRef.current = null
    }
  }, [])

  const dispatchChartEvent = (type, event, nativeType) => {
    const chart = chartRef.current
    if (!chart) return

    const point = getEventPoint(event, sizeRef.current)
    if (!point) return

    chart._eventHandler?.({
      type,
      native: nativeType ? { ...event, type: nativeType } : event,
      x: point.x,
      y: point.y
    })
  }

  return <View className={className} style={style}>
    <Canvas
      ref={canvasRef}
      picture
      className='w-full h-full'
      onTouchStart={event => dispatchChartEvent('mousedown', event)}
      onTouchMove={event => dispatchChartEvent('mousemove', event)}
      onTouchEnd={event => {
        dispatchChartEvent('mouseup', event)
        dispatchChartEvent('click', event, 'click')
      }}
      onTouchCancel={event => dispatchChartEvent('mouseout', event, 'mouseout')}
    />
  </View>
}

function mergeChartData(target, next) {
  if (!target || !next) return

  if ('labels' in next) {
    target.labels = next.labels
  }

  const nextDatasets = next.datasets || []
  if (!Array.isArray(target.datasets)) {
    target.datasets = []
  }

  for (let i = 0; i < nextDatasets.length; i++) {
    const cur = target.datasets[i]
    const nd = nextDatasets[i]
    if (!cur) {
      target.datasets[i] = nd
      continue
    }
    Object.assign(cur, nd)
  }

  if (target.datasets.length > nextDatasets.length) {
    target.datasets.length = nextDatasets.length
  }
}

function getEventPoint(event, rect) {
  const touch = event?.changedTouches?.[0] || event?.touches?.[0]
  const detail = event?.detail

  const directPoint = pickPoint(touch) || pickPoint(detail)
  if (directPoint) return directPoint

  const absolutePoint = pickAbsolutePoint(touch)
  if (!absolutePoint || !rect) return null
  const offsetX = toNumber(rect.x) ?? 0
  const offsetY = toNumber(rect.y) ?? 0

  return {
    x: absolutePoint.x - offsetX,
    y: absolutePoint.y - offsetY
  }
}

function pickPoint(source) {
  if (!source) return null
  const x = toNumber(source.x)
  const y = toNumber(source.y)
  if (!isValidNumber(x) || !isValidNumber(y)) return null
  return { x, y }
}

function pickAbsolutePoint(source) {
  if (!source) return null
  const x = toNumber(source.pageX ?? source.clientX)
  const y = toNumber(source.pageY ?? source.clientY)
  if (!isValidNumber(x) || !isValidNumber(y)) return null
  return { x, y }
}

function toNumber(value) {
  if (typeof value === 'number') return value
  if (value === null || value === undefined || value === '') return null
  const num = Number(value)
  return Number.isNaN(num) ? null : num
}

function isValidNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

import { use, init } from 'echarts/core'
import { Echarts, EchartsRenderer } from 'taro-charts'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getWindowInfo, Layout } from '@/duxapp'
import { Canvas } from './canvas'
import './index.scss'

const defaultOption = {}

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

let canvasId = 0

export const Chart = ({ option = defaultOption, components, onInit, className, style }) => {

  const id = useMemo(() => 'chart-' + canvasId++, [])

  setComponents([...components, EchartsRenderer])

  const chart = useRef(null)

  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    chart.current?.setOption?.(option)
  }, [option])

  useEffect(() => {
    return () => {
      if (process.env.TARO_ENV !== 'weapp') {
        chart.current?.dispose()
      }
    }
  }, [])

  return <Layout className={`${className} chart-component`} style={style} onLayout={setSize}>
    {size.height > 0 && <Echarts
      RNRenderType='svg'
      canvasId={id}
      style={{ height: size.height, width: size.width }}
      onContextCreate={canvas => {
        const charts = init(canvas, 'light', {
          renderer: 'svg',
          width: size.width,
          height: size.height,
          devicePixelRatio: getWindowInfo().pixelRatio
        })
        canvas.setChart?.(charts)
        charts.setOption(option)
        chart.current = charts
        onInit?.(charts)
      }}
    />}

    {process.env.TARO_PLATFORM === 'mini' && <Canvas style={{ display: 'none' }} />}
  </Layout>
}

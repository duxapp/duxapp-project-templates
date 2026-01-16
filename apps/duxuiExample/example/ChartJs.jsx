import { Chart } from '@/duxappChartJs'
import { Header, ScrollView, TopView, GroupList, px } from '@/duxuiExample'
import {
  Chart as ChartJS,
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Tooltip
} from 'chart.js'
import { useEffect, useMemo, useState } from 'react'

let registered = false
const ensureRegister = () => {
  if (registered) return
  ChartJS.register(
    ArcElement,
    BarController,
    BarElement,
    BubbleController,
    CategoryScale,
    DoughnutController,
    Filler,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PieController,
    PointElement,
    PolarAreaController,
    RadarController,
    RadialLinearScale,
    ScatterController,
    Tooltip
  )
  registered = true
}

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const pieLabels = ['A', 'B', 'C', 'D', 'E']
const radarLabels = ['Speed', 'Power', 'Skill', 'Stamina', 'Luck']

const randomData = () => labels.map(() => Math.round(Math.random() * 300))
const randomInt = (min, max) => Math.round(min + Math.random() * (max - min))

const palette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316']
const sliceColors = (count) => Array.from({ length: count }, (_, i) => palette[i % palette.length])
const commonOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  }
}

export default function ChartJsExample() {
  ensureRegister()

  const [version, setVersion] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVersion(v => v + 1)
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  const barConfig = useMemo(() => {
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '销量',
            data: randomData(),
            backgroundColor: '#3b82f6'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const horizontalBarConfig = useMemo(() => {
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '对比',
            data: randomData(),
            backgroundColor: '#10b981'
          }
        ]
      },
      options: {
        ...commonOptions,
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const lineConfig = useMemo(() => {
    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '访问量',
            data: randomData(),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.2)',
            tension: 0.35,
            fill: true,
            pointRadius: 2
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const mixedConfig = useMemo(() => {
    const data1 = randomData()
    const data2 = randomData()
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: '销量',
            data: data1,
            backgroundColor: 'rgba(59,130,246,0.7)'
          },
          {
            type: 'line',
            label: '趋势',
            data: data2,
            borderColor: '#ef4444',
            tension: 0.35,
            pointRadius: 2
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const pieConfig = useMemo(() => {
    const values = pieLabels.map(() => randomInt(10, 100))
    return {
      type: 'pie',
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: values,
            backgroundColor: sliceColors(pieLabels.length),
            borderWidth: 0
          }
        ]
      },
      options: {
        ...commonOptions
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const doughnutConfig = useMemo(() => {
    const values = pieLabels.map(() => randomInt(10, 100))
    return {
      type: 'doughnut',
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: values,
            backgroundColor: sliceColors(pieLabels.length),
            borderWidth: 0
          }
        ]
      },
      options: {
        ...commonOptions,
        cutout: '60%'
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const radarConfig = useMemo(() => {
    return {
      type: 'radar',
      data: {
        labels: radarLabels,
        datasets: [
          {
            label: '能力',
            data: radarLabels.map(() => randomInt(20, 100)),
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.25)',
            pointRadius: 2
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          r: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const polarAreaConfig = useMemo(() => {
    return {
      type: 'polarArea',
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: pieLabels.map(() => randomInt(10, 100)),
            backgroundColor: sliceColors(pieLabels.length),
            borderWidth: 0
          }
        ]
      },
      options: {
        ...commonOptions
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const scatterConfig = useMemo(() => {
    const points = Array.from({ length: 25 }, () => ({ x: randomInt(0, 100), y: randomInt(0, 100) }))
    return {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: '散点',
            data: points,
            backgroundColor: '#06b6d4'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          x: { type: 'linear', position: 'bottom', beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const bubbleConfig = useMemo(() => {
    const points = Array.from({ length: 20 }, () => ({
      x: randomInt(0, 100),
      y: randomInt(0, 100),
      r: randomInt(3, 14)
    }))
    return {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: '气泡',
            data: points,
            backgroundColor: 'rgba(245,158,11,0.55)'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          x: { type: 'linear', position: 'bottom', beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  return <TopView>
    <Header title='Chart.js' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='柱状图'>
          <Chart style={{ height: px(360) }} config={barConfig} />
        </GroupList.Item>
        <GroupList.Item title='横向柱状图'>
          <Chart style={{ height: px(360) }} config={horizontalBarConfig} />
        </GroupList.Item>
        <GroupList.Item title='折线图'>
          <Chart style={{ height: px(360) }} config={lineConfig} />
        </GroupList.Item>
        <GroupList.Item title='混合图（柱状 + 折线）'>
          <Chart style={{ height: px(360) }} config={mixedConfig} />
        </GroupList.Item>
        <GroupList.Item title='饼图'>
          <Chart style={{ height: px(360) }} config={pieConfig} />
        </GroupList.Item>
        <GroupList.Item title='环形图'>
          <Chart style={{ height: px(360) }} config={doughnutConfig} />
        </GroupList.Item>
        <GroupList.Item title='雷达图'>
          <Chart style={{ height: px(420) }} config={radarConfig} />
        </GroupList.Item>
        <GroupList.Item title='极坐标面积图'>
          <Chart style={{ height: px(420) }} config={polarAreaConfig} />
        </GroupList.Item>
        <GroupList.Item title='散点图'>
          <Chart style={{ height: px(420) }} config={scatterConfig} />
        </GroupList.Item>
        <GroupList.Item title='气泡图'>
          <Chart style={{ height: px(420) }} config={bubbleConfig} />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

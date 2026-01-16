import { useEffect, useMemo, useState } from 'react'
import { Chart } from '@/duxappEcharts'
import { Header, ScrollView, TopView, GroupList, px } from '@/duxuiExample'

import {
  PieChart,
  LineChart,
  BarChart,
  ScatterChart
} from 'echarts/charts'

import {
  TooltipComponent,
  GridComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const palette = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452']

const rand = (min, max) => Math.round(min + Math.random() * (max - min))
const randomArray = (count, min, max) => Array.from({ length: count }, () => rand(min, max))
const randomPie = (labels) => labels.map(name => ({ name, value: rand(120, 1200) }))
const randomScatter = (count) => Array.from({ length: count }, () => [rand(0, 100), rand(0, 100)])

const createData = () => ({
  line: randomArray(categories.length, 120, 280),
  area: randomArray(categories.length, 80, 220),
  bar: randomArray(categories.length, 60, 200),
  stackA: randomArray(categories.length, 30, 120),
  stackB: randomArray(categories.length, 20, 100),
  pie: randomPie(['Search', 'Direct', 'Email', 'Union', 'Video']),
  donut: randomPie(['Chrome', 'Safari', 'Edge', 'Firefox']),
  scatter: randomScatter(20)
})

export default function CellExample() {
  const [data, setData] = useState(() => createData())
  const chartHeight = px(400)

  useEffect(() => {
    const timer = setInterval(() => {
      setData(createData())
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const options = useMemo(() => {
    const compactGrid = {
      top: 24,
      right: 16,
      bottom: 24,
      left: 16,
      containLabel: true
    }
    return {
      line: {
        color: [palette[0]],
        grid: compactGrid,
        xAxis: {
          type: 'category',
          data: categories
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.line,
            type: 'line',
            smooth: true,
            lineStyle: { color: palette[0] },
            itemStyle: { color: palette[0] }
          }
        ]
      },
      bar: {
        color: [palette[2]],
        grid: compactGrid,
        xAxis: {
          type: 'category',
          data: categories
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.bar,
            type: 'bar',
            itemStyle: { color: palette[2] }
          }
        ]
      },
      scatter: {
        color: [palette[5]],
        grid: compactGrid,
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'scatter',
            data: data.scatter,
            itemStyle: { color: palette[5] }
          }
        ]
      },
      pie: {
        color: palette,
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center',
          top: 4
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 4,
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '65%',
            center: ['50%', '58%'],
            data: data.pie,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      donut: {
        color: palette,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 4,
          left: 'center'
        },
        series: [
          {
            name: 'Browsers',
            type: 'pie',
            radius: ['45%', '75%'],
            center: ['50%', '58%'],
            avoidLabelOverlap: false,
            data: data.donut,
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 18,
                fontWeight: 'bold'
              }
            }
          }
        ]
      }
    }
  }, [data])

  return <TopView>
    <Header title='Echarts' />
    <ScrollView>
      <GroupList style={{ margin: px(12), gap: px(12) }}>
        <GroupList.Item title='折线图'>
          <Chart
            style={{ height: chartHeight }}
            option={options.line}
            components={[LineChart, TooltipComponent, GridComponent]}
          />
        </GroupList.Item>
        <GroupList.Item title='柱状图'>
          <Chart
            style={{ height: chartHeight }}
            option={options.bar}
            components={[BarChart, TooltipComponent, GridComponent]}
          />
        </GroupList.Item>
        <GroupList.Item title='散点图'>
          <Chart
            style={{ height: chartHeight }}
            option={options.scatter}
            components={[ScatterChart, TooltipComponent, GridComponent]}
          />
        </GroupList.Item>
        <GroupList.Item title='饼图'>
          <Chart
            style={{ height: chartHeight }}
            option={options.pie}
            components={[PieChart, TooltipComponent, TitleComponent, LegendComponent]}
          />
        </GroupList.Item>
        <GroupList.Item title='环形图'>
          <Chart
            style={{ height: chartHeight }}
            option={options.donut}
            components={[PieChart, TooltipComponent, LegendComponent]}
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

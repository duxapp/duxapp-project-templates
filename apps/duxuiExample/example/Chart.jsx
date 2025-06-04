import { Chart } from '@/echarts'
import { Header, ScrollView, TopView, GroupList, px } from '@/duxuiExample'

import {
  PieChart,
  LineChart,
  BarChart
} from 'echarts/charts'

import {
  TooltipComponent,
  GridComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

const options = {
  line: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  },
  bar: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  },
  pie: {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

export default function CellExample() {

  return <TopView>
    <Header title='Chart' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='折线图'>
          <Chart
            style={{ height: px(400) }}
            option={options.line}
            components={[LineChart, TooltipComponent, GridComponent, TitleComponent, LegendComponent]}
          />
        </GroupList.Item>
        <GroupList.Item title='柱状图'>
          <Chart
            style={{ height: px(400) }}
            option={options.bar}
            components={[BarChart, TooltipComponent, GridComponent]}
          />
        </GroupList.Item>
        <GroupList.Item title='饼图'>
          <Chart
            style={{ height: px(400) }}
            option={options.pie}
            components={[PieChart, TooltipComponent, GridComponent]}
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

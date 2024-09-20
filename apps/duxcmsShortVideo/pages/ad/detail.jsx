import { CmsIcon, usePageData, useRequest } from '@/duxcms'
import { Button, Card, Column, Grid, Header, Image, ModalForm, Row, ScrollView, Text, TopView, duxappTheme, px, useRoute, Calendar, Empty } from '@/duxui'
import { useMemo, useState } from 'react'
import { setClipboardData } from '@tarojs/taro'
import { Chart } from '@/echarts'

import { LineChart } from 'echarts/charts'

import {
  TooltipComponent,
  GridComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

import dateIcon from './images/icon-date.png'

export default function AdDetail() {

  const { params } = useRoute()

  const [data] = useRequest(`advert/order/${params.id}`)

  const [list] = usePageData(`advert/order/${params.id}/data`)

  const [type, setType] = useState(types[0].key)

  const [day, setDay] = useState()

  const typeItem = types.find(v => v.key === type)

  const dayItem = list.find(v => v.date === day)

  const typeCount = useMemo(() => {
    return list.reduce((prev, item) => {
      return item[type] + prev
    }, 0)
  }, [list, type])

  const option = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: list.map(item => item.date.substring(5))
      },
      color: [duxappTheme.primaryColor],
      yAxis: {
        type: 'value'
      },
      grid: {
        tpp: 0,
        bottom: 25
      },
      series: types.map(_type => {
        return {
          data: list.map(item => item[_type.key] || 0),
          type: 'line',
          itemStyle: { color: _type.key === type ? duxappTheme.primaryColor : duxappTheme.textColor3 }
        }
      })
    }
  }, [list, type])

  return <TopView>
    <Header title='效果详情' />
    <ScrollView>
      <Column className='mh-3 mt-3 r-2 bg-primary'>
        <Column className='mt-1 bg-white r-2 p-3 gap-3'>
          <Text size={5} bold>基本信息</Text>
          <Text><Text color={2}>开通时间</Text> {data.created_at}</Text>
          <Text><Text color={2}>投放日期</Text> {data.date?.map(item => item.substring(5)).join(', ')}</Text>
          {/* <Text><Text color={2}>已选行业</Text> IT 行业</Text> */}
          <Text onClick={() => setClipboardData({ data: data.order_no })}><Text color={2}>订单号</Text> {data.order_no} <CmsIcon name='copy' /></Text>
          <Text><Text color={2}>结束时间</Text> {data.completed_at || '--'}</Text>
          <Text><Text color={2}>可退金额</Text> {data.refund_price || '--'}</Text>
        </Column>
      </Column>
      <Column className='mh-3 mt-3 bg-white r-2 p-3 gap-3'>
        <Text size={5} bold>我的投放设置</Text>
        <Row justify='between'>
          <Text color={2}>投放区域</Text>
          <Text bold>{data.area_name}</Text>
        </Row>
        {
          data.adverts?.map(item => {
            return <Row key={item.id} justify='between'>
              <Text color={2}>{item.type_name}</Text>
              <Text bold>{item.count_num}</Text>
            </Row>
          })
        }
      </Column>
      <Card.Title className='mh-3 mt-3'>推广期内累计数据</Card.Title>
      <Column className='mh-3 mt-3 bg-white r-2 p-3 gap-3'>
        <Chart
          option={option}
          style={{ height: px(400) }}
          components={[LineChart, TooltipComponent, GridComponent, TitleComponent, LegendComponent]}
        />
        <Row justify='between'>
          <Text size={2} color={2}>所选数据：<Text bold type='secondary'>{typeItem.name}</Text></Text>
          <Text size={2} color={2}>累计数量：<Text bold type='danger'>{typeCount}</Text></Text>
        </Row>
        <Column className='p-3 r-2 gap-3' style={{ borderColor: duxappTheme.textColor3, borderWidth: px(1) }}>
          <Text size={2}>点击按钮查看数据变化</Text>
          <Grid column={4} gap={24}>
            {
              types.map(item => <Button key={item.name}
                type='primary'
                plain={type !== item.key}
                size='s'
                onClick={() => setType(item.key)}
              >{item.name}</Button>)
            }
          </Grid>
        </Column>
      </Column>
      <Row className='mh-3 mt-3' items='center' justify='between'>
        <Card.Title>每日数据</Card.Title>
        <ModalForm
          childPropsValueKey='value'
          title='日期选择'
          value={day}
          onChange={setDay}
          renderForm={<Calendar
            mode='day'
            enabledDate={list.map(item => item.date)}
          />}
        >
          <DateShow />
        </ModalForm>
      </Row>
      {
        day ?
          <Column className='mh-3 mt-3 bg-white r-2 p-3 gap-3'>
            <Text size={5} bold>{day}</Text>
            <Row justify='between'>
              <Text color={2}>曝光次数（次）</Text>
              <Text>{dayItem.views}</Text>
            </Row>
            <Row justify='between'>
              <Text color={2}>点击次数（15秒以上）（次）</Text>
              <Text>{dayItem.click}</Text>
            </Row>
            <Row justify='between'>
              <Text color={2}>转发次数（次）</Text>
              <Text>{dayItem.share}</Text>
            </Row>
            <Row justify='between'>
              <Text color={2}>电话拨打次数（次）</Text>
              <Text>{dayItem.tel}</Text>
            </Row>
            <Row justify='between'>
              <Text color={2}>表单提交次数（次）</Text>
              <Text>{dayItem.form}</Text>
            </Row>
            {/* <Row justify='between'>
              <Text color={2}>导航次数（次）</Text>
              <Text>{dayItem.views}</Text>
            </Row>
            <Row justify='between'>
              <Text color={2}>点赞次数（次）</Text>
              <Text>100</Text>
            </Row>
            <Row justify='between'>
              <Text color={2}>评论次数（次）</Text>
              <Text>100</Text>
            </Row> */}
          </Column> :
          <Empty title='请选择日期后查看数据' />
      }

      <Column className='p-3' />
    </ScrollView>
  </TopView>
}

const types = [
  { name: '曝光数', key: 'views' },
  { name: '点击数', key: 'click' },
  { name: '转发数', key: 'share' },
  { name: '打电话', key: 'tel' },
  { name: '表单提交', key: 'form' },
  // { name: '地址导航', key: '' },
  // { name: '点赞数', key: '' },
  // { name: '评论数', key: '' }
]

const DateShow = ({ value, ...props }) => {
  return <Row items='center' {...props}>
    <Text color={2}>{value || '日期选择'}</Text>
    <Image src={dateIcon} style={{ width: px(40) }} square />
  </Row >
}

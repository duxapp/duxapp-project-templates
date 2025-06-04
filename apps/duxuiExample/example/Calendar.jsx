import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { Calendar, Checkbox, dayjs, Radio, Row, Text, toast, RadioGroup } from '@/duxui'
import { useMemo, useState } from 'react'

export default function ButtonExample() {

  const [mode, setMode] = useState()

  const [checkbox, setCheckbox] = useState(false)

  const [onlyCurrentWeek, setOnlyCurrentWeek] = useState(false)

  const [maxmin, setMaxmin] = useState(false)

  const customDate = useMemo(() => {
    return [
      {
        date: [dayjs().format('YYYY-MM-DD')],
        bottom: ({ select }) => <Text size={1} type='primary' {...select ? { color: 4 } : {}}>今天</Text>,
        top: ({ select }) => <Text size={1} color={select ? 4 : 1}>顶部</Text>
      },
      {
        date: [dayjs().add(-1, 'day').format('YYYY-MM-DD')],
        bottom: ({ select }) => <Text size={1} type='secondary' {...select ? { color: 4 } : {}}>昨天</Text>
      },
      {
        date: [dayjs().add(1, 'day').format('YYYY-MM-DD')],
        bottom: ({ select }) => <Text size={1} type='secondary' {...select ? { color: 4 } : {}}>明天</Text>
      }
    ]
  }, [])

  const customSelect = useMemo(() => {
    return {
      top: ({ select, selectType }) => {
        if (selectType === 'start') {
          return <Text size={1} color={4}>开始</Text>
        } else if (selectType === 'end') {
          return <Text size={1} color={4}>结束</Text>
        } else if (selectType === 'select') {
          return <Text size={1} color={4}>选中</Text>
        }
      }
    }
  }, [])

  return <TopView>
    <Header title='Calendar' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='天选择'>
          <RadioGroup value={mode} onChange={setMode}>
            <Radio value={undefined} label='不选择' />
            <Radio value='day' label='天选择' />
            <Radio value='scope' label='范围选择' />
            <Radio value='week' label='周选择' />
          </RadioGroup>
          <Row className='gap-3 items-center'>
            <Checkbox label='多选' checked={checkbox} onClick={() => setCheckbox(!checkbox)} />
            <Checkbox label='仅显示当前周' checked={onlyCurrentWeek} onClick={() => setOnlyCurrentWeek(!onlyCurrentWeek)} />
            <Checkbox label='限制最大最小日期' checked={maxmin} onClick={() => setMaxmin(!maxmin)} />
          </Row>
          <Calendar mode={mode}
            key={mode + '' + checkbox}
            checkbox={checkbox}
            onlyCurrentWeek={onlyCurrentWeek}
            {
            ...maxmin ? {
              min: dayjs().format('YYYY-MM-DD'),
              max: dayjs().add(15, 'day').format('YYYY-MM-DD'),
            } : {}
            }
          />
        </GroupList.Item>
        <GroupList.Item title='事件'>
          <Calendar
            mode='day'
            onMonthChange={e => toast('onMonthChange:' + e)}
            onDayClick={e => toast('onDayClick:' + e.day)}
          />
        </GroupList.Item>
        <GroupList.Item title='自定义日历'>
          <Calendar
            mode='scope'
            customDate={customDate}
            customSelect={customSelect}
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

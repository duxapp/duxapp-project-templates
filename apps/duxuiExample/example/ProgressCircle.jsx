import { Header, ScrollView, TopView, GroupList, ProgressCircle, duxappTheme, Row, Text, Button, colorLighten } from '@/duxuiExample'
import { useState } from 'react'

export default TopView.HOC(function ProgressCircleExample() {

  const [val, setVal] = useState(30)

  return <>
    <Header title='ProgressCircle' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Row items='center' className='gap-3'>
            <ProgressCircle value={30} />
            <ProgressCircle value={40} clockwise={false} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='颜色和渐变'>
          <Row items='center' className='gap-3'>
            <ProgressCircle value={30} color={duxappTheme.successColor} />
            <ProgressCircle value={100}
              color={{
                '0%': duxappTheme.primaryColor,
                '100%': colorLighten(duxappTheme.primaryColor, 0.5)
              }}
            />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='尺寸'>
          <Row items='center' className='gap-3'>
            <ProgressCircle value={30} size={100} />
            <ProgressCircle value={30} size={180} strokeWidth={30} />
            <ProgressCircle value={30} size={260} strokeWidth={40} />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='进度条圆角'>
          <Row items='center' className='gap-3'>
            <ProgressCircle value={50} />
            <ProgressCircle value={50} strokeLinecap='square' />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='加载中'>
          <Row items='center' className='gap-3'>
            <ProgressCircle loading />
            <ProgressCircle value={30} loading />
          </Row>
        </GroupList.Item>
        <GroupList.Item title='子元素'>
          <ProgressCircle value={30}>
            <Text size={7}>30%</Text>
          </ProgressCircle>
        </GroupList.Item>
        <GroupList.Item title='动态变更'>
          <ProgressCircle value={val}>
            <Text size={7}>{val}%</Text>
          </ProgressCircle>
          <Row className='gap-3'>
            <Button type='primary' onClick={() => setVal(Math.max(val - 10, 0))}>减少</Button>
            <Button type='primary' onClick={() => setVal(Math.min(val + 10, 100))}>增加</Button>
          </Row>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
})

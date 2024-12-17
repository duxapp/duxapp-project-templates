import { Header, ScrollView, TopView, GroupList, pxNum } from '@/duxuiExample'
import { Svg, Rect, Circle, Line, Image } from '@/duxui/components/Svg'

export default TopView.HOC(function SvgExample() {

  return <>
    <Header title='Svg' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Svg width={pxNum(400)} height={pxNum(400)}>
            <Rect x={0} y={0} width={40} height={40} fill='#666' />
            <Circle fill='#999' cx={100} cy={100} r={50} />
            <Line stroke='#333' x1={0} y1={2} x2={100} y2={100} strokeWidth={5} />
            <Image x={100} y={0} width={50} height={50} href={href} />
            <Image x={100} y={55} width={50} height={50} href={href} />
            <Image x={100} y={110} width={50} height={50} href={href} />
          </Svg>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
})

const href = { uri: 'https://img.shetu66.com/2023/12/08/1701995350504372.png' }

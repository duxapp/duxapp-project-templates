import { Header, TopView, GroupList, pxNum, duxappTheme, toast } from '@/duxuiExample'
import {
  Svg, Rect, Animated, PanResponder, Easing, Circle, Path
} from '@/duxui/components/Svg'
import { useRef } from 'react'

const RectAnimated = Animated.createAnimatedComponent(Rect)

export default TopView.page(function SvgEventExample() {

  return <>
    <Header title='Svg 事件结合' />
    <GroupList>
      <Event />
      <TouchEvent />
    </GroupList>
  </>
})

const Event = () => {

  return <GroupList.Item title='组件事件' desc='点击对应的图形会有对应的点击事件'>
    <Svg width={100} height={100}>
      <Circle
        cx='50%'
        cy='50%'
        r='38%'
        fill='red'
        onPress={() => toast('点击圆形')}
      />
      <Rect
        x='20%'
        y='20%'
        width='60%'
        height='60%'
        fill='blue'
        onPress={() => toast('点击正方形')}
      />
      <Path
        d='M50,5L20,99L95,39L5,39L80,99z'
        fill='pink'
        onPress={() => toast('点击五角星')}
      />
    </Svg>
  </GroupList.Item>
}

const TouchEvent = () => {
  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  const movePan = useRef(new Animated.ValueXY({ x: 10, y: 10 }, { useNativeDriver: false })).current

  const moveEvent = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      movePan.setOffset({
        x: movePan.x._value,
        y: movePan.y._value
      })
    },
    onPanResponderMove: (e, gestureState) => {
      movePan.setValue({ x: gestureState.dx, y: gestureState.dy })
    },
    onPanResponderRelease: () => {
      movePan.flattenOffset()
    }
  })).current

  const moveOriginPan = useRef(new Animated.ValueXY({ x: 150, y: 50 }, { useNativeDriver: true })).current

  const moveOriginEvent = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      moveOriginPan.setValue({ x: gestureState.dx + 150, y: gestureState.dy + 50 })
    },
    onPanResponderRelease: () => {
      Animated.timing(moveOriginPan, {
        toValue: { x: 150, y: 50 },
        duration: 600,
        easing: Easing.bounce,
        useNativeDriver: true
      }).start()
    }
  })).current

  return <GroupList.Item title='结合动画' desc='蓝色拖拽，红色拖拽后回弹'>
    <Svg width={pxNum(702)} height={pxNum(300)}>
      <Rect width={pxNum(702)} height={pxNum(300)} fill='#fff' />
      <RectAnimated
        width={50}
        height={50}
        fill={secondary}
        {...moveEvent.panHandlers}
        x={movePan.x}
        y={movePan.y}
      />
      <RectAnimated
        width={50}
        height={50}
        fill={primary}
        {...moveOriginEvent.panHandlers}
        x={moveOriginPan.x}
        y={moveOriginPan.y}
      // translateX={moveOriginPan.x}
      // translateY={moveOriginPan.y}
      />
    </Svg>
  </GroupList.Item>
}

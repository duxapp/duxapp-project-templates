import { Header, ScrollView, TopView, GroupList, pxNum, duxappTheme, Row, Button } from '@/duxuiExample'
import {
  Svg, Rect,
  Animated, Easing
} from '@/duxui/components/Svg'
import { useEffect, useRef } from 'react'

const AnimatedRect = Animated.createAnimatedComponent(Rect)

export default TopView.HOC(function SvgAnimatedExample() {

  return <>
    <Header title='Svg 动画' />
    <ScrollView>
      <GroupList>
        <Fade />
        <Color />
        <Loop />
        <Transform />
      </GroupList>
    </ScrollView>
  </>
})

const Fade = () => {

  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  const fadeAnim = useRef(new Animated.Value(1)).current

  const width = pxNum(702)
  const height = pxNum(180)

  return <GroupList.Item title='淡入淡出'>
    <Svg width={width} height={height}>
      <AnimatedRect
        x={(width - height) / 2}
        opacity={fadeAnim}
        width={height}
        height={height}
        rx={10} ry={10} stroke={secondary} fill={primary}
      />
    </Svg>
    <Row className='mt-2 gap-3 justify-center'>
      <Button type='primary'
        onClick={() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
          }).start()
        }}
      >淡入</Button>
      <Button type='primary'
        onClick={() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          }).start()
        }}
      >淡出</Button>
    </Row>
  </GroupList.Item>
}

const Color = () => {

  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  const colorAnim = useRef(new Animated.Value(0)).current

  const width = pxNum(702)
  const height = pxNum(180)

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(colorAnim, {
          toValue: 3,
          duration: 3000,
          useNativeDriver: false
        })
      ).start()
    }, 500)
  }, [colorAnim])

  return <GroupList.Item title='颜色'>
    <Svg width={width} height={height}>
      <AnimatedRect
        x={(width - height) / 2}
        width={height}
        height={height}
        rx={10} ry={10}
        stroke={secondary}
        fill={colorAnim.interpolate({
          inputRange: [0, 1, 2, 3],
          outputRange: [primary, secondary, duxappTheme.successColor, primary]
        })}
      />
    </Svg>
  </GroupList.Item>
}

const Loop = () => {

  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  const x = useRef(new Animated.Value(0)).current

  const size = 50

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(x, {
          toValue: 4,
          duration: 3000,
          easing: Easing.bounce,
          useNativeDriver: false
        })
      ).start()
    }, 500)
  }, [x])

  const width = pxNum(702)
  const height = pxNum(360)
  return <GroupList.Item title='循环动画' desc='利用 interpolate 将动画值映射到任意范围'>
    <Svg width={width} height={height}>
      <AnimatedRect
        x={x.interpolate({
          inputRange: [0, 1, 2, 3, 4],
          outputRange: [0, width - size, width - size, 0, 0]
        })}
        y={x.interpolate({
          inputRange: [0, 1, 2, 3, 4],
          outputRange: [0, 0, height - size, height - size, 0]
        })}
        width={size}
        height={size}
        rx={10} ry={10} stroke={secondary} fill={primary}
      />
    </Svg>
  </GroupList.Item>
}

const Transform = () => {

  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  const transformAnim = useRef(new Animated.Value(0)).current

  const width = pxNum(702)
  const height = pxNum(180)

  const size = pxNum(100)

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(transformAnim, {
          toValue: 2,
          duration: 2000,
          easing: Easing.circle,
          useNativeDriver: true
        })
      ).start()
    }, 500)
  }, [transformAnim])

  return <GroupList.Item title='变换动画' desc='在RN上似乎不生效'>
    <Svg width={width} height={height}>
      <AnimatedRect
        x={(width - size) / 2}
        y={(height - size) / 2}
        width={size}
        height={size}
        rx={10} ry={10}
        stroke={secondary}
        fill={primary}
        origin={[width / 2, height / 2]}
        rotation={transformAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 180, 360]
        })}
        scale={transformAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1, 2, 1]
        })}
      />
    </Svg>
  </GroupList.Item>
}

import { Header, ScrollView, TopView, GroupList, Animated, px, Button, transformStyle, duxappTheme, pxNum } from '@/duxuiExample'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedExample() {

  // 动画默认值要使用 Animated.defaultState 否则小程序端动画无效
  const [an1, setAn1] = useState(Animated.defaultState)

  const [an2, setAn2] = useState(Animated.defaultState)

  const [an3, setAn3] = useState(Animated.defaultState)

  const [an4, setAn4] = useState(Animated.defaultState)

  const an = useRef()

  useEffect(() => {
    an.current = Animated.create({
      duration: 500,
      timingFunction: 'ease-in-out'
    })
  }, [])

  return <TopView>
    <Header title='Animated' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础'>
          <Animated.View
            animation={an1}
            className='bg-primary p-3'
            style={{
              width: px(100),
              height: px(100)
            }}
          />
          <Button onClick={() => {
            setAn1(an.current
              .translate(50, 50).scale(2).rotateZ(90).step()
              .translate(100, 0).scale(1).rotateZ(0).step()
              .translate(50, -50).scale(2).rotateZ(90).step()
              .translate(0, 0).scale(1).rotateZ(0).step()
              .export()
            )
          }}
          >分步组合</Button>
        </GroupList.Item>
        <GroupList.Item title='背景颜色'>
          <Animated.View
            animation={an2}
            className='bg-primary p-3'
            style={{
              width: px(100),
              height: px(100)
            }}
          />
          <Button onClick={() => {
            setAn2(an.current
              .backgroundColor(duxappTheme.successColor).step()
              .backgroundColor(duxappTheme.warningColor).step()
              .backgroundColor(duxappTheme.textColor2).step()
              .backgroundColor(duxappTheme.primaryColor).step()
              .export()
            )
          }}
          >变换颜色</Button>
        </GroupList.Item>
        <GroupList.Item title='默认样式' desc='transform样式需要用 transformStyle 转换，且里面只能写基础样式，请不要写组合样式'>
          <Animated.View
            animation={an3}
            className='bg-primary'
            // onClick={() => {
            //   console.log('click')
            // }}
            style={{
              width: px(100),
              height: px(100),
              transform: transformStyle({
                // translateX: px(50),
                // translateY: px(50),
                // translate: '' // 请不要写这种简写的样式
              }),
              // transformOrigin: '50% 50% 0'
            }}
          />
          <Button onClick={() => {
            setAn3(
              an.current
                .translate(pxNum(50), pxNum(50))
                .rotate(180)
                .step()
                .translate(0, 0)
                .rotate(0)
                .step()
                .export()
            )
          }}
          >测试</Button>
        </GroupList.Item>
        <GroupList.Item title='变换原点和延迟' desc='PullView confirm message 等功能的动画效果是使用这个库实现的，可以查看对应组件'>
          <Animated.View
            animation={an4}
            className='bg-primary'
            // onClick={() => {
            //   console.log('click')
            // }}
            style={{
              width: px(100),
              height: px(100)
            }}
          />
          <Button onClick={() => {
            setAn4(
              an.current
                .rotate(180)
                .step({
                  transformOrigin: '100% 100% 0'
                })
                .rotate(0)
                .step({
                  transformOrigin: '100% 100% 0',
                  delay: 400
                })
                .export()
            )
          }}
          >测试</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

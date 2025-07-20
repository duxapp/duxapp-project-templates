import { Animated, colorDark, colorLighten, duxappTheme, getWindowInfo, nextTick, pxNum, theme, TopView, transformStyle } from '@/duxapp'
import { View } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import { Column } from '../Flex'
import { Text } from '../Text'

export const showContextMenu = ({
  x, y, list
}) => {
  if (!list?.length) {
    return Promise.reject('菜单列表为空')
  }
  if (typeof x !== 'number' || typeof y !== 'number') {
    return Promise.reject('坐标参数错误')
  }

  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([
      ContextMenu,
      {
        x, y, list,
        onClose: () => {
          remove()
          reject('取消选择')
        },
        onSelect: data => {
          remove()
          resolve(data)
        }
      }
    ])
  })
}

const ContextMenu = ({ x, y, list, onClose, onSelect }) => {
  const itemSize = 48

  const [an, setAn] = useState(Animated.defaultState)

  const { transformOrigin, transform } = useMemo(() => {
    const info = getWindowInfo()
    const menuHeight = list.length * itemSize

    // 计算水平位置和变换
    let translateX = '0%'
    if (x > info.windowWidth / 2) {
      translateX = '-100%'
    }

    // 计算垂直位置和变换
    let translateY = '0%'
    if (y + menuHeight > info.windowHeight) {
      translateY = '-100%'
    }

    return {
      transformOrigin: `${translateX === '0%' ? '0%' : '100%'} ${translateY === '0%' ? '0%' : '100%'}`,
      transform: { translateX, translateY }
    }
  }, [x, y, list.length, itemSize])

  useEffect(() => {
    // 初始化动画
    nextTick(() => {
      setAn(Animated.create({
        duration: 80,
        transformOrigin
      })
        .scale(1)
        .opacity(1)
        .step()
        .export())
    })
  }, [transform.translateX, transform.translateY, transformOrigin])

  return (
    <>
      <View
        className='absolute inset-0 z-2'
        onClick={onClose}
      />
      <Column
        className='absolute z-2'
        style={{
          left: x,
          top: y,
          transform: transformStyle(transform)
        }}
      >
        <Animated.View
          animation={an}
          className='bg-white r-1 overflow-hidden'
          style={{
            boxShadow: `0 0 ${pxNum(10)}px 0 ${theme.isDark()
              ? colorLighten(duxappTheme.whiteColor, 0.1)
              : colorDark(duxappTheme.whiteColor, 0.1)
              }`,
            opacity: 0,
            transform: transformStyle({
              scaleX: 0,
              scaleY: 0
            }),
            transformOrigin
          }}
        >
          {list.map((item, index) => (
            <Column
              key={index}
              className='ph-3 z-2 justify-center'
              style={{
                height: itemSize,
                borderBottom: index < list.length - 1
                  ? `1px solid ${duxappTheme.borderColor}`
                  : 'none',
                minWidth: pxNum(120)
              }}
              onClick={() => {
                onSelect({ item, index })
              }}
            >
              <Text nowrap>{item}</Text>
            </Column>
          ))}
        </Animated.View>
      </Column>
    </>
  )
}

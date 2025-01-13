import { View, Text } from '@tarojs/components'
import { usePageData, duxappTheme, CmsIcon } from '@/duxcms'
import { PullView, ScrollView } from '@/duxui'
import { useCallback, useEffect, useMemo, useRef, useState, cloneElement } from 'react'
import './index.scss'

const levels = ['省', '市', '区', '街道']

const Select = ({
  value,
  cancel,
  onChange,
  level = 4,
  close
}) => {

  const [val, valAction] = useState([])

  useEffect(() => {
    if (value?.length) {
      valAction(value.slice(0, value.length - 1))
    }
  }, [value])

  // 一次性执行判断
  const init = useRef(false)

  const params = useMemo(() => {
    // 获取默认值
    if (value?.length && !init.current) {
      return {
        level: value.length - 1,
        parent: value[value.length - 2]
      }
    }
    if (!val.length) {
      return {}
    }
    return {
      level: val.length,
      parent: val[val.length - 1]
    }
  }, [value, val])

  init.current = true

  const [list] = usePageData({ url: 'member/area', data: params })

  const changeLevel = useCallback(index => {
    valAction(old => {
      old.splice(index)
      return [...old]
    })
  }, [])

  const selectArea = useCallback(item => {
    if (item.leaf || val.length >= level - 2) {
      // 当前已经是最后一级
      onChange([...val, item.value])
    } else {
      // 获取下级
      valAction(old => [...old, item.value])
    }
  }, [level, val, onChange])

  return <View className='Address'>
    <View className='Address__head'>
      <View className='Address__head__left' />
      <Text className='Address__head__title'>请选择地区</Text>
      <View className='Address__head__close' onClick={close}>
        <CmsIcon name='guanbi1' size={36} />
      </View>
    </View>
    <View className='Address__nav'>
      {
        levels.map((item, index) => {
          return index <= val.length
            && <Text
              key={'item' + index}
              onClick={() => changeLevel(index)}
              className='Address__nav__child'
              style={{
                color: index == val.length ? duxappTheme.primaryColor : '#333',
                borderColor: index == val.length ? duxappTheme.primaryColor : '#fff',
              }}
            >{val[index] || '请选择'}</Text>
        })
      }
    </View>
    <ScrollView>
      {
        cancel && !!value?.length && <View className='Address__item' onClick={() => onChange()}>
          <Text className='Address__item__txt' style={{ color: '#333' }}>
            取消选择
          </Text>
        </View>
      }
      {
        list.map(item => {
          return <View key={item.label} className='Address__item' onClick={() => selectArea(item)}>
            <Text className='Address__item__txt' style={{ color: false ? duxappTheme.primaryColor : '#333' }}>
              {item.label}
            </Text>
          </View>
        })
      }
    </ScrollView>
  </View>
}

export const Address = ({
  value,
  onChange,
  style,
  leval,
  useChild,
  children,
  cancel,
  disabled,
  ...props
}) => {

  const [show, showAction] = useState(false)

  return <>
    {
      useChild ?
        cloneElement(children, { onClick: () => !disabled && showAction(!show) }) :
        <View onClick={() => !disabled && showAction(!show)} style={style} {...props}>
          {children}
        </View>
    }
    {
      show && <PullView onClose={() => showAction(!show)}>
        <Select value={value}
          leval={leval}
          cancel={cancel}
          onChange={v => {
            showAction(!show)
            onChange?.(v)
          }}
          close={() => showAction(!show)}
        />
      </PullView>
    }
  </>
}

Address.defaultProps = {
  value: []
}

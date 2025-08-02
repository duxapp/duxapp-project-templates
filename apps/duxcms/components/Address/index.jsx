import { View, Text } from '@tarojs/components'
import { usePageData } from '@/duxcms/utils'
import { PullView, ScrollView, Tab, TabItem } from '@/duxui'
import { useCallback, useEffect, useMemo, useRef, useState, cloneElement } from 'react'
import { CmsIcon } from '../CmsIcon'
import './index.scss'

const levels = ['省', '市', '区', '街道']

export const AddressSelect = ({
  value,
  cancel,
  onChange,
  level = 4,
  close,
  header,
  style
}) => {

  const [val, setVal] = useState([])

  const refs = useRef({}).current
  refs.val = val

  useEffect(() => {
    if (value?.length) {
      if (value.join('.') !== refs.val.join('.')) {
        setVal([...value])
      }
    }
  }, [value, refs])

  // 一次性执行判断
  const init = useRef(false)

  const params = useMemo(() => {
    // 获取默认值
    if (value?.length && !init.current) {
      return {
        level: Math.min(value.length - 1, level - 1),
        parent: value[Math.min(value.length - 2, level - 2)]
      }
    }
    if (!val.length) {
      return {}
    }
    return {
      level: Math.min(val.length, level - 1),
      parent: val[Math.min(val.length - 1, level - 2)]
    }
  }, [value, val, level])

  init.current = true

  const [list] = usePageData({ url: 'member/area', data: params })

  const changeLevel = useCallback(index => {
    setVal(old => {
      old.splice(index, 4)
      return [...old]
    })
  }, [])

  const selectArea = useCallback(item => {
    if (item.leaf || val.length >= level - 1) {
      // 当前已经是最后一级
      val[level - 1] = item.value
      const newVal = [...val]
      onChange(newVal)
      setVal(newVal)
    } else {
      // 获取下级
      setVal(old => [...old, item.value])
    }
  }, [level, val, onChange])

  return <View className='Address' style={style}>
    {header && <View className='Address__head'>
      <View className='Address__head__left' />
      <Text className='Address__head__title'>请选择地区</Text>
      <View className='Address__head__close' onClick={close}>
        <CmsIcon name='guanbi1' size={36} />
      </View>
    </View>}
    <Tab scroll
      value={Math.min(val.length, level - 1)}
      onChange={changeLevel}
    >
      {
        levels.slice(0, Math.min(val.length + 1, level)).map((item, index) => {
          return <TabItem
            key={index}
            title={val[index] || `选择${item}`}
          />
        })
      }
    </Tab>
    <ScrollView>
      {
        cancel && !!value?.length && <View className='Address__item' onClick={() => onChange()}>
          <Text className='Address__item__txt text-c1'>
            取消选择
          </Text>
        </View>
      }
      {
        list.map(item => {
          return <View key={item.label} className='Address__item' onClick={() => selectArea(item)}>
            <Text className='Address__item__txt text-c1'>
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
  level = leval,
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
        cloneElement(children, { value, onClick: () => !disabled && showAction(!show) }) :
        <View onClick={() => !disabled && showAction(!show)} style={style} {...props}>
          {children}
        </View>
    }
    {
      show && <PullView onClose={() => showAction(!show)}>
        <AddressSelect value={value}
          level={level}
          cancel={cancel}
          onChange={v => {
            showAction(!show)
            onChange?.(v)
          }}
          close={() => showAction(!show)}
          header
        />
      </PullView>
    }
  </>
}

Address.defaultProps = {
  value: []
}

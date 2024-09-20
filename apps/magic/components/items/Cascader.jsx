import { Cascade as UICascade } from '@/duxui'
import { useMemo } from 'react'
import { FormItem } from './FormItem'
import { useSourceData } from './util'

export const Cascader = ({ config, checkbox }) => {

  const { setting = {} } = config

  const data = useSourceData(setting)

  const level = useMemo(() => {
    let _level = 1
    const fn = (list, l = 1) => {
      if (_level < l) {
        _level = l
      }
      list.forEach(item => {
        if (item.children?.length) {
          fn(item.children, l + 1)
        }
      })
    }
    fn(data)
    return _level
  }, [data])

  return <FormItem config={config}>
    <UICascade
      data={data}
      nameKey={setting.keys_label || 'label'}
      valueKey={setting.keys_value || 'value'}
      childrenKey='children'
      level={level}
      anyLevel
      theme='fill'
      mode={checkbox ? 'checkbox' : 'radio'}
    />
  </FormItem>
}

Cascader.type = 'cascader'

Cascader.Display = ({ value, config }) => {
  return getItem(value, config?.setting?.keys_label || 'label')
}

export const CascaderMulti = props => {
  return <Cascader {...props} checkbox />
}

CascaderMulti.type = 'cascader-multi'

CascaderMulti.Display = ({ value, config }) => {
  return value?.map(item => getItem(item, config?.setting?.keys_label || 'label')).join('\n')
}

const getItem = (value = [], key) => {
  return value?.map(item => item[key]).join(' > ')
}

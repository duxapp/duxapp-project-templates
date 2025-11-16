import { useEffect, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import { Text, Layout, Absolute } from '@/duxui'
import { duxappTheme } from '@/duxcms/utils'
import classNames from 'classnames'
import { CmsIcon } from '../CmsIcon'
import FilterMore from './common/filter'

import './filter.scss'

const sort = ['asc', 'desc', '']
const icon = { asc: 'direction_up', desc: 'direction_down', '': 'ranking' }

export const ListFilter = ({
  filter: list,
  isfilter = true,
  onChange,
  className,
  style
}) => {

  const [optionIndex, setOptionIndex] = useState(-1)

  const defaultPost = useMemo(() => ({}), [])

  const [post, setPost] = useState(defaultPost)

  const [top, setTop] = useState(0)

  const [more, setMore] = useState(false)

  useEffect(() => {
    if (post !== defaultPost) {
      onChange?.(post)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPost, post])

  const [option, filter] = useMemo(() => {
    return list?.reduce((prev, current, index) => {
      current.tpl === 'interval'
        ? prev[1].push(current)
        : index < 4 ? prev[0].push(current) : prev[1].push(current)
      return prev
    }, [[], []]) || [[], []]
  }, [list])

  const optionItem = option[optionIndex] || {}

  const selectValue = value => {
    const key = option[optionIndex].name
    let select
    if (option[optionIndex].tpl == 'radio') {  // 单选
      select = value
    } else {                                   // 多选
      select = ['undefined', 'string'].indexOf(typeof post[key]) == -1 ? post[key] : []  // post[key]的值为数组
      var sub = select.indexOf(value)
      if (sub != -1) {
        select.splice(sub, 1)
      } else {
        select.push(value)    // 多选
      }
    }
    setOptionIndex(-1)
    setPost({ ...post, [key]: select })
  }

  return <>
    {!!option.length && <Layout onLayout={e => setTop(e.height + e.top)} style={style} className={classNames('list-filter', className)}>
      {option.map((item, index) => {
        const hover = index === optionIndex
        return (
          <View className='list-filter__item' key={'item' + index}>
            {['const', 'sort'].indexOf(item.tpl) == -1 &&
              <View className='list-filter__item' onClick={() => setOptionIndex(optionIndex === index ? -1 : index)}>
                <Text className='list-filter__item__text' style={hover ? { color: duxappTheme.primaryColor } : {}}>{item.text}</Text>
                <CmsIcon name={hover ? 'direction_up' : 'direction_down'} size={26} color={hover ? duxappTheme.primaryColor : duxappTheme.textColor3} />
              </View>
            }
            {item.tpl == 'const' &&
              <View className='list-filter__item' onClick={() => {
                const key = option[index].name
                const select = option[index].value == post[key] ? '' : option[index].value
                setOptionIndex(-1)
                setPost({ ...post, [key]: select })
              }}
              >
                <Text className='list-filter__item__text' style={post[item.name] == item.value ? { color: duxappTheme.primaryColor } : {}}>{item.text}</Text>
              </View>
            }
            {item.tpl == 'sort' &&
              <View className='list-filter__item'
                onClick={() => {
                  const key = option[index].name
                  const sub = sort.indexOf(post[key]) + 1
                  const select = sort[sub == sort.length ? 0 : sub]
                  setOptionIndex(-1)
                  setPost({ ...post, [key]: select })
                }}
              >
                <Text className='list-filter__item__text' style={hover ? { color: duxappTheme.primaryColor } : {}}>{item.text}</Text>
                {
                  !!post[item.name] &&
                  <CmsIcon
                    color={duxappTheme.primaryColor}
                    size={26}
                    name={icon[post[item.name]]}
                  />
                }
              </View>
            }
          </View>
        )
      })}
      {(isfilter && filter.length > 0) && <View className='list-filter__item'
        onClick={() => {
          setMore(!more)
          setOptionIndex(-1)
        }}
      >
        <Text className='list-filter__item__text'>筛选</Text>
        <CmsIcon name='filter' className='text-s5 text-c3' />
      </View>}
    </Layout>}
    {optionIndex !== -1 && <Absolute>
      <View className='list-filter-open' style={{ top }}>
        {optionItem.tpl === 'radio' &&
          <View className='list-filter-open__main'>
            {optionItem.list.map((item, index) => {
              const hoverRadio = post[optionItem.name] == item.value
              return <View key={'item' + index} className='list-filter-open__item'
                onClick={() => selectValue(item.value)}
              >
                <Text className={['list-filter-open__item__text', hoverRadio && 'list-filter-open__item__text--hover'].join(' ')}>{item.text}</Text>
                {hoverRadio && <CmsIcon name='select_check' className='text-s7 text-primary' />}
              </View>
            })}
          </View>
        }
        {optionItem.tpl === 'checkbox' &&
          <View className='list-filter-open__main'>
            {optionItem.list.map((item, index) => {
              const hoverCheckbox = post[optionItem.name].indexOf(index) != -1
              return <View key={'item' + index} className='list-filter-open__item' style={optionItem.list.length > 5 ? { width: '50%', justifyContent: 'flex-start' } : { justifyContent: 'flex-start' }} onClick={() => selectValue(index)}>
                <View className={['list-filter-open__item__checkIcon', hoverCheckbox && 'list-filter-open__item__checkIcon--hover'].join(' ')}>
                  {hoverCheckbox && <CmsIcon name='zhengque' size={18} className='text-white' />}
                </View>
                <Text className='list-filter-open__item__text'>{item.text}</Text>
              </View>
            })}
            <View
              onClick={() => {
                const key = option[optionIndex].text
                setPost({ ...post, [key]: [] })
              }}
              className='list-filter-open__item' style={{ width: '50%', justifyContent: 'center' }}
            >
              <Text className='list-filter-open__item__text list-filter-open__item__button'>重置</Text>
            </View>
            <View onClick={() => { }} className='list-filter-open__item justify-center bg-white' style={{ width: '50%' }}>
              <Text className='list-filter-open__item__text list-filter-open__item__button--hover'>确定</Text>
            </View>
          </View>
        }
        <View onClick={() => setOptionIndex(-1)} style={{ flex: 1 }}></View>
      </View>
    </Absolute>}
    {more && <FilterMore onClose={() => setMore(false)} data={filter} defaultData={post} onSubmit={setPost} />}
  </>
}

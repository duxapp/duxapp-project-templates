import { useState, useRef } from 'react'
import { View, Input } from '@tarojs/components'
import { ScrollView, PullView, Text, px, Row, Column } from '@/duxui'
import classNames from 'classnames'
import './filter.scss'

const PullListFilter = ({ data = [], defaultData = {}, onSubmit, onClose }) => {
  const [inputVal, setInputVal] = useState(defaultData)

  const pull = useRef()

  const handleSelect = (dataItem, item) => {
    const [min, max] = !item.min && item.value ? item.value.split('-') : [item.min, item.max]
    const newInputVal = { ...inputVal }

    if (dataItem.maxName) {
      newInputVal[dataItem.minName] = min + ''
      newInputVal[dataItem.maxName] = max + ''
    } else {
      newInputVal[dataItem.minName] = min + ''
    }
    setInputVal(newInputVal)
  }

  const handleInput = (key, e) => {
    setInputVal(prev => ({ ...prev, [key]: e.target.value }))
  }

  const handleReset = () => {
    const vals = { ...defaultData }
    data.map(item => {
      delete vals[item.minName]
      if (item.maxName) {
        delete vals[item.maxName]
      }
    })
    setInputVal(vals)
  }

  const handleSubmit = async () => {
    await pull.current.close(false)
    onSubmit(inputVal)
    onClose?.()
  }

  const handleClose = async () => {
    await pull.current.close()
    onClose?.()
  }

  return (
    <PullView onClose={onClose} ref={pull}>
      <View className='list-filter-pop'>
        <Row className='p-3 items-center'>
          <Text style={{ color: 'transparent' }}>取消</Text>
          <Text size={5} grow bold align='center'>筛选</Text>
          <Text onClick={handleClose}>取消</Text>
        </Row>
        <ScrollView>
          {data.map(item => {
            // const key = item.maxName ? item.maxName : item.value
            return (
              <View key={item.name + item.text} className='list-filter-pop__box'>
                <View className='list-filter-pop__title'>
                  <Text className='list-filter-pop__title__titleText'>{item.text}</Text>
                </View>
                <View className='list-filter-pop__content'>
                  {item.tpl === 'interval' && (
                    <View className='list-filter-pop__content__enter'>
                      <View className='list-filter-pop__content__enter__inputBox'>
                        <Input
                          onInput={(e) => handleInput(item.minName, e)}
                          value={inputVal[item.minName]}
                          className='list-filter-pop__content__enter__input'
                          placeholder='最小值'
                        />
                        <Text> — </Text>
                        <Input
                          onInput={(e) => handleInput(item.maxName, e)}
                          value={inputVal[item.maxName]}
                          className='list-filter-pop__content__enter__input'
                          placeholder='最大值'
                        />
                      </View>
                    </View>
                  )}
                  {item.list.map(item_ => (
                    <Text
                      key={item_.text}
                      numberOfLines={1}
                      className={classNames(
                        'list-filter-pop__content__item',
                        inputVal[item.maxName] == item_.value?.split('-')[1] && 'list-filter-pop__content__item--hover'
                      )}
                      style={{ width: px(item.tpl === 'interval' ? 316 : 220) }}
                      onClick={() => handleSelect(item, item_)}
                    >
                      {item_.text}
                    </Text>
                  ))}
                </View>
              </View>
            )
          })}
        </ScrollView>
        <Row
          className='bg-primary r-max m-3'
          style={{
            height: px(90),
            padding: px(1)
          }}
        >
          <Column
            className='bg-white flex-grow items-center justify-center r-max'
            onClick={handleReset}
            style={{
              borderTopRightRadius: 0
            }}
          >
            <Text size={4} bold>重置</Text>
          </Column>
          <Column
            className='flex-grow items-center justify-center'
            onClick={handleSubmit}
          >
            <Text size={4} bold>确定</Text>
          </Column>
        </Row>
      </View>
    </PullView>
  )
}

export default PullListFilter

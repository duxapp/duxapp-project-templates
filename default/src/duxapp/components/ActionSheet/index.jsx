import { useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import { TopView } from '../TopView'
import './index.scss'

export const ActionSheet = ({
  list,
  onSelect,
  onClose
}) => {

  const itemClick = useCallback((item, index) => {
    onSelect?.({
      item,
      index
    })
  }, [onSelect])

  const close = useCallback(() => {
    onClose?.()
  }, [onClose])

  return <>
    <View className='ActionSheet__mask' onClick={close} />
    <View className='ActionSheet'>
      <View className='ActionSheet__title'>请选择</View>
      {
        list?.map((item, index) => <View key={item}
          className='ActionSheet__item'
          onClick={itemClick.bind(null, item, index)}
        >
          <Text className='ActionSheet__item__text'>{item}</Text>
        </View>)
      }
    </View>
  </>
}

ActionSheet.show = ({
  title = '提示',
  list = [],
} = {}) => {
  return new Promise((resolve, reject) => {
    const action = TopView.add([
      ActionSheet,
      {
        title,
        list,
        onSelect: event => {
          resolve(event)
          action.remove()
        },
        onClose: () => {
          reject('组件被卸载')
          action.remove()
        }
      }
    ])
  })
}

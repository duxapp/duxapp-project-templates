import { TouchEvent, View } from '@tarojs/components'
import { StandardProps } from '@tarojs/components/types/common'
import { FC } from 'react'

interface LongPressProps extends StandardProps {
  /**
   * 点击事件的处理函数
   */
  onPress?: (event: TouchEvent<View>) => void
  /**
   * 长按事件的处理函数
   */
  onLongPress?: (event: TouchEvent<View>) => void
}

/**
 * 长按组件，支持长按事件和点击事件
 */
export const LongPress: FC<LongPressProps>

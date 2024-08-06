import { ReactNode } from 'react'
import { StandardProps } from '@tarojs/components/types/common'

interface BadgeNumberProps extends StandardProps {
  /**
   * 数量
   */
  count?: number

  /**
   * 是否只显示圆点
   */
  dot?: boolean

  /**
   * 背景色
   */
  color?: string

  /**
   * 文本内容
   */
  text?: string

  /**
   * 最大数量，超过此值时将显示 `${maxCount}+`
   */
  maxCount?: number

  /**
   * 是否作为子元素使用，如果为 true，则样式将不包含任何 padding 或 margin
   */
  child?: boolean
}

/**
 * 显示一个数字或圆点的徽标。
 */
export function Badge(props: BadgeNumberProps & { children?: ReactNode }): JSX.Element

interface BadgeProps extends StandardProps {
  /**
   * 数量
   */
  count?: number

  /**
   * 是否只显示圆点
   */
  dot?: boolean

  /**
   * 背景色
   */
  color?: string

  /**
   * 是否显示在元素的外侧
   * 在有子元素并且不是点状的时候生效
   */
  outside?: boolean

  /**
   * 文本内容
   */
  text?: string

  /**
   * 最大数量，超过此值时将显示 `${maxCount}+`
   */
  maxCount?: number

  /**
   * 组件的子元素，会被包含在徽标元素中
   */
  children?: ReactNode
}

/**
 * 显示一个数字或圆点的徽标。
 */
export function Badge(props: BadgeProps): JSX.Element

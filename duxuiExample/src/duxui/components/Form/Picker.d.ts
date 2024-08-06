import { ReactNode } from 'react'
import { PickerProps as TaroPickerProps } from '@tarojs/components'
import { DatePickerProps } from '../Picker/Date'
import { ModalFormProps } from './Modal'

interface PickerValueProps {
  /**
   * 占位符文本
   */
  placeholder: string
  /**
   * 当前值
   */
  value: string
}

declare const PickerValue: React.FC<PickerValueProps>

interface PickerSelectProps extends Omit<TaroPickerProps, 'value'> {
  /**
   * 当前选中的值
   */
  value: string
  /**
   * 选项范围
   */
  range: any[] | object[]
  /**
   * 占位符文本
   */
  placeholder?: string
  /**
   * 选项对象中表示名称的键名
   */
  nameKey?: string
  /**
   * 选项对象中表示值的键名
   */
  valueKey?: string
  /**
   * 值变化回调函数
   */
  onChange?: (value: string) => void
  /**
   * 子元素
   */
  children?: ReactNode
  /**
   * 传递给modalForm的属性
   */
  modalFormProps?: ModalFormProps
}

declare const PickerSelect: React.FC<PickerSelectProps>

interface PickerMultiSelectProps {
  /**
   * 当前选中的值数组
   */
  value: any[]
  /**
   * 选项范围数组
   */
  range: any[][] | object[][]
  /**
   * 选项对象中表示名称的键名
   */
  nameKey?: string
  /**
   * 选项对象中表示值的键名
   */
  valueKey?: string
  /**
   * 占位符文本
   */
  placeholder?: string
  /**
   * 值变化回调函数
   */
  onChange?: (value: any[]) => void
  /**
   * 传递给modalForm的属性
   */
  modalFormProps?: ModalFormProps
}

declare const PickerMultiSelect: React.FC<PickerMultiSelectProps>

interface PickerDateProps extends DatePickerProps {
  /**
   * 当前选中的日期值
   */
  value: string
  /**
   * 值变化回调函数
   */
  onChange?: (value: string) => void
  /**
   * 占位符文本
   */
  placeholder?: string
  /**
   * 传递给modalForm的属性
   */
  modalFormProps?: ModalFormProps
}

declare const PickerDate: React.FC<PickerDateProps>

export {
  PickerSelect,
  PickerMultiSelect,
  PickerDate,
}

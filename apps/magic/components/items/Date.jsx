import { Column, PickerDate } from '@/duxui'
import { NestFormItem } from './FormItem'
import './common.scss'

const MagicPickerDate = props => {
  return <Column className='magic-border'>
    <PickerDate {...props} />
  </Column>
}

export const Date = ({ config }) => {

  return <NestFormItem config={config}>
    <MagicPickerDate mode='date' title={config.label} placeholder='请选择' />
  </NestFormItem>
}

Date.type = 'date'

Date.Display = ({ value }) => {
  return value
}

export const Time = ({ config }) => {

  return <NestFormItem config={config}>
    <MagicPickerDate mode='time' title={config.label} placeholder='请选择' />
  </NestFormItem>
}

Time.type = 'time'

Time.Display = ({ value }) => {
  return value
}


import { Column, PickerDate } from '@/duxui'
import { FormItem } from './FormItem'
import './common.scss'

const MagicPickerDate = props => {
  return <Column className='magic-border'>
    <PickerDate {...props} />
  </Column>
}

export const Date = ({ config }) => {

  return <FormItem config={config}>
    <MagicPickerDate mode='date' title={config.label} placeholder='请选择' />
  </FormItem>
}

Date.type = 'date'

Date.Display = ({ value }) => {
  return value
}

export const Time = ({ config }) => {

  return <FormItem config={config}>
    <MagicPickerDate mode='time' title={config.label} placeholder='请选择' />
  </FormItem>
}

Time.type = 'time'

Time.Display = ({ value }) => {
  return value
}


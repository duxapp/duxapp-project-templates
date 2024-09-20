import { Column, PickerSelect } from '@/duxui'
import { FormItem } from './FormItem'
import { useSourceData } from './util'
import './common.scss'

const MagicPickerSelect = props => {
  return <Column className='magic-border'>
    <PickerSelect {...props} />
  </Column>
}

export const Select = ({ config }) => {

  const { setting = {} } = config

  const range = useSourceData(setting)

  return <FormItem config={config}>
    <MagicPickerSelect
      title={config.label}
      range={range}
      nameKey={setting.keys_label || 'label'}
      valueKey={setting.keys_value || 'value'}
      placeholder='请选择'
    />
  </FormItem>
}

Select.type = 'select'

Select.Display = ({ value, config }) => {
  return value?.[config?.setting?.keys_label || 'label']
}

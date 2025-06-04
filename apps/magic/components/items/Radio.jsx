import { Radio as UIRadio, Checkbox as UICheckbox } from '@/duxui'
import { NestFormItem } from './FormItem'

export const Radio = ({ config }) => {

  const { setting = {} } = config

  return <NestFormItem config={config}>
    <UIRadio.Group>
      {
        setting.options?.map(item => <UIRadio key={item.value} value={item.value} label={item.label} />)
      }
    </UIRadio.Group>
  </NestFormItem>
}

Radio.type = 'radio'

Radio.Display = ({ value }) => {
  return value?.label
}

export const Checkbox = ({ config }) => {

  const { setting = {} } = config

  return <NestFormItem config={config}>
    <UICheckbox.Group>
      {
        setting.options?.map(item => <UICheckbox key={item.value} value={item.value} label={item.label} />)
      }
    </UICheckbox.Group>
  </NestFormItem>
}

Checkbox.type = 'checkbox'

Checkbox.Display = ({ value }) => {
  return value?.map(item => item.label).join('、')
}

import { Radio as UIRadio, Checkbox as UICheckbox } from '@/duxui'
import { FormItem } from './FormItem'

export const Radio = ({ config }) => {

  const { setting = {} } = config

  return <FormItem config={config}>
    <UIRadio.Group>
      {
        setting.options?.map(item => <UIRadio key={item.value} value={item.value} label={item.label} />)
      }
    </UIRadio.Group>
  </FormItem>
}

Radio.type = 'radio'

Radio.Display = ({ value }) => {
  return value?.label
}

export const Checkbox = ({ config }) => {

  const { setting = {} } = config

  return <FormItem config={config}>
    <UICheckbox.Group>
      {
        setting.options?.map(item => <UICheckbox key={item.value} value={item.value} label={item.label} />)
      }
    </UICheckbox.Group>
  </FormItem>
}

Checkbox.type = 'checkbox'

Checkbox.Display = ({ value }) => {
  return value?.map(item => item.label).join('、')
}

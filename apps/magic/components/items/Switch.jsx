import { Switch as UISwitch } from '@/duxui'
import { FormItem } from './FormItem'

export const Switch = ({ config }) => {

  return <FormItem config={config}>
    <UISwitch />
  </FormItem>
}

Switch.type = 'switch'

Switch.Display = ({ value }) => {
  return value ? '打开' : '关闭'
}

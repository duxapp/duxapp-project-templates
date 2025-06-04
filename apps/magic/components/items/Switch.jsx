import { Switch as UISwitch } from '@/duxui'
import { NestFormItem } from './FormItem'

export const Switch = ({ config }) => {

  return <NestFormItem config={config}>
    <UISwitch />
  </NestFormItem>
}

Switch.type = 'switch'

Switch.Display = ({ value }) => {
  return value ? '打开' : '关闭'
}

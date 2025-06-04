import { FormItem } from '@/duxui'

export const NestFormItem = ({
  children,
  config
}) => {

  return <FormItem
    label={config.label}
    field={config.name}
    required={config.required}
    initialValue={config.setting?.default}
  >
    {children}
  </FormItem>
}

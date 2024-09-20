import { Form } from '@/duxui'

export const FormItem = ({
  children,
  config
}) => {

  return <Form.Item
    label={config.label}
    field={config.name}
    required={config.required}
    initialValue={config.setting?.default}
  >
    {children}
  </Form.Item>
}

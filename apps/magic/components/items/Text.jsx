import { Column, HtmlView, Input, Textarea as UITextarea } from '@/duxui'
import { NestFormItem } from './FormItem'
import './common.scss'

const MagicInput = props => {
  return <Column className='magic-border'>
    <Input {...props} />
  </Column>
}

export const Text = ({ config }) => {

  const { setting = {} } = config

  return <NestFormItem config={config}>
    <MagicInput maxlength={setting.maxlength} placeholder={`请输入${config.label || ''}`} />
  </NestFormItem>
}

Text.type = 'text'

Text.Display = ({ value }) => {
  return value
}

const MagicTextarea = props => {
  return <Column>
    <UITextarea {...props} />
  </Column>
}

export const Textarea = ({ config }) => {

  const { setting = {} } = config

  return <NestFormItem config={config}>
    <MagicTextarea maxlength={setting.maxlength} placeholder={`请输入${config.label || ''}`} />
  </NestFormItem>
}

Textarea.type = 'textarea'

Textarea.Display = ({ value }) => {
  return value
}

export const Number = ({ config }) => {
  const { setting = {} } = config
  return <NestFormItem config={config}>
    <MagicInput maxlength={setting.maxlength} type='number' placeholder={`请输入${config.label || ''}`} />
  </NestFormItem>
}

Number.type = 'number'

Number.Display = ({ value }) => {
  return value
}

export const Editor = ({ config }) => {

  const { setting = {} } = config

  return <NestFormItem config={config}>
    <MagicTextarea maxlength={setting.maxlength} placeholder={`请输入${config.label || ''}`} />
  </NestFormItem>
}

Editor.type = 'editor'

Editor.Display = ({ value }) => {
  return <HtmlView html={value} />
}

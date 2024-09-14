import { Text } from '@tarojs/components'
import { useMemo } from 'react'
import { font, px } from '@/duxui/utils'
import icons from './icons.json'
import './index.scss'

font.load('TestIcon', 'https://pictcdn.client.jujiang.me/fonts/TestIcon.1691639019000.ttf')

export const TestIcon = ({ name, color, size, style, className, ...props }) => {

  const _style = useMemo(() => {
    const sty = { ...style }
    if (color) {
      sty.color = color
    }
    if (size) {
      sty.fontSize = px(size)
    }
    return sty
  }, [color, size, style])

  if (!icons[name]) {
    return console.log(`TestIcon的${name}图标不存在`)
  }

  const status = font.useFont('TestIcon')

  if (!status) {
    return null
  }

  return <Text
    className={`TestIcon${className ? ' ' + className : ''}`}
    style={_style}
    {...props}
  >
    {String.fromCharCode(icons[name])}
  </Text>
}

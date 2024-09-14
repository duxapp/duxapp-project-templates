import { Text } from '@tarojs/components'
import { useMemo } from 'react'
import { font, px } from '@/duxapp/utils'
import icons from './icons.json'
import './index.scss'

font.load('CmsIcon', 'https://pictcdn.client.jujiang.me/fonts/CmsIcon.1725175618012.ttf')

export const CmsIcon = ({ name, color, size, style, className, ...props }) => {

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

  const status = font.useFont('CmsIcon')

  if (!icons[name]) {
    return console.log(`CmsIcon的${name}图标不存在`)
  }

  if (!status) {
    return null
  }

  return <Text
    className={`CmsIcon${className ? ' ' + className : ''}`}
    style={_style}
    {...props}
  >
    {String.fromCharCode(icons[name])}
  </Text>
}

import { Text } from '@tarojs/components'
import { useMemo } from 'react'
import { font, px } from '@/duxapp/utils'
import icons from './icons.json'
import './index.scss'

font.load('VideoIcon', 'https://pictcdn.client.jujiang.me/fonts/VideoIcon.1719233877538.ttf')

export const VideoIcon = ({ name, color, size, style, className, ...props }) => {

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

  const status = font.useFont('VideoIcon')

  if (!icons[name]) {
    return console.log(`VideoIcon的${name}图标不存在`)
  }

  if (!status) {
    return null
  }

  return <Text
    className={`VideoIcon${className ? ' ' + className : ''}`}
    style={_style}
    {...props}
  >
    {String.fromCharCode(icons[name])}
  </Text>
}

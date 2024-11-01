import { Text } from '@tarojs/components'
import { useMemo } from 'react'
import { font, px } from '@/duxapp/utils'
import icons from './icons.json'
import './index.scss'

if (process.env.TARO_ENV === 'rn') {
  font.loadLocal('TestIcon', require('./TestIcon.ttf'))
}

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

  return <Text
    className={`TestIcon${className ? ' ' + className : ''}`}
    style={_style}
    {...props}
  >
    {String.fromCharCode(icons[name])}
  </Text>
}

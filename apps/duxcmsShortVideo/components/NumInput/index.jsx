import { Column, Row, Text, duxappTheme, stopPropagation } from '@/duxui'
import { CmsIcon } from '@/duxcms'
import { useState } from 'react'
import classNames from 'classnames'
import './index.scss'

export const NumInput = ({ value = 0, step = 1, max, onChange, onDelete, className, style, ...props }) => {

  const [disabled, setDisabled] = useState(false)

  return <Row items='center' className={classNames('gap-3', className)} style={style} {...props}>
    {value > 0 && <Item icon='sami-select'
      // disabled={value === 1 && !onDelete}
      onClick={e => {
        stopPropagation(e)
        // if (disabled || value <= step) {
        //   if (value === 1) {
        //     onDelete?.()
        //   }
        //   return
        // }
        const res = onChange(value - step)
        if (res instanceof Promise) {
          setDisabled(true)
          res.finally(() => setDisabled(false))
        }
      }}
    />}
    {value > 0 && <Text size={2}>{value}</Text>}
    <Item icon='add-select'
      onClick={() => {
        if (disabled || (max && value + step > max)) {
          return
        }
        const res = onChange(value + step)
        if (res instanceof Promise) {
          setDisabled(true)
          res.finally(() => setDisabled(false))
        }
      }}
    />
  </Row>
}

const Item = ({ icon, onClick, disabled }) => {
  return <Column className={classNames('NumInput__num-add', disabled && 'NumInput__num-add--disabled')} items='center' justify='center'
    onClick={e => {
      stopPropagation(e)
      onClick?.()
    }}
  >
    <CmsIcon name={icon} size={32} color={duxappTheme.textColor4} />
  </Column>
}

import { Slider } from '@tarojs/components'
import { useRef, useCallback } from 'react'
import './progress.scss'

export const Progress = ({
  total,
  current,
  onChangeStart,
  onChangeEnd,
}) => {

  const start = useRef(false)

  const changing = useCallback(() => {
    if (!start.current) {
      start.current = true
      onChangeStart?.()
    }
  }, [onChangeStart])

  const change = useCallback(({ detail: { value } }) => {
    start.current = false
    onChangeEnd?.(value / 100 * total)
  }, [onChangeEnd, total])

  return <Slider
    className='VideoProgress'
    value={current}
    selectedColor='#fff'
    activeColor='#aaa'
    backgroundColor='#666'
    blockSize={12}
    blockColor='#eee'
    onChanging={changing}
    onChange={change}
  />
}

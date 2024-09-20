import { Column } from '@/duxui'
import classNames from 'classnames'
import { shortVideoHook } from '@/duxcmsShortVideo/utils'

export const ShortVideoItemCustom = ({
  item,
  isSelect,
  isShow,
  pause,
  params,
  style,
  className
}) => {

  if (!isShow) {
    return
  }
  const hookData = { item, isSelect, isShow, pause, params }

  return <Column style={style} className={classNames('w-full h-full', className)}>
    <shortVideoHook.Render mark='ShortVideoItemCustom' option={hookData} />
  </Column>
}

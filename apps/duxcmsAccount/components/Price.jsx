import { Text, userConfig } from '@/duxui'
import { accountHook } from '@/duxcmsAccount/utils'

const config = userConfig.option.duxcmsAccount?.theme?.price || { unit: '￥' }

export const Price = ({
  size = 3,
  bold,
  children = '0.00',
  pointSize = size,
  unitSize = size,
  unit = config.unit,
  ...props
}) => {

  const prices = ('' + (children || 0)).split('.')
  if (prices[1]?.[1] === '0') {
    prices[1] = prices[1].slice(0, 1)
  }

  return <Text type='danger' size={size} {...props}>
    <accountHook.Render mark='Pirce.before' option={{ props }}>
      {config.position !== 'after' && !!unit && <Text size={unitSize}>{unit}</Text>}
    </accountHook.Render>
    <Text bold={bold}>{prices[0]}</Text>
    {prices.length > 1 && prices[1] !== '0' && <Text size={pointSize}>.{prices[1]}</Text>}
    <accountHook.Render mark='Pirce.after' option={{ props }}>
      {config.position === 'after' && !!unit && <Text size={unitSize}>{unit}</Text>}
    </accountHook.Render>
  </Text>
}

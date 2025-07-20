import { chooseMediaMiddle } from '@/duxapp'
import { chooseMediaCompressor } from './utils'

if (process.env.TARO_ENV === 'rn') {
  chooseMediaMiddle(chooseMediaCompressor, -1)
}

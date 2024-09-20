import Slider from '@react-native-community/slider'
import { px } from '@/duxapp'
import './progress.scss'

export const Progress = ({
  total,
  current,
  onChangeStart,
  onChangeEnd,
}) => {

  return <Slider
    className='VideoProgress'
    value={current}
    maximumValue={total}
    maximumTrackTintColor='#ffffff'
    minimumTrackTintColor='#ffffff'
    onSlidingComplete={onChangeEnd}
    onSlidingStart={onChangeStart}
    thumbStyle={{ width: px(10), height: px(10), backgroundColor: '#999' }}
    trackStyle={{ height: px(3), borderRadius: 0, backgroundColor: '#333' }}
  />
}

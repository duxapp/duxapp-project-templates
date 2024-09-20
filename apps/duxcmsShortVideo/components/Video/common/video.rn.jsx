
import { ResizeMode, Video as ExpoVideo } from 'expo-av'
import { View } from '@tarojs/components'
import { LinearGradient, px } from '@/duxui'
import { useRef, useCallback, useState, useEffect } from 'react'
import { setKeepScreenOn } from '@tarojs/taro'

import Slider from './Slider'
import './video.scss'

export const Video = ({
  src,
  loop,
  muted,
  poster,
  initialTime,
  style,
  paused,
  onTimeUpdate
}) => {

  const video = useRef(null)

  const [status, setStatus] = useState({
    positionMillis: 0,
    durationMillis: 0
  })

  const oldPaused = useRef()

  useEffect(() => {
    if (typeof oldPaused.current === 'undefined' && paused) {
      // 首次渲染处于暂停状态 ，不处理
    } else {
      setKeepScreen(paused ? false : true)
    }
    oldPaused.current = paused
  }, [paused])

  useEffect(() => {
    const oldPausedStatus = oldPaused
    // 视频处于播放状态 则移除播放状态
    return () => {
      !oldPausedStatus.current && setKeepScreen(false)
    }
  }, [])

  // 拖动进度条的时候控制视频暂停
  const [localPaused, setLocalPaused] = useState(false)

  const load = useCallback(e => {
    setStatus(e)
  }, [])

  const update = useCallback(e => {
    onTimeUpdate?.({
      ...e,
      currentTime: e.positionMillis / 1000
    })
    setStatus(e)
  }, [])

  const seekStart = useCallback(() => {
    setLocalPaused(true)
  }, [])

  const seekEnd = useCallback(positionMillis => {
    video.current?.setStatusAsync({
      positionMillis,
    })
    setLocalPaused(false)
  }, [])

  return <>
    <View style={style}>
      <ExpoVideo
        source={{ uri: src }}
        ref={video}
        shouldPlay={!paused && !localPaused}
        isLooping={loop}
        isMuted={muted}
        usePoster
        posterSource={{ uri: poster }}
        resizeMode={ResizeMode.CONTAIN}
        positionMillis={initialTime}
        onPlaybackStatusUpdate={update}
        onLoad={load}
        style={{ width: '100%', height: '100%' }}
      />
      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} className='VideoLinear' />
      <Progress current={status.positionMillis} total={status.durationMillis} onChangeStart={seekStart} onChangeEnd={seekEnd} />
    </View>
  </>
}

const setKeepScreen = (() => {
  let count = 0
  let timer
  let oldStatus
  return status => {
    count = Math.max(count + (status ? 1 : -1), 0)
    if (count < 2) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timer = null
        const newStatus = count ? true : false
        if (newStatus !== oldStatus) {
          oldStatus = newStatus
          setKeepScreenOn({
            keepScreenOn: newStatus
          })
        }
      }, 500)
    }
  }
})();

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

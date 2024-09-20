import { Video as TaroVideo } from '@tarojs/components'
import { createVideoContext } from '@tarojs/taro'
import { useMemo, useEffect, useRef, useCallback } from 'react'

let idkey = 0
export const Video = ({
  paused,
  onProgress,
  onTimeUpdate,
  ...props
}) => {

  const id = useMemo(() => 'video-item-' + (idkey++), [])

  const video = useRef(null)

  useEffect(() => {
    if (paused) {
      video.current?.pause()
    } else {
      setTimeout(() => {
        video.current?.play()
      }, 10)
    }
  }, [paused])

  useEffect(() => {
    if (process.env.TARO_ENV !== 'rn') {
      video.current = createVideoContext(id)
    }
  }, [id])

  const progress = useCallback(e => {
    onProgress?.(e.detail.buffered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <TaroVideo onProgress={progress} id={id} controls={false}
    showCenterPlayBtn={false}
    onTimeUpdate={e => onTimeUpdate?.(e.detail)}
    showFullscreenBtn={false}
    showBottomProgress={false}
    showProgress={false}
    {...props}
  />
}

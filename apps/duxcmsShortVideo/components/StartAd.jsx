import { ObjectManage, request } from '@/duxcms'
import { useEffect, useState } from 'react'
import { Column, Text, px } from '@/duxui'
import { ShortVideoList } from './Video'
import { user, shortVideoHook } from '../utils'

export const StartAd = ({ children }) => {

  const [show, setShow] = useState(0)

  const [list, setList] = useState([])

  useEffect(() => {
    if (startAdData.data.list.length) {
      setShow(1)
      setList(startAdData.data.list)
      startAdData.set({
        ...startAdData.data,
        list: []
      })
    } else {
      setShow(2)
    }
  }, [])

  if (show === 3) {
    return children
  } else if (show === 2) {
    return <shortVideoHook.Render mark='StartAd'>
      {children}
    </shortVideoHook.Render>
  } else if (show === 1) {
    return <AdContent list={list} setShow={setShow} />
  }
}

const AdContent = ({ list, setShow }) => {

  const [time, setTime] = useState(5)

  useEffect(() => {
    let _time = 5
    const timer = setInterval(() => {
      _time--
      if (_time === 0) {
        setShow(3)
        clearInterval(timer)
        return
      }
      setTime(_time)
    }, 1000)
    return () => clearInterval(timer)
  }, [setShow])

  return <Column grow>
    <ShortVideoList list={list} url='none' hideMenus area='start' />
    <Column className='absolute right-0 r-max pv-2 ph-2 items-center justify-center' style={{ bottom: px(100), right: px(32), backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <Text size={2} color={4} onClick={() => setShow(3)}>{time}s 跳过</Text>
    </Column>
  </Column>
}

class StartAdData extends ObjectManage {
  constructor() {
    super({
      cache: true,
      cacheKey: 'short-video-start-ad'
    })
    const { remove } = user.onLoginStatus(status => {
      if (status && !this.data.list.length) {
        remove()
        setTimeout(() => {
          request({
            url: 'advert/advert',
            data: {
              area: 'start',
              limit: 1
            }
          }).then(res => {
            this.set({
              ...this.old,
              list: res
            })
          })
        }, 1000)
      }
    })
  }

  data = {
    list: []
  }
}

const startAdData = new StartAdData()

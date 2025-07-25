import { useCallback, useEffect, useRef, useState } from "react"

export const useVerifyCode = () => {
  const [text, setText] = useState('获取验证码')

  const [load, setLoad] = useState(false)

  const timer = useRef(null)

  useEffect(() => {
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  const status = load ? 2 : text === '获取验证码' ? 0 : text === '重新获取' ? 1 : 3

  const getCode = useCallback(callback => {
    if (status > 1) {
      return
    }
    if (timer.current) {
      clearInterval(timer.current)
    }
    setLoad(true)
    return callback().then(res => {
      let time = 60
      timer.current = setInterval(() => {
        if (time <= 0) {
          clearInterval(timer.current)
          timer.current = null
          setText('重新获取')
        } else {
          setText(--time + 's')
        }
      }, 1000)
      setText(time + 's')
      setLoad(false)
      return res
    }).catch(err => {
      setLoad(false)
      throw err
    })
  }, [])

  return {
    text,
    getCode,
    // 0第一次获取 1重新获取 2获取中 3倒计时
    status
  }
}

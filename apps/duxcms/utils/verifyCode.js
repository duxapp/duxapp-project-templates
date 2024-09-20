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

  const getCode = useCallback(callback => {
    setLoad(true)
    return callback().then(res => {
      let time = 60
      timer.current = setInterval(() => {
        if (time <= 0) {
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
    status: load ? 2 : text === '获取验证码' ? 0 : text === '重新获取' ? 1 : 3
  }
}
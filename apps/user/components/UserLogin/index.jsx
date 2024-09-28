import { View } from '@tarojs/components'
import { getCurrentPages } from '@tarojs/taro'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { user } from '@/user/utils'
import { TopView } from '@/duxapp'

const LoginPage = ({
  load,
  onLoad,
  Page
}) => {

  const [key, setKey] = useState(0)

  // 让Page生效
  useEffect(() => {
    setKey(old => ++old)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (user.isLogin()) {
        onLoad(2)
      } else {
        onLoad(1)
      }
    }, 50)
  }, [onLoad])

  const Login = useMemo(() => {
    return Page || user.getCurrentConfig()?.UserLogin || View
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, Page])

  const login = useCallback(res => {
    const loginStatus = !!res?.data
    if (loginStatus) {
      user.setInfo(res.data)
      user.setLoginStatus(loginStatus, res.type, false)
      onLoad(2)
    }
  }, [onLoad])

  if (load === 0) {
    return null
  }
  return <Login type='page' onLogin={login} />
}

export const UserLogin = (() => {
  let status = 0
  return function Login({
    children,
    Login: Page
  }) {

    const pageLength = useMemo(() => getCurrentPages().length, [])

    const [load, setLoad] = useState(status) // 0加载中 1未登录 2已登录

    const onLoad = useCallback(val => {
      setLoad(val)
      status = val
    }, [])

    useEffect(() => {
      const { remove } = user.onLoginStatus(v => {
        if (!v) {
          onLoad(1)
        }
      })
      return () => remove()
    }, [onLoad])

    if (load === 2 || pageLength > 1) {
      return children
    }

    return <LoginPage load={load} onLoad={onLoad} Page={Page} />
  }
})()

UserLogin.start = Login => {
  TopView.add([
    UserLogin,
    {
      Login
    }
  ])
}

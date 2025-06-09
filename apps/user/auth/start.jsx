import { View } from '@tarojs/components'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { user, pages, useRoute, route, TopView } from '@/user'

export default function Auth() {

  const [load, setLoad] = useState(true)

  const { path } = useRoute()

  const indexPage = useMemo(() => {
    const _pages = Object.keys(pages)
    const nextPage = _pages[_pages.indexOf(path) + 1]
    return nextPage
  }, [path])

  const [key, setKey] = useState(0)

  // 让Page生效
  useEffect(() => {
    setKey(old => ++old)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (user.isLogin()) {
        route.redirect(indexPage)
      } else {
        setLoad(false)
      }
    }, 400)
  }, [indexPage])

  const Login = useMemo(() => {
    return user.getCurrentConfig()?.UserLogin || View
  }, [key])

  const login = useCallback(res => {
    const loginStatus = !!res?.data
    if (loginStatus) {
      user.setInfo(res.data)
      user.setLoginStatus(loginStatus, res.type, false)
      route.redirect(indexPage)
    }
  }, [indexPage])

  return <TopView>
    <Login type='start' onLogin={login} />
  </TopView>
}

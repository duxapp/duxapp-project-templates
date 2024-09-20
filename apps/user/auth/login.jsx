import { View } from '@tarojs/components'
import { useCallback, useMemo } from 'react'
import { TopView, nav, user } from '@/user'

export default function AuthLogin() {

  const Login = useMemo(() => {
    return user.getCurrentConfig()?.UserLogin || View
  }, [])

  const login = useCallback(e => {
    nav('back:', e)
  }, [])

  return <TopView isForm>
    <Login type='login' onLogin={login} />
  </TopView>
}

import { request } from '@/duxcms'
import { user } from '@/duxappUser'
import { loading } from '@/duxui'
import { useEffect, useState, useCallback } from 'react'

export const useLike = (id, type = 'article', defaultValue) => {
  const [, loingStatus] = user.useUserInfo()

  const [status, setStatus] = useState(false)

  const [count, setCount] = useState(0)

  useEffect(() => {
    if(count === 0 && defaultValue) {
      setCount(defaultValue)
    }
  }, [count, defaultValue])

  const action = useCallback(async () => {
    if (!id) {
      return console.log('参数错误')
    }
    if (!user.isLogin()) {
      await user.login()
    }
    await request({
      url: `member/praise/${type}/${id}`,
      method: 'POST',
      loading,
      toast: true
    })
    setStatus(old => !old)
    setCount(old => old + (status ? -1 : 1))
  }, [id, status, type])

  useEffect(() => {
    if (id && loingStatus) {
      request(`member/praise/${type}/${id}`).then(res => {
        setStatus(res.status)
        setCount(res.count)
      })
    }
  }, [id, loingStatus, type])

  if (!loingStatus) {
    return [false, { action, count }]
  }
  return [status, { action, count }]
}

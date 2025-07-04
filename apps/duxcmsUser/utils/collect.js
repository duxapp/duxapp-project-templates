import { request } from '@/duxcms'
import { user } from '@/duxappUser'
import { loading } from '@/duxui'
import { useEffect, useState, useCallback } from 'react'

/**
 * 收藏操作
 */
export const collect = {
  types: [],
  addItem: (type, item) => {
    if (typeof type === 'string') {
      type = { ...item, type }
    }
    collect.types.push(type)
  },
  useCollect: (id, type = 'article') => {
    const [, loingStatus] = user.useUserInfo()

    const [status, setStatus] = useState(false)

    const action = useCallback(async () => {
      if (!id) {
        return console.log('收藏参数错误')
      }
      if (!user.isLogin()) {
        await user.login()
      }
      await request({
        url: `member/collect/${type}/${id}`,
        method: 'POST',
        loading,
        toast: true
      })
      setStatus(old => !old)
    }, [id, type])

    useEffect(() => {
      if (loingStatus && id) {
        request(`member/collect/${type}/${id}`).then(res => {
          setStatus(res.status)
        })
      } else {
        setStatus(false)
      }
    }, [id, loingStatus, type])

    if (!loingStatus) {
      return [false, { action }]
    }
    return [status, { action }]
  }
}


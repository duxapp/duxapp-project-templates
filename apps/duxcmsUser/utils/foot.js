import { request } from '@/duxcms'
import { user } from '@/user'
import { useEffect } from 'react'

/**
 * 足迹
 */
export const foot = {
  types: [],
  addItem: (type, item) => {
    if (typeof type === 'string') {
      type = { ...item, type }
    }
    foot.types.push(type)
  },
  useFoot: (id, type) => {
    const [, loingStatus] = user.useUserInfo()

    useEffect(() => {
      if (!id) {
        return console.log('足迹参数错误')
      }
      if (!loingStatus) {
        return
      }
      request({
        url: `member/foot/${type}/${id}`,
        method: 'POST',
        toast: true
      })
    }, [id, loingStatus, type])
  }
}

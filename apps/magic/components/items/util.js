import { request } from '@/duxcms'
import { useEffect, useMemo, useState } from 'react'

export const useSourceData = (setting, params) => {
  const defaulData = useMemo(() => {
    if (setting.source) {
      return []
    }
    if (typeof setting.options === 'string') {
      try {
        return JSON.parse(setting.options)
      } catch (error) {
        return []
      }
    }
    return setting.options || []
  }, [setting.options, setting.source])

  const [data, setData] = useState(defaulData)

  useEffect(() => {
    if (setting.source) {
      request({
        url: 'tools/magic/source',
        repeatTime: 0,
        data: {
          name: setting.source,
          ...params
        }
      }).then(setData)
    }
  }, [params, setting.source])

  return data
}

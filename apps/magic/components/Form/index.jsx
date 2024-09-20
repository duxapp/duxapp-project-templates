import { useCallback, useEffect, useState } from 'react'
import { request } from '@/duxcms'
import { Form } from '@/duxui'
import { items } from '../items'

export const MagicForm = ({
  id,
  table,
  config,
  values,
  formProps
}) => {

  const { fields } = useConfig(table, config)

  const getDefaultValue = useCallback(() => {
    if (values) {
      return values
    }
    if (!id) {
      return {}
    }
    return request(`tools/magic/${table}/${id}`)
  }, [id, table, values])

  return <Form direction='vertical' {...formProps} defaultValues={getDefaultValue}>
    {
      fields.map(field => {
        const item = items[field.type]

        if (!item?.Form) {
          return null
        }
        return <item.Form key={field.name} config={field} />
      })
    }
  </Form>
}

const useConfig = (table, config) => {

  const [data, setData] = useState(config || {})

  useEffect(() => {
    // 获取数据
    if (!data.type && table) {
      request('tools/magic/config?table=' + table).then(setData)
    }

  }, [data.type, table])

  return data
}

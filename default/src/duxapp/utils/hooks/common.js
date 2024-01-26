import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { QuickEvent } from '../QuickEvent'

export const creatGlobalState = defaultData => {

  const event = new QuickEvent()

  let newData = defaultData

  return {
    useState: () => {

      const [data, setData] = useState(newData)

      const { remove } = useMemo(() => event.on(setData), [])

      useEffect(() => () => remove(), [remove])

      return data
    },
    setState: data => {

      newData = typeof data === 'function' ? data(newData) : data

      event.trigger(newData)
    }
  }
}

export const creatContextState = () => {

  const context = createContext([void 0, () => console.error('setState 方法不在 Provider 作用域内')])

  return {
    useState: () => {
      return useContext(context)
    },
    Provider: ({ defaultValue, children }) => {

      const value = useState(defaultValue)

      return <context.Provider value={value}>
        {children}
      </context.Provider>
    }
  }
}

export const contextState = creatContextState()

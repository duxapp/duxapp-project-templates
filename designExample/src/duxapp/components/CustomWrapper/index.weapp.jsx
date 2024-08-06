
import { CustomWrapper as TaroCustomWrapper } from '@tarojs/components'
import { createContext, useContext, useMemo } from 'react'

const context = createContext({ id: null })


export const CustomWrapper = (() => {
  let _id = 0
  return function CustomWrapperComp({
    children,
    ...props
  }) {

    const id = useMemo(() => 'CustomWrapper' + (_id++), [])
    return <context.Provider value={{ id }}>
      <TaroCustomWrapper id={id} {...props}>
        {children}
      </TaroCustomWrapper>
    </context.Provider>
  }
})()

CustomWrapper.useContext = () => useContext(context)

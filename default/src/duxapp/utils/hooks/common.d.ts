import { ComponentType, ReactNode } from 'react'

/**
 * 创建一个全局作用域的 state
 * @param initialState
 */
export function creatGlobalState<S>(initialState: S): {
  useState: () => S
  setState: (value: S | ((prevState: S) => S)) => void
}

interface ContextStateProviderProps {
  /**
   * 默认值
   */
  defaultValue: any
  children: ReactNode
}

/**
 * 创建一个局部作用域的 state
 */
export function creatContextState(): {
  useState: () => [any, (value: any | ((prevState: any) => any)) => void]
  Provider: ComponentType<ContextStateProviderProps>
}

/**
 * 创建一个局部作用域的 state
 */
export const contextState: {
  useState: () => [any, (value: any | ((prevState: any) => any)) => void]
  Provider: ComponentType<ContextStateProviderProps>
}


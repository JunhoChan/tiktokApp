import React, { useReducer, createContext } from 'react'
import initialState from './state'
import { UPDATE_SHOW_MESSAGE } from './type'

export const StoreContext: React.Context<any> = createContext({})

const reducer = (state: any, action: { type: string; value: any }) => {
  switch (action.type) {
    case UPDATE_SHOW_MESSAGE:
      console.log(action.value)
      return { ...state, isShowMessage: action.value }
    default:
      return state
  }
}

const StoreReducer = (props: { children: any }) => {
  const [state, origin_dispatch] = useReducer(reducer, initialState)
  const dispatch = (action: any) => {
    if (typeof action === 'function') {
      return action(origin_dispatch)
    }
    return origin_dispatch(action)
  }
  return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>
}

export default StoreReducer

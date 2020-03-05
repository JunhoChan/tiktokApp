import React, { useReducer, createContext } from 'react'

export const StoreContext: React.Context<any> = createContext({})

export const UPDATE_TOUCH_TARGET_INSTANCE: string = 'UPDATE_TOUCH_TARGET_INSTANCE'

const initialState = {
  touchInstance: null // 当前播放视频的touch实例
}

const reducer = (state: any, action: { type: string; instance: string }) => {
  switch (action.type) {
    case UPDATE_TOUCH_TARGET_INSTANCE:
      return { ...state, instance: action.instance }
    default:
      return state
  }
}

/**
 *  action 支持传入一个异步的函数,如：
 *  const increaseCount = async dispatch => {
 *      await sleep(1000);
 *      dispatch({ type: 'increase' });
 *  }
 *  调用：
 *  dispatch(increaseCount)
 */
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

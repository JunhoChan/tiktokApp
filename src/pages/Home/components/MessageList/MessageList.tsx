import React, { memo, useState, useEffect, useContext } from 'react'
import { StoreContext } from '@/reducer'
import { UPDATE_SHOW_MESSAGE } from '@/reducer/type'
import UserMessage from '@/components/UserMessage/UserMessage'
import LoadingMessage from './../LoadingMessage/LoadingMessage'
import selfApi from '@/api'

import './MessageList.less'
// 用于prop类型校验
type Prop = {}
const MessageListWrapper: React.FC<Prop> = (props) => {
  // 状态管理
  const [messageDatas, setMessages]: any = useState([])
  const { state, dispatch } = useContext(StoreContext)
  console.log(state.isShowMessage)
  useEffect(() => {
    getVideoMessage()
  }, [])

  /**
   * @description 获取视频消息
   */
  function getVideoMessage() {
    selfApi
      .getVideoMessage()
      .then((res) => {
        if (res.status === 200) {
          res.data.forEach((item: any, index: number) => {
            !index ? (item.isShow = true) : (item.isShow = false)
          })
          setMessages(res.data)
          return true
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**
   * @description 更新消息
   * @param res
   */
  function updateMoreMessage(res: any, index: number) {
    const datas = [...messageDatas]
    Array.isArray(res) && res.length === 0
      ? (datas[index]['isReplay'] = false)
      : (datas[index]['children'] = datas[index]['children'].concat(res))
    datas[index]['isReplay'] = false
    setMessages(datas)
  }

  /**
   * 渲染子消息组件
   */
  function renderChildMessage(fMessage: any, pIndex: number): any {
    const { children } = fMessage
    const childComponents = [] // 存储子组件信息
    if (children && Array.isArray(children) && children.length > 0) {
      for (let i = 0; i <= children.length - 1; i++) {
        if (i !== children.length - 1) children[i].isShow = true
        childComponents.push(<UserMessage key={'child-message' + i} message={children[i]} isChild={true}></UserMessage>)
      }
      return childComponents
    } else {
      return ''
    }
  }

  return (
    <div className={`video-message-list ${state.isShowMessage ? 'isVisiable' : null}`}>
      <div className="onMask"></div>
      <div className="video-message-list_header">
        <div className="title">
          3.2<em className="subtitle">W</em>条评论
        </div>
        <div className="icon-close" onClick={() => dispatch({ type: UPDATE_SHOW_MESSAGE, value: false })}>
          X
        </div>
      </div>
      <div className="video-message-list_inner">
        {messageDatas.map((pMessage: any, index: number) => {
          return (
            <div className="video-message-item_wrapper" key={'message' + index}>
              <UserMessage message={pMessage} isChild={false}></UserMessage>
              <div className="video-message-item-child">
                {renderChildMessage(pMessage, index)}
                <LoadingMessage
                  isReplay={pMessage.isReplay}
                  pMsgIndex={index}
                  updateMessage={(res: any, pIndex: number) => updateMoreMessage(res, pIndex)}
                ></LoadingMessage>
              </div>
            </div>
          )
        })}
      </div>
      <div className="video-message-list_edit-input">
        <div className="placeholder">留下你的精彩评论吧!</div>
        <div contentEditable={true}></div>
      </div>
    </div>
  )
}

export default memo(MessageListWrapper)

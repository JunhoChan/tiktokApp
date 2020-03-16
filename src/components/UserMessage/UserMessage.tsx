import React, { memo } from 'react'
import './UserMessage.less'
import LoveIcon from './svg/love.svg'
import LoveIconChecked from './svg/redLove.svg'

interface messageInt {
  username: string
  content: string
  isShow: boolean
  createTime: string
  likeNum: number
  isReplay: boolean
  avator: string
}

// 用于prop类型校验
type Prop = {
  message: messageInt
  isChild: boolean
}

const UserMessageWrapper: React.FC<Prop> = (props) => {
  const { message, isChild } = props
  // 状态管理
  return (
    <div className={`video-user-message_wrapper ${isChild ? 'isChild' : ''}`}>
      <img className={`message-user-avator ${isChild ? 'isChild' : ''}`} alt="user-avator" src={message.avator} />
      <div className={`message-content  ${isChild ? 'isChild' : ''}`}>
        <div className="message-user_section">
          <div className="username">{message.username}</div>
          <div className="message-content_inner">
            <span className="message-text">{message.content}</span>
            <span className="message-create-time">{message.createTime}</span>
          </div>
        </div>

        <div className="message-like_section">
          <div className="message-like_section_inner">
            <LoveIcon className="message-icon-love"></LoveIcon>
            <div>{message.likeNum}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(UserMessageWrapper)

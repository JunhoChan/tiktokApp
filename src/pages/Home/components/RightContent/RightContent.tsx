import React, { memo, useEffect, useRef, useState } from 'react'
import './RightConetnt.less'
// handle child ref by useImperativeHandle method
import MsgIcon from './icon/message.svg'
import WechatIcon from './icon/wechat.svg'
import LoveIcon from './icon/love.svg'

// 用于prop类型校验
type Prop = {}
const RightWrapper: React.FC<Prop> = (props) => {
  return (
    <div className="home-right__wrapper">
      <div className="right-bottom">
        <img
          alt="avator"
          className="avator"
          src="http://img2.imgtn.bdimg.com/it/u=3103735363,3403758407&fm=26&gp=0.jpg"
        ></img>
        <LoveIcon className="svg-image"></LoveIcon>
        <div className="count-txt">2.9w</div>
        <MsgIcon className="svg-image"></MsgIcon>
        <div className="count-txt">2.9w</div>
        <WechatIcon className="svg-image isScale"></WechatIcon>
        <div className="count-txt">2.9w</div>
      </div>
      <div className="pay-icon rotateCircle">
        <img
          alt="avator"
          className="avator"
          src="http://img2.imgtn.bdimg.com/it/u=3103735363,3403758407&fm=26&gp=0.jpg"
        ></img>
      </div>
    </div>
  )
}

export default memo(RightWrapper)

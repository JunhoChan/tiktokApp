import React, { memo, useEffect, useRef, useState } from 'react'
import './BottomContent.less'
import TikTok from './TikTok.svg'

// 用于prop类型校验
type Prop = {
  description: string
}
const BottomWrapper: React.FC<Prop> = (props) => {
  const { description } = props
  return (
    <div className="home-bottom__wrapper">
      <div className="video-name">
        <span className="video-name_icon">@</span> you
      </div>
      <div className="video-des">{description}</div>
      <div className="music-origin">
        <TikTok className="music-origin_icon"></TikTok>
        <span className="music-origin">
          <div className="music-origin_txt">xxx的原声</div>
        </span>
      </div>
    </div>
  )
}

export default memo(BottomWrapper)

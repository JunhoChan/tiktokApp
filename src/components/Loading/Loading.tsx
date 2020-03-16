import React, { memo } from 'react'
import './Loading.less'

// 用于prop类型校验
type Prop = {}
const LoadingWrapper: React.FC<Prop> = (props) => {
  return (
    <div className="loading-wrapper">
      <div className="loading-icon"></div>
      {/* <div className="loading-text">正在拼命加载</div> */}
    </div>
  )
}

export default memo(LoadingWrapper)

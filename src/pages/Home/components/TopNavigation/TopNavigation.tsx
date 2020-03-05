import React, { memo } from 'react'
import './TopNavigation.less'

// 用于prop类型校验
type Prop = {
  videoType: String
}

const topNavigation: React.FC<Prop> = (props) => {
  const { videoType } = props
  return (
    <div className={`top-navigation_wrapper ${videoType === 'recommend' ? 'isRecommend' : null}`}>
      <div className={`top-navigation-txt ${videoType === 'follow' ? 'isCurrent' : null}`}>关注</div>
      <div className={`top-navigation-txt ${videoType === 'recommend' ? 'isCurrent' : null}`}>推荐</div>
    </div>
  )
}

export default memo(topNavigation)

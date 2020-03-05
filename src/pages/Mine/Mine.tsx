import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
// 用于prop类型校验
type Props = {}

const MinePage: React.FC<Props> = () => {
  return <div className="App">我的</div>
}

const MinePageRouter = withRouter(MinePage)
export default memo(MinePageRouter)

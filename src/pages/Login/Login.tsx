import React from 'react'
import { withRouter } from 'react-router-dom'
// 用于prop类型校验
type Props = {}

const LoginPage: React.FC<Props> = () => {
  return <div className="App">登录</div>
}

const LoginPageRouter = withRouter(LoginPage)
export default LoginPageRouter

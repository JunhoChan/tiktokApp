import React, { useEffect } from 'react'
import { Routes } from '@/interfaces/router/Router'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { routes } from '@/router/router'
import renderRoutes from '@/utils/renderRouters'
import BottomBar from '@/components/BottomBar/BottomBar'

import './index.less'

const mobileHomePage: React.FC<Routes> = (routes: Routes) => {
  useEffect(() => {
    if (routes.location.pathname === '/') {
      routes.history.push('/home')
    }
  }, [routes.history, routes.location.pathname])
  return (
    <div className="container">
      <div className="content">{renderRoutes(routes.route.routes, false, '/')}</div>
      <div className="footer">
        <BottomBar />
      </div>
    </div>
  )
}

export default mobileHomePage

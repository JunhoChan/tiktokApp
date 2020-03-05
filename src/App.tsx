import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import renderRoutes from '@/utils/renderRouters'
import { routes, basename } from './router/router'
import axios from 'axios'

const authed = false
const authPath = '/login'

const App: React.FC = () => {
  return <BrowserRouter basename={basename}>{renderRoutes(routes, authed, authPath)}</BrowserRouter>
}

export default App

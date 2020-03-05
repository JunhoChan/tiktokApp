import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import '@/static/styles/reset.less'
import StoreReducer from '@/reducer'

ReactDOM.render(
  <StoreReducer>
    <App />
  </StoreReducer>,
  document.getElementById('root')
)

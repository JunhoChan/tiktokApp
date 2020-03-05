import * as React from 'react'
import { useState, useEffect } from 'react'
import { Routes } from '@/interfaces/router/Router'
import { Link } from 'react-router-dom'

import './BottomBar.less'

// 用于prop类型校验
type Props = {}

const BottomBar: React.FC<Props> = (props) => {
  const tabDatas: Array<any> = [
    {
      name: '主页',
      path: '/home'
    },
    {
      name: '广州',
      path: '/home'
    },
    {
      name: '+',
      path: '/home'
    },
    {
      name: '主页',
      path: '/home'
    },
    {
      name: '我',
      path: '/mine'
    }
  ]
  const [currentIndex, setCurIndex] = useState(0)

  return (
    <div className="junho-bottom-bar">
      {tabDatas.map((item, index) => {
        return (
          <div
            className={`junho-tab-item ${currentIndex === index ? 'is-selected ' : ''}`}
            key={index}
            onClick={() => setCurIndex(index)}
          >
            <Link to={item.path}>{index === 2 ? <em className="junho-icon__plus">{item.name}</em> : item.name}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default BottomBar

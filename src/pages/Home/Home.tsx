import React, { memo, useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Routes } from '@/interfaces/router/Router'
import './Home.less'
// handle child ref by useImperativeHandle method
import selfApi from '@/api'

import { Swiper } from 'junho-mobile-touch'
import VideoTool from '@/components/VideoTool/VideoTool'

import TopNavigation from './components/TopNavigation/TopNavigation'
import RightContent from './components/RightContent/RightContent'
import BottomContent from './components/BottomContent/BottomContent'
// 用于prop类型校验

const HomePage: React.FC<Routes> = (Props: Routes) => {
  const homeElement = useRef(null)
  const leftElement = useRef(null)
  const rightElement = useRef(null)

  const [videoType, setVideoType]: any = useState('follow') // follow recommend
  // 记录当前查看的是那个视频类型的下标
  const [followIndex, setFollowIndex]: any = useState(0)
  const [recommendIndex, setRecommendIndex]: any = useState(0)

  // 资源数据
  const [resources, setResources]: any = useState([])

  useEffect(() => {
    getHomeResources()
  }, [])

  const componentWillUnmount = (homeSwiper: any, followSwiper: any, recommendSwiper: any) => {
    homeSwiper.stopSwiper()
    followSwiper.stopSwiper()
    recommendSwiper.stopSwiper()
  }
  /**
   * 获取首页视频数据
   */
  function getHomeResources() {
    selfApi
      .getHomeResources(1, 5, 'all')
      .then((res) => {
        if (res.status === 200) {
          setResources(res.data)
          return _initSwiper()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /**
   * 初始化滑动实例
   */
  function _initSwiper() {
    const homeSwiper = new Swiper(homeElement.current, 'home-video', 'horizontal', (res: any) => {
      if (parseInt(res) === 0) {
        setVideoType('follow')
        recommendSwiper && recommendSwiper.stopSwiper()
        followSwiper && followSwiper.sartOrResumeSwiper()
      } else {
        setVideoType('recommend')
        followSwiper && followSwiper.stopSwiper()
        recommendSwiper && recommendSwiper.sartOrResumeSwiper()
      }
    })
    const followSwiper = new Swiper(leftElement.current, 'follow-video', 'verticle', (res: any) => {
      setFollowIndex(res)
    })
    const recommendSwiper = new Swiper(rightElement.current, 'recommend-video', 'verticle', (res: any) => {
      setRecommendIndex(res)
    })
    homeSwiper.sartOrResumeSwiper()
    followSwiper.sartOrResumeSwiper()
    // return componentWillUnmount(homeSwiper, followSwiper, recommendSwiper)
  }

  return (
    <div className="home-page" ref={homeElement}>
      <TopNavigation videoType={videoType}></TopNavigation>
      {resources.map((resource: any, tabIndex: number) => {
        return (
          <ul
            className={`home-video ${!tabIndex ? 'follow-wrapper' : 'recommend-wrapper'}`}
            ref={!tabIndex ? leftElement : rightElement}
            key={'homeTab' + tabIndex}
          >
            {resource.children.map((videoResource: any, rIndex: number) => {
              return (
                <li className={`video-item ${!tabIndex ? 'follow-video' : 'recommend-video'}`} key={'video' + rIndex}>
                  <div className="video-item_inner">
                    <VideoTool
                      url={'http://localhost:3001' + videoResource.videoUrl}
                      isCurrent={
                        (followIndex === rIndex && videoType === 'follow') ||
                        (recommendIndex === rIndex && videoType === 'recommend')
                      }
                      poster={'http://localhost:3001' + videoResource.avatorUrl}
                    ></VideoTool>
                  </div>
                  <RightContent></RightContent>
                  <BottomContent description={videoResource.description}></BottomContent>
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}

const HomePageRouter = withRouter(HomePage)
export default memo(HomePageRouter)

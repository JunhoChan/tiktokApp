import React, { useRef, useEffect, useState } from 'react'
import { TouchTag } from 'junho-mobile-touch'

import PlayIcon from './play.svg'
import './VideoTool.less'
import LovaAnimation from '../LoveAnimation/love'

// 用于prop类型校验
type Props = {
  url: string // 播放地址
  isCurrent: Boolean // 当前可以播放啦
  poster: string // 封面
}

const VideoTool: React.FC<Props> = (props) => {
  const { url, isCurrent, poster } = props

  const maskElement = useRef(null)
  const videoElement: any = useRef(null)
  const canvasElement = useRef(null)
  const imageElement = useRef(null)

  const [timer, setTimer]: any = useState(null)
  const [isPlay, setPlayStatus]: any = useState(false)
  const [loveCount, setLoveCount] = useState(0)

  useEffect(() => {
    let target: any = null
    if (isCurrent) {
      target = handleTouchEvent()
      videoElement.current.load()
      const canvas: any = canvasElement.current
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth * 2
      canvas.height = window.innerHeight * 2
      ctx.drawImage(imageElement.current, 0, 0, canvas.width, canvas.height)
      setPlayStatus(true)
      draw(ctx, canvas)
    } else if (!isCurrent && timer) {
      if (target) target.destroyTouchInstance()
      target = null
      videoElement.current.pause()
      clearInterval(timer)
      setTimer(null)
    }
  }, [isCurrent])
  function handleTouchEvent() {
    LovaAnimation.initLoveAnimation()
    let isPlayVideo = true
    let loveNumber = 0
    const touchTarget = new TouchTag(maskElement.current, (res: string) => {
      if (!isCurrent) touchTarget.destroyTouchInstance()
      switch (res) {
        case 'simple':
          loveNumber = 0
          isPlayVideo = !isPlayVideo
          handleTogglePlayVideo(isPlayVideo)
          break
        case 'double':
          isPlayVideo = true
          handleTogglePlayVideo(isPlayVideo)
          loveNumber++
          loveNumber <= 5 ? loveNumber++ : LovaAnimation.createHeart()
          break
        case 'long':
          loveNumber = 0
          break
      }
    }).startTouchTag()
    return touchTarget
  }

  function draw(ctx: any, canvas: any) {
    const video: any = videoElement.current
    video.play()
    setTimer(
      setInterval(() => {
        ctx.drawImage(videoElement.current, 0, 0, canvas.width, canvas.height)
      }, 50)
    )
  }
  function handleTogglePlayVideo(isPlayVideo: boolean) {
    if (isPlayVideo) {
      videoElement.current.play()
      setPlayStatus(true)
    } else {
      videoElement.current.pause()
      setPlayStatus(false)
    }
  }
  return (
    <div className="junho-video__panel">
      <div className={'video-mask'} ref={maskElement}>
        <PlayIcon className={`play-icon  ${isPlay ? 'isHidden' : null}`} />
      </div>
      <img ref={imageElement} alt="poster" src={poster} className="junho-video_image" />
      <video
        ref={videoElement}
        src={url}
        className="junho-vedio_inner"
        x-webkit-airplay="allow"
        webkit-playsinline=""
        preload="auto"
        loop
        controls={true}
        poster={poster}
        muted
      />
      <canvas ref={canvasElement} className="junho-video_canvas" id="canvas"></canvas>
    </div>
  )
}

export default VideoTool

import React, { memo, useState } from 'react'
import './LoadingMessage.less'
import selfApi from '@/api'

import LoadingIcon from '@/components/Loading/Loading'

type Prop = {
  isReplay: boolean
  updateMessage: any
  pMsgIndex: number
}

const LoadingMessageWrapper: React.FC<Prop> = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const { isReplay, pMsgIndex, updateMessage } = props

  /**
   * 获取更多信息
   */
  function getMoreMessage() {
    setLoading(true)
    selfApi
      .getReplyMessage(page, 1)
      .then((res) => {
        setTimeout(() => {
          setPage(page + 1)
          setLoading(false)
          if (res.status === 200 && res.data.length > 0) {
            updateMessage(res.data, pMsgIndex)
          } else {
            updateMessage([], pMsgIndex)
          }
        }, 1000)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  return isReplay ? (
    !isLoading ? (
      <button className="more-message_btn" onClick={() => getMoreMessage()}>
        {!isReplay ? '展开222条消息' : '展开更多消息'}
      </button>
    ) : (
      <LoadingIcon></LoadingIcon>
    )
  ) : null
}

export default memo(LoadingMessageWrapper)

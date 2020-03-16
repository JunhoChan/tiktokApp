import httpRequest from '@/utils/axios'

export default {
  getHomeResources(page: number, size: number, type: string) {
    return httpRequest.get('/home/video')
  },

  getVideoMessage() {
    return httpRequest.get('/home/message')
  },

  getReplyMessage(page: number, size: number) {
    const params = { page: page, size: size }
    return httpRequest.get('/home/replyMessage', { params: params })
  }
}

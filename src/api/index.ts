import httpRequest from '@/utils/axios'

export default {
  getHomeResources(page: number, size: number, type: string) {
    return httpRequest.get('/home/video/cn')
  }
}

const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const router = new Router()

/**
 * 首页接口
 */
router.get('/home/video', function (ctx) {
  const videoDatas = fs.readFileSync(path.join(__dirname+'/./datas/video.json')).toString()
  ctx.body = videoDatas
})


/**
 * 视频消息接口
 */
router.get('/home/message', function (ctx) {
  const messageDatas = fs.readFileSync(path.join(__dirname+'/./datas/message.json')).toString()
  ctx.body = messageDatas
})


/**
 * 回复消息接口
 */
router.get('/home/replyMessage', function (ctx) {
  const page = ctx.request.query.page
  const size = ctx.request.query.size
  let messageDatas = fs.readFileSync(path.join(__dirname+'/./datas/replayMessage.json')).toString()
  const preCount = (page - 1) * size // 上一页
  const endIndex = page * size // 结束下标
  messageDatas = JSON.parse(messageDatas)
  const result = []
  for (let i = preCount; i < endIndex; i++) {
    if (result.length === size) break;
    if (messageDatas[i]) result.push(messageDatas[i])
  }
  ctx.body = JSON.stringify(result)
})

module.exports = router

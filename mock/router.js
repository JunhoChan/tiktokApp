const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const router = new Router()

// 首页信息
const videoDatas = fs.readFileSync(path.join(__dirname+'/./datas/video.json')).toString()

/**
 * 中文首页接口
 */
router.get('/home/video/cn', function (ctx, next) {
  ctx.set('Content-Type', 'application/json')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = videoDatas
  next()
  // ctx.res.end()
})

module.exports = router

const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');
const myRouter = require('./router'); 
const cors = require('koa2-cors');

// 绑定静态目录
const resources = serve(path.join(__dirname+'/static'));
app.use(resources);

// cors
app.use(cors({
  origin: function (ctx) {
      return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 绑定路由
app
  .use(myRouter.routes())
  .use(myRouter.allowedMethods())

 // 监听错误
 app.on('error', (error) => {
  if (error.code === 'EPIPE') {
    console.warn('Koa app-level EPIPE error.', { error })
  } else {// 隐藏错误可以用logger库去实现错误事件监听
    return true
  }
})

app.listen(3001,function(){
    console.log("监听3001端口")
});

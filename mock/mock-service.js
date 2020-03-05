const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');
const myRouter = require('./router'); 

// 绑定静态目录
const main = serve(path.join(__dirname+'/static'));
app.use(main);

// 绑定路由
app
  .use(myRouter.routes())
  .use(myRouter.allowedMethods())
 
app.listen(3001,function(){
    console.log("监听3001端口")
});

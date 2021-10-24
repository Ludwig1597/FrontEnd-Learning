//演示 koa2 中间件的洋葱圈模型

//引入koa
const Koa=require('koa')
//初始化koa实例
const app=new Koa()

//logger koa2里：ctx = req + res
//每个中间件使用格式都是一样的
//使用app.use()注册中间件
app.use(async (ctx,next)=>{
    //next就是当前中间件的下一个中间件
    //await next()意思是等待第二个中间件使用结束
    await next() //执行下一个中间件
    //rt=response time
    const rt=ctx.response.get('X-Response-Time')//获取时间差
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

//x-response-time
app.use(async (ctx,next)=>{
    const start=Date.now()
    await next() //执行下一个中间件
    const ms=Date.now()-start //计算时间差
    ctx.set('X-Response-Time',`${ms}ms`)//记录/设置时间差
})

//response
app.use(async (ctx,next)=>{
    ctx.body='Hello world'
})

app.listen(3000)
console.log('koa2 已经开始监听 3000 端口')
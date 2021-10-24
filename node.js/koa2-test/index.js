const Koa=require('koa')    
const app=new Koa() //创建一个Koa的实例

//ctx context 上下文
app.use(async (ctx)=>{
    ctx.body='htllo world'
})

app.listen(3000) //web server 监听的是 3000 端口
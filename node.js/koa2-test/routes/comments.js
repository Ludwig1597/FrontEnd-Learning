const router = require('koa-router')()

router.prefix('/api') //前缀

//定义路由：模拟获取留言板列表
//if(path==='/api/list'&&method==='GET'){
//    res.end('api list')
//}
router.get('/list',async (ctx,next)=>{
    const query=ctx.query
    console.log('query is: ',query)//获取querystring，req 功能
    //返回的是 字符串格式
    //ctx.body='api list' //res 功能
    //返回的是 json格式
    ctx.body={
        errno: 0,
        data: [
            {content:'留言1',user:'张三'},
            {content:'留言2',user:'李四'},
            {content:'留言3',user:'王五'},
        ]
    }
})

//定义路由：模拟创建留言
router.post('/create',async (ctx)=>{
    const body=ctx.request.body //获取 request body
    console.log('body is: ',body)
    //返回 字符串格式
    //ctx.body='api create'
    //返回 json格式
    ctx.body={
        errno: 0,
        message: '成功'
    }
})

module.exports = router //输出
//需要去app.js中去引用
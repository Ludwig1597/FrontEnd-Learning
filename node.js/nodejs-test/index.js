const http = require('http') 
const querystring=require('querystring')

const server = http.createServer((req,res)=>{
    const url=req.url // /api/list?a=100&b=200
    const path=url.split('?')[0] // /api/list
    const queryStr=url.split('?')[1] // a=100&b=200
    const method=req.method
    
    console.log('url is: ',url) 
    console.log('method is: ',method)

    const query=querystring.parse(queryStr||'')
    console.log('query is: ',query)

    //定义路由：模拟获取留言板列表
    if(path==='/api/list'&&method==='GET'){
        //res.end('this is list router') 这个返回的是字符串
        res.writeHead(
            200,
            {
                'Content-type':'application/json'
            }
        )
        //返回结果
        const result={
            errno: 0,
            data: [
                {user:'lily',content:'留言1'},
                {user:'kitty',content:'留言2'}
            ]
        }
        res.end(JSON.stringify(result))
    }

    //定义路由：模拟创建留言
    if(path==='/api/create'&&method==='POST'){
        //console.log('req content-type',req.headers['content-type'])
        const reqType=req.headers['content-type']
        
        let bodyStr=''
        //服务端怎么去识别 流，并接收数据
        req.on('data',chunk=>{
            //chunk 即“流”的每一段数据
            bodyStr=bodyStr+chunk.toString()
        })
        //服务端怎么知道流接收完成了
        req.on('end',()=>{
            //console.log('bodyStr is: ',bodyStr)//字符串
            if(reqType==='application/json'){
                const body=JSON.parse(bodyStr)
                console.log('body is: ',body)//对象
            }
            res.end('接收完成')
            return
        })
        
        // const result={
        //     errno: 0,
        //     message: '创建成功'
        // }
        // res.writeHead(
        //     200,
        //     {
        //         'Content-type':'application/json'
        //     }
        // )
        // res.end(JSON.stringify(result))
    }else{
        //没有命中路由，默认 404
        res.writeHead(
            404,
            {
                //'Content-type':'text/plain'
                'Content-type':'text/html'
            }
        )
        //res.end('404 Not Found')
        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>404</title>
                </head>
                <body>
                    <h1>404 Not Found</h1>
                <body>
            </html>
        `)
    }
})

server.listen(3000)
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  

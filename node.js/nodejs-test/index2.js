const http = require('http') 
const querystring=require('querystring')

const server = http.createServer((req,res)=>{
    const url=req.url // /api/list?a=100&b=200
    const path=url.split('?')[0] // /api/list
    const queryStr=url.split('?')[1] // a=100&b=200
    const method=req.method
    
    console.log('url is: ',url) 
    console.log('method is: ',method)

    //解析 querystring
    //先定义一个query对象
    // const query={}
    // queryStr&&queryStr.split('&').forEach(item=>{
    //     // item 即 a=100 形式
    //     const key=item.split('=')[0];
    //     const val=item.split('=')[1];

    //     query[key]=val;
    // })
    // console.log('query is: ',query)

    const query=querystring.parse(queryStr||'')
    console.log('query is: ',query)

    //定义路由：模拟获取留言板列表
    if(path==='/api/list'&&method==='GET'){
        if(query.filterType==='1'){
            res.end('this is list router,all')
        }
        if(query.filterType==='2'){
            res.end('this is list router,only mine')
        }
        //res.end('this is list router')
    }

    //定义路由：模拟创建留言
    if(path==='/api/create'&&method==='POST'){
        res.end('this is create router'); 
    }

    //res.end('404');
    //res.end('test url and method')
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  

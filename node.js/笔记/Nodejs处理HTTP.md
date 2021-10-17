>2021.10.16

# Node.js处理HTTP请求

## 认识 req 和 res

### nodejs 如何监听 http 请求

- nodejs 启动 Web 服务
  - 使用 http 模块，启动服务
  - 本机的 IP: 127.0.0.1
  - 本机的 域名: localhost

```javascript
const http = require('http') //commonjs
//require的三个层级：1.系统自带模块 2.npm安装的模块 3.自定义的模块

const server = http.createServer(()=>{
    console.log('已经收到 http 请求')
    //还没有返回任何东西
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  
//终端输入 node index.js

//npm init 初始化终端的环境
//npm i nodemon --save-dev
//package.json 文件中在scripts中添加："dev": "nodemon index.js"
//npm run dev 即可实时启动服务
```

### req 和 res 的获取和使用
  
```javascript
const http = require('http') 

//createServer的回调函数中可以加两个参数，request&response
const server = http.createServer((req,res)=>{
    const url = req.url // http://localhost:3000/index.html
    console.log('url is: ',url) // /index.html
    res.end('have received request') //res 返回信息给前端
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000') 
```

## nodejs定义路由

- 从 req 中获取 url 和 method
- 判断 method 是否符合
- 看 url 是否符合规则

- 测试路由
  - GET请求，直接拿浏览器访问
  - POST请求，需要借助工具——postman

```javascript
const http = require('http') 

const server = http.createServer((req,res)=>{
    const url=req.url // /api/list?a=100
    const path=url.split('?')[0] // /api/list
    const method=req.method
    
    console.log('url is: ',url) 
    console.log('method is: ',method)

    //定义路由：模拟获取留言板列表
    if(path==='/api/list'&&method==='GET'){
        res.end('this is list router')
    }

    //定义路由：模拟创建留言
    if(path==='/api/create'&&method==='POST'){
        res.end('this is create router');
    }

    res.end('404');
    //res.end('test url and method')
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  
```

## querystring

- 什么是 querystring
  - http://xxx.com/list.html?keyword=nba&lang=en&a=100
  - url 问号 ? 后面的都是 querystring（也叫 url 参数）
  - & 分割，key=value 形式，可继续拓展
- querystring 的作用
  - 动态网页的基石（web1.0 -> web2.0）
    - `http://xxx.com/list.html?keyworld=nba`
    - `http://xxx.com/list.html?keyworld=cba`
- 如何利用 querystring 实现动态网页
  - 服务端拿到 querystring
  - 根据不同的 querystring，返回不同的内容
  - 即变化的 querystring，就是变换内容（只要服务端支持）

### 从 url 分析 query 参数

```javascript
//index.js
const http = require('http') 

const server = http.createServer((req,res)=>{
    const url=req.url // /api/list?a=100&b=200
    const path=url.split('?')[0] // /api/list
    const queryStr=url.split('?')[1] // a=100&b=200
    const method=req.method
    
    console.log('url is: ',url) 
    console.log('method is: ',method)

    //解析 querystring
    //先定义一个query对象
    const query={}
    queryStr&&queryStr.split('&').forEach(item=>{
        // item 即 a=100 形式
        const key=item.split('=')[0];
        const val=item.split('=')[1];

        query[key]=val;
    })
    //console.log('query is: ',query)

    if(path==='/api/list'&&method==='GET'){
        if(query.filterType==='1'){
            res.end('this is list router,all')
        }
        if(query.filterType==='2'){
            res.end('this is list router,only mine')
        }
    }
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  
```

### 直接使用 nodejs 自带的 querystring

```javascript
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
    }
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  
```

### 结构化与非结构化

- 结构化的数据，易于通过程序访问和分析，如：对象 和 数组
- 非结构化的数据，不易通过程序分析，如：字符串
- 编程中的数据，都尽量结构化

## 返回数据

使用 res 设置返回的状态码，Content-type、Body

### res返回数据-返回 json 格式

```javascript
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
        //res.end('this is create router'); 
        const result={
            errno: 0,
            message: '创建成功'
        }
        res.writeHead(
            200,
            {
                'Content-type':'application/json'
            }
        )
        res.end(JSON.stringify(result))
    }else{
        //没有命中路由，默认 404
        res.writeHead(
            404,
            {
                'Content-type':'text/plain'
            }
        )
        res.end('404 Not Found')
    }
})

server.listen(3000)
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000') 
```

### res返回数据，返回 html 格式

- Content-type: text/html
- res.end(...)
- 浏览器会根据 Content-type 识别出 html 格式

```javascript
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
```

## 获取 Request Body

### 流 stream 的概念

- 流-stream 的表现
  - 观看视频时，一边加载一边观看
  - 上传文件时，有进度条
  - 网速较慢时，打开网页会先显示一部分，然后继续加载
- 浏览器能接收 流(stream) 数据
  - 服务端 res.end(...)，会自动以流的形式返回
  - 浏览器会识别到 流，并持续接收信息（会有进度条）
  - 待全部接收完，再做显示或处理（视频是一段一段的播放）
- 服务端如何接受 流(stream) 数据
  - 前端使用 Ajax（或 Postman）在 Request Body 中提交数据
  - 服务端需要识别 流，并接收数据
  - 还要知道何时才能接收完成

```javascript
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
}
```
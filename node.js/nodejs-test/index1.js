const http = require('http') 

//createServer的回调函数中可以加两个参数，request&response
const server = http.createServer((req,res)=>{
    const url = req.url // http://localhost:3000/index.html
    console.log('url is: ',url) // /index.html
    res.end('have received request') //res 返回信息给前端
})

server.listen(3000) //可以监听 http请求
console.log('http 请求3000端口已经被监听，请访问 http://localhost:3000')  
//终端输入 node index.js

//npm init 初始化终端的环境
//npm i nodemon --save-dev
//package.json 文件中在scripts中添加："dev": "nodemon index.js"
//npm run dev 即可实时启动服务

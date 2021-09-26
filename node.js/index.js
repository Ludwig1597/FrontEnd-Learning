const http = require('http')

const a = undefined
    //req->request; res->response
const server = http.createServer((req, res) => {
    debugger //断点
    const url = req.url; // '/index.html?a=100'
    const path = url.split('?')[0]; //以?作为拆分，数组第一个元素是'/index.html'  

    a()

    res.end(path);
})

server.listen(3000);
console.log('server listening on 3000 port')
    //在控制台中输入 node index.js 后 启动了本地的服务端，监听端口3000
    //在浏览器中输入 localhost:3000 会有一根斜线/
    //在浏览器中输入 localhost:3000/id/index.html?a=100 会显示 /id/index.html
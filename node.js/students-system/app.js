//引入http模块，http模块下有createServer()方法
const http=require('http');
//创建网站服务器
const app=http.createServer();
//导入连接数据库模块
require('./model/connect');
//引入路由
const router=require('./route/index');
//引入path模块
const path=require('path');
//引入模版引擎
const template=require('art-template');
//配置模版引擎
//配置模版的根目录
template.defaults.root=path.join(__dirname,'views');
//引入处理日期的第三方模块
const dateformat=require('dateformat');
//把这个处理日期格式的方法导入到模版变量中去
template.defaults.imports.df=dateformat;
//引入静态资源访问模块 返回值是一个方法
const serveStatic=require('serve-static');
//实现静态资源服务,调用静态资源服务方法，有一个参数是静态资源路径
//静态资源方法serveStatic()也有一个返回值，是一个方法
//调用这个方法才可以启用静态资源服务，我们用一个变量去接收这个方法
const serve=serveStatic(path.join(__dirname,'public'));


//为服务器添加请求事件
app.on('request',(req,res)=>{
    //res.end('ok');
    //启用路由服务功能
    router(req,res,()=>{
        console.log('router生效了')
    });
    //启用静态资源访问服务功能
    serve(req,res,()=>{
        console.log('静态资源访问功能启动了')
    })
})
app.listen(80);
console.log('服务器启动成功');


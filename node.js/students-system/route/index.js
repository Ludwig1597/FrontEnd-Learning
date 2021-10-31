//导入学生集合的构造函数
const Student=require('../model/user');
//引入模版引擎
const template=require('art-template');
//引入querystring模块
const querystring=require('querystring');
//引入第三方模块router，返回值是获取路由对象的方法
const getRouter=require('router');
//调用getRouter获取路由对象
const router=getRouter();//路由对象下有get方法，post方法
//通过路由对象下的get方法去创建路由
// router.get('/test',(req,res)=>{
//     res.end('test')
// })
//第一个路由：呈递学生档案信息页面
router.get('/add',(req,res)=>{
    //template()方法的返回值就是一个拼接的字符串
    let html=template('index.art',{

    });
    //把拼接好的字符串响应给客户端即可
    res.end(html);
})
//第二个路由：呈递学生档案信息列表页面
router.get('/list',async (req,res)=>{
    //查询学生信息
    let students = await Student.find();
    //console.log(students);
    let html=template('list.art',{
        //模版中就可以拿到stu属性，值students是一个数组
        stu: students
    })
    //res.end('list')
    res.end(html);
})
//第三个路由：实现学生信息添加功能路由
router.post('/add',(req,res)=>{
    //调用data事件接收post请求参数
    let formDate='';
    req.on('data',param=>{
        formDate+=param;
    })
    //调用end事件处理接受参数结束后
    req.on('end',async ()=>{
        //console.log(formDate);
        //console.log(querystring.parse(formDate));
        //res.end('ok');
        //调用学生集合的构造函数，创建文档
        //querystring.parse(formDate)是一个对象，直接传入的集合创建方法中
        await Student.create(querystring.parse(formDate));
        //重定向
        res.writeHead(301,{
            Location: '/list'
        });
        //重定向之后一定要记得结束请求
        res.end();
        console.log(Date.now());
    })
})

module.exports=router;
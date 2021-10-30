// 1. 搭建网站服务器，实现客户端与服务器端的通信
// 2. 连接数据库，创建用户集合，向集合中插入文档
// 3. 当用户访问`/list`时，将所有用户信息查询出来
// 4. 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 5. 当用户访问`/add`时，呈现表单页面，并实现添加用户信息功能
// 6. 当用户访问`/modify`时，呈现修改页面，并实现修改用户信息功能
// 7. 当用户访问`/delete`时，实现用户删除功能

const http=require('http');
const url=require('url');
const querystring=require('querystring');

require('./model/index');
const User=require('./model/user');




//创建服务器
const app=http.createServer();

//为服务器对象添加请求事件 使其成为异步函数
app.on('request',async (req,res)=>{
    //获取请求方式
    const method=req.method;
    //解构出请求地址
    const {pathname,query}=url.parse(req.url,true);

    //判断请求方式
    if(method=='GET'){
        //get方式，一般都是数据的请求 或者 是页面的成立
        //根据请求地址作进一步判断
        if(pathname=='/list'){
            //查询用户信息 返回一个数组
            let users=await User.find();
            //console.log(users);
            //呈现用户列表页面 （html字符串）
            //html头部
            let list=`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a> 
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td> 
                            <td>年龄</td>   
                            <td>爱好</td>
                            <td>邮箱</td>   
                            <td>操作</td>
                        </tr>
            `;

            //对数据进行循环操作
            users.forEach(item=>{
                list+=`
                <tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>`;

                item.hobbies.forEach(item=>{
                    list+=`<span>${item} </sapn>`
                })

                list+=`</td>
                <td>${item.email}</td>
                <td>
                    <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                    <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                </td>
                `;
            })

            //html尾部
            list+=`
                    </table>
                </div>
                </body>
            </html>
            `
            res.end(list);
        }
        if(pathname=='/add'){
            //呈现增加用户表单界面
            let add=`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>   
                    <form method="post" action="/add">
                        <div class="form-group">
                            <label>用户名</label>       
                            <input name="name" type="text" class="form-control" placeholder="请填写用户名">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input name="password" type="password" class="form-control" placeholder="请输入密码">           
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input name="age" type="text" class="form-control" placeholder="请填写年龄">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="足球" name="hobbies"> 足球
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="篮球" name="hobbies"> 篮球
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="棒球" name="hobbies"> 棒球
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="游泳" name="hobbies"> 游泳
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>
            `;
            res.end(add);
        }
        if(pathname=='/modify'){
            //根据query携带的id去数据库中查找
            let user=await User.findOne({_id:query.id});
            //console.log(user);
            let hobbies=['足球','篮球','棒球','喝酒','游泳'];
            //呈现修改用户表单界面
            let modify=`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>   
                    <form method="post" action="/modify?id=${user._id}">
                        <div class="form-group">
                            <label>用户名</label>       
                            <input value=${user.name} name="name" type="text" class="form-control" placeholder="请填写用户名">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input value=${user.passwdord} name="password" type="password" class="form-control" placeholder="请输入密码">           
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input value=${user.age} name="age" type="text" class="form-control" placeholder="请填写年龄">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input value=${user.email} name="email" type="email" class="form-control" placeholder="请填写邮箱">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                        `;
            hobbies.forEach(item=>{
                //判断当前循环项是否在用户的爱好数组中
                let isHobby=user.hobbies.includes(item);
                if(isHobby){
                    modify+=`
                        <label class="checkbox-inline">
                            <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                        </label>
                    `
                }else{
                    modify+=`
                        <label class="checkbox-inline">
                            <input type="checkbox" value="${item}" name="hobbies"> ${item}
                        </label>
                    `
                }
            })
            
            //修改界面后半段
            modify+=`       </div>
                        </div>
                        <button type="submit" class="btn btn-primary">修改信息</button>
                    </form>
                </div>
            </body>
            </html>
            `;
            res.end(modify);
        }
        if(pathname=='/remove'){
            //res.end(query.id);
            await User.findOneAndDelete({_id:query.id});
            res.writeHead(301,{
                Location:'/list'
            });
            res.end();//结束掉此次请求
        }
    }
    if(method=='POST'){
        //post方式，一般都是实现一些功能，比如 添加数据、修改数据
        //用户添加功能
        if(pathname=='/add'){
            //添加在form表单的action属性中，action="/add"
            //准备一个变量 用来拼接post参数
            let formData='';
            //前台当有数据发生传递的时候，就会触发data事件
            //接收post参数
            req.on('data',param =>{
                formData+=param;
            })
            //当参数接收完毕后，会触发end事件
            //post参数接收完毕
            req.on('end',async ()=>{
                //console.log(querystring.parse(formData));
                //将用户提交的信息添加到数据库当中
                let user=querystring.parse(formData);
                //加上await使其变成同步形式
                await User.create(user);
                //通过writeHead()方法对他进行重定向
                //301代表重定向
                //location代表跳转地址
                res.writeHead(301,{
                    Location: '/list'
                });
                //重定向完之后一定要调用res.end()
                res.end();
            })
            //console.log('123');
        }
        if(pathname=='/modify'){
            //添加在form表单的action属性中，action="/modify"
            //准备一个变量 用来拼接post参数
            let formData='';
            //前台当有数据发生传递的时候，就会触发data事件
            //接收post参数
            req.on('data',param =>{
                formData+=param;
            })
            //当参数接收完毕后，会触发end事件
            //post参数接收完毕
            req.on('end',async ()=>{
                //console.log(querystring.parse(formData));
                //将用户提交的信息添加到数据库当中
                let user=querystring.parse(formData);
                //加上await使其变成同步形式
                await User.updateOne({_id:query.id},user);
                //通过writeHead()方法对他进行重定向
                //301代表重定向
                //location代表跳转地址
                res.writeHead(301,{
                    Location: '/list'
                });
                //重定向完之后一定要调用res.end()
                res.end();
            })
        }

    }
    //res.end('ok');
    })
//监听3000端口
app.listen(3000);

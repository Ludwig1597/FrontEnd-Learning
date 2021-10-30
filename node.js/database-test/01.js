//引入第三方模块，用来操作数据库
const mongoose=require('mongoose')

//playground 演示的意思。没有该数据库的时候会自动创建
mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(
        err=>console.log(err,'数据库连接失败')
    )


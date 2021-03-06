const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(err=>{
        console.log(err,'数据库连接失败')
    })

const userSchema=new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
})

const User=mongoose.model('User',userSchema)

//查找到一条文档并且删除
//返回删除的文档
//如果查询条件匹配了多个文档，那么将会删除第一个匹配的文档
User.findOneAndDelete({name:'王五'})
    .then(res=>{
        console.log(res)
    })

//删除多条文档
User.deleteMany({}).then(res=>console.log(res))
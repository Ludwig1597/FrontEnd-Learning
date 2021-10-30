const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(
        err=>console.log(err,'数据库连接失败')
    )

//创建集合规则
const userSchema=new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

//使用规则创建集合 返回用户集合的构造函数
const User=mongoose.model('User',userSchema);

//查询用户集合的所有文档
//User.find().then(result=>console.log(result));

//根据条件查找
//User.find({name: '王五'}).then(result=>console.log(result));

//User.findOne().then(result=>console.log(result));

//查询用户集合中年龄字段大于20小于40的文档
//User.find({age:{$gt:20,$lt:40}}).then(result=>console.log(result));

//User.find({hobbies: {$in: ['足球']}}).then(result=>console.log(result));

//选择要查询的字段
//User.find().select('name email -_id').then(result=>console.log(result));

//根据年龄字段进行升序排列
//User.find().sort('age').then(result=>console.log(result));

//将数据按照年龄进行降序排序
//User.find().sort('-age').then(result=>console.log(result));

//skip跳过多少条数据 limit限制查询数量
User.find().skip(2).limit(2).then(result=>console.log(result));
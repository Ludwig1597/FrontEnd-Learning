const mongoose=require('mongoose');
//创建用户集合规则
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age:{
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    hobbies: [String]
})

//使用集合规则创建集合 返回集合的构造函数
const User=mongoose.model('User',userSchema);

//把User这个构造函数开放出去
module.exports=User;
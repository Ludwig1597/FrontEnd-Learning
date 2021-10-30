const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/playground');

const userSchema=new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
})

const User=mongoose.model('User',userSchema)

User.updateOne({name: '李四'},{name: '李狗蛋'}).then(res=>console.log(res))

User.updateMany({},{age:56}).then(res=>console.log(res));
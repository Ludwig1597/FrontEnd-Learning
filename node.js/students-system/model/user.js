//引入mongoose
const mongoose=require('mongoose');
//创建学生集合规则
const studentsSchema=new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 10,
        max: 25
    },
    sex: {
        type: String
    },
    email: String,
    collage: String,
    hobbies: [String],
    enterDate: {
        type: Date,
        default: Date.now()
    }
})
//使用学生集合规则，去创建学生集合
const Student=mongoose.model('Student',studentsSchema);

//将学生集合的构造函数导出
module.exports=Student;
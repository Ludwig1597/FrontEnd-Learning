const mongoose=require('mongoose')

//playground 演示的意思。没有该数据库的时候会自动创建
mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(
        err=>console.log(err,'数据库连接失败')
    )

//创建集合规则
const courseSchema=new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

//使用规则创建集合,用mongoose的model()方法，返回一个构造函数
//Course是当前集合的构造函数
//为什么返回构造函数？
//因为这个构造函数下面有很多方法，让我们可以对这个集合进行操作
const Course=mongoose.model('Course',courseSchema); //courses

//Course构造函数实例化之后会返回一个对象
const course=new Course({
    name: 'nodejs基础',
    author: 'Jaden' ,
    isPublished: true
})

course.save();
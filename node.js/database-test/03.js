const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(
        err=>console.log(err,'数据库连接失败')
    )

const courseSchema=new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

const Course=mongoose.model('Course',courseSchema); //courses

//create()方法即是向集合中插入文档
//Course.create({
//    name: 'Javascript',
//    author: 'Jaden',
//    isPublished: false
//},(err,result)=>{
//    console.log(err);
//    console.log(result);
//})
Course.create({
    name: 'Javascript',
    author: 'Jaden',
    isPublished: false
}).catch(err=>{
    console.log(err)
}).then(result=>{
    console.log(result)
})

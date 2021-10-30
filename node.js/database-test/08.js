const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('数据库连接成功'))
    .catch(err=>console.log('数据库连接失败'));

//用户集合规则
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

//文章集合规则
const postSchema=new mongoose.Schema({
    title:{
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

//创建用户集合
const User=mongoose.model('User',userSchema);
//创建文章集合
const Post=mongoose.model('Post',postSchema);

//创建用户
User.create({
    name: 'Jaden'
}).then(
    result=>console.log(result)
)
//创建文章
Post.create({
    title: '123',
    author: '617cbd7d707e57e746fabc30'
}).then(
    result=>console.log(result)
)

//查询
Post.find({title: '123'}).populate('author')
    .then(res=>console.log(res))
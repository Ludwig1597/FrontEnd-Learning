//引入mongoose第三方模块，用来操作数据库
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('数据库连接成功'))
    .catch(err=>console.log('数据库连接失败'))

const postSchema=new mongoose.Schema({
    //title: String,
    title:{
        type: String,
        //设置验证规则
        //必选字段
        required:[true,'请传入文章标题'],
        //字符串长度限制
        minlength:[2,'标题长度不能小于2'],
        maxlength:5,
        //是否去除空格
        trim:true 
    },
    age:{
        type:Number,
        //数字的范围限制
        min:18,
        max:100
    },
    publishDate:{
        type:Date,
        //默认值
        default:Date.now
    },
    category:{
        type:String,
        //枚举，列举出当前字段可以拥有的值
        enum:{
            values: ['html','css','javascript'],
            message: '分类名称要在一定的范围类'
        }
    },
    author:{
        type:String,
        validate:{
            //validator属性是一个函数类型
            //有一个参数，是用户插入的值
            validator:val=>{
                //返回一个布尔值
                //true 验证成功
                //false 验证失败
                //val 要验证的值
                return val&&val.length>4
            },
            //自定义错误信息
            message:'传入的值不符合验证规则'
        }
    }
})
const Post=mongoose.model('Post',postSchema)

Post.create({
    title:'aaa',
    age:39,
    category:'html0',
    author: 'bd'
}).then(res=>console.log(res))
  .catch(error=>{
    //console.log(err,'创建失败')
    //获取错误信息对象
    const err=error.errors;
    //循环信息对象
    for(var attr in err){
      //将错误信息打印到控制台中
      console.log(err[attr]['message'])
    }
  })
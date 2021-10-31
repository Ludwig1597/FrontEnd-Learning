//引入mongoose模块
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/stu-sys')
	.then(()=>console.log('数据库连接成功'))
	.catch((err)=>console.log(err,'数据库连接失败'));

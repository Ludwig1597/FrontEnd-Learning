const mongoose=require('mongoose');
//数据库连接 localhost:27017是mangodb的默认端口，可以省略不写
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('数据库连接成功了'))
    .catch(err=>console.log(err,'数据库连接失败了'));
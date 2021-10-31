//导入模版引擎
const template=require('art-template');
const path=require('path');//有join方法，可以拼接路径

//template方法是用来拼接字符串的
//  - 第一个参数：模版路径（绝对路径）
//  - 第二个参数：要在模版中显示的数据，是对象类型
//  - return：template方法返回拼接好的字符串
const viewsPath=path.join(__dirname,'views','index.art');
const html=template(viewsPath,{
    name: 'lily',
    age: 20,
});
console.log(html);
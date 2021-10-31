const template=require('art-template');
const path=require('path');
const dateFormat=require('dateformat');

//设置模版的根目录
//const viewsPath=path.join(__dirname,'views','06.art')
template.defaults.root=path.join(__dirname,'views');

//导入模版变量 将dateFormate导入模版中
template.defaults.imports.dateFormat=dateFormat;

//配置模版的默认后缀
//template.defaults.extname='.art';
template.defaults.extname='.html'
//const html=template(viewsPath,{
//const html=template('06.art',{
//const html=template('06',{
const html=template('06.art',{
    time: new Date()
})

console.log(template('07',{}));

console.log(html)

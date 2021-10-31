const template =require('art-template');
const path=require('path');

const viewsPath=path.join(__dirname,'views','01.art');

const html=template(viewsPath,{
    name: 'lily',
    age:18,
    content: '<h1>我是标题</h1>'
})

console.log(html);
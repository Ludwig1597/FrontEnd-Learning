const template=require('art-template');
const path=require('path');

const viewsPath=path.join(__dirname,'views','02.art');

const html=template(viewsPath,{
    name: 'lily',
    age: 17,
})
console.log(html);
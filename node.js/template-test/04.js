const template=require('art-template')
const path=require('path')

const viewsPath=path.join(__dirname,'views','04.art')

const html=template(viewsPath,{
    msg: '我是首页'
})

console.log(html)
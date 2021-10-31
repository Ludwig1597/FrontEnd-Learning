const template=require('art-template')
const path=require('path')

const viewsPath=path.join(__dirname,'views','05.art')

const html=template(viewsPath,{
    msg: '首页模版'
})

console.log(html)
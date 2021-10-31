const template=require('art-template')
const path=require('path')

const viewsPath=path.join(__dirname,'views','03.art')

const html=template(viewsPath,{
    users: [{
        name: 'lily',
        age: 20,
        sex: 'female'
    },{
        name: 'kitty',
        age: 30,
        sex: 'female'   
    },{
        name: 'jack',
        age: 15,
        sex: 'male'
    }]
})

console.log(html)
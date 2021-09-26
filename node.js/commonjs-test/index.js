const flag = true

if (flag) {
    //const sum=require('./utils.js')
    //当需要引入的函数或者变量大于1个时，我们用解构的方式去引用
    const { sum, test } = require('./utils.js') //执行时才将他引入，是动态的

    const res = sum(10, 20)
    test()
    console.log(res)
}
const _ = require('lodash') //common.js规范
    //lodash的意思就是下划线_

const arr = [1, 2, 3]
const other = _.concat(arr, 4, [5], [
    [6]
]);
console.log(other);
//node test.js作测试

//console.log(window)
function sum(a,b){
	return a+b
}

function test(){
	console.log("this is test")
}
//module.exports=sum
//当需要导出的函数或者变量个数大于1个时，我们就export一个对象

module.exports={
	sum,
	test
}

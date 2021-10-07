>2021.9.30

# Ajax&跨域请求

## Ajax基础

### 初识Ajax

- Ajax是什么
  - Ajax是Asynchronous Javascript and XML（异步JavaScript和XML）的简写
    - Ajax中的异步：可以异步地向服务器发送请求，在等待响应的过程中，不会阻塞当前页面，浏览器可以做自己的事情。直到成功获取响应后，浏览器才开始处理响应数据。
    - XML（可扩展的标记语言）是前后端数据通信时传输数据的一种格式
    - XML 先在已经不怎么用了，先在比较常用的是JSON
  - Ajax其实就是浏览器与服务器之间的一种异步通信方式
  - 使用Ajax可以在不重新加载整个页面的情况下，对页面的某部分进行更新，提升用户体验
  - 常见使用Ajax的情景
    - 网站注册时的检测
    - 网站搜索时的提示
- 搭建Ajax开发环境
  - Ajax需要服务器环境，非服务器环境下，很多浏览器无法正常使用Ajax
  - vscode插件：live server

### Ajax的基本用法
 
- XMLHttpRequst
  - Ajax 想要实现浏览器与服务器之间的异步通信，需要依靠XMLHttpRequest，它是一个构造函数
  - 看到构造函数要做的就是实例化这个构造函数，来生成对象，我们用的是对象
  - 无论是XMLHttpRequest，还是Ajax，都没有和具体的某种数据格式绑定
    - 数据格式有XML、JSON等
- Ajax的使用步骤
  - 2.1 创建xhr对象     
    const xhr=new XMLHttpRequest();
  - 2.2 监听事件，处理响应，接收异步数据
    - 当获取到响应后，会触发xhr对象的 readystatechange 事件，可以在该事件中对响应进行处理
    - readystatechange 事件监听 readyState 这个状态的变化，它的值从0～4，一共5个状态
      - 0: 未初始化。尚未调用 open();
      - 1: 启动。已经调用 open()，但尚未调用 send();
      - 2: 发送。已经调用 send()，但尚未接受到响应;
      - 3: 接收。已经接收到部分响应数据;
      - 4: 完成。已经接收到全部相应数据，而且已经可以在浏览器中使用了。
    - 为了兼容性，readystatechange中不使用this，而是直接使用实例化出来的xhr，由于兼容性，最好放在open之间
  - 2.3 准备发送请求    
    xhr.open('HTTP方法GET、POST、PUT、DELETE','地址URL，本地/外部',true);//true的意思是使用异步方式发送。
    > 调用open并不会真正发送请求，而只是做好发送请求前的准备工作。
  - 2.4 发送请求       
    调用send()正式发送请求。     
    xhr.send();//send是通过请求体传输数据，携带的数据可以通过send传输过去，但是get是通过请求头传输数据，因此如果是get方法，send里参数只能为null。
 
    ```javascript
    xhr.onreadystatechange=()=>{
        if(xhr.readyState !== 4) return;

        //HTTP CODE
        //获取响应后，响应的内容会自动填充 xhr 对象的属性
        //- xhr.status: HTTP CODE,如：200
        //- xhr.statusText: HTTP 状态说明，如：OK
        if(xhr.status >= 200 & xhr.status < 300 || xhr.status === 304){
            console.log('正常使用响应数据');
            console.log(xhr.statusText);
            console.log(xhr.responseText);//响应数据
        }
    }
    ```
- 使用Ajax完成前后端通信    
  [ajax-test.js](./../ajax-test.html)
### GET请求

- 携带数据
  - GET请求不能通过请求体携带数据，但可以通过请求头（url）携带
  - const url='https://www.imooc.com/api/http/search/suggest?words=js & username=alex & age=18';
- 数据编码
  - 如果携带的数据是非英文字母的话，比如说文字，就需要编码之后再发送给后端，不然会造成乱码问题
  - 可以使用 encodeURIComponent()编码

### POST请求

- 携带数据
  - POST请求主要是通过请求体携带数据，同时也可以通过请求头携带
  - 如果想发送数据，直接写在send()的参数位置，一般是字符串  
    如：xhr.send('username=lily&age=18');//按一种特定的格式
  - 不能直接传递对象，需要先将对象转换成字符串的形式
- 数据编码
  - 如果携带的数据是非英文字母的话，比如说文字，就需要编码之后再发送给后端，不然会造成乱码问题
  - 可以使用 encodeURIComponent()编码

## JSON

### 初识JSON

- JSON是什么
  - JSON是Ajax发送和接收数据的一种格式
  - 数据格式有很多种
    - XML
    - username=lily&age=18
    - JSON 
  - JSON全称是 JavaScript Object Notation，JavaScript对象表示法 
- 为什么需要JSON
  - JSON有三种形式，每种形式的写法都和JS中的数据类型很像，可以很轻松的和JS中的数据类型互相转换    
  - JS->JSON->PHP/Java/Nodejs
  - PHP/Java/Nodejs->JSON->JS

### JSON的三种形式

Json文件的后缀名是 `.json`。
- 简单值形式 [plain.json](../plain.json)
  - JSON的简单值形式就对应着JS中的基础数据类型：数字、字符串、布尔值、null
  - JSON中没有undefined值
  - JSON中是不能注释的
  - JSON中的字符串必须使用双引号
- 对象形式 [obj.json](../obj.json)
  - JSON的对象形式就对应着JS中的对象
  - JSON中的对象的属性名必须用双引号，属性值如果是字符串也必须用双引号
  - JSON中只要涉及到字符串，就必须使用双引号
  - 不支持 undefined
- 数组形式 [arr.json](../arr.json)
  - JSON的数组形式就对应着JS中的数组
  - 数组中的字符串必须用双引号
  - JSON中只要涉及到字符串，就必须使用双引号
  - 不支持undefined 

### JSON的常用方法

- JSON.parse()
  - JSON.parse()可以将 JSON 格式的字符串解析成 JS 中的对应值
  - 一定要是合法的 JSON 字符串，否则会报错
  - [ajax-test.html](../ajax-test.html)
- JSON.stringify()
  - JSON.stringify()可以将 JS 的基本数据类型、对象或者数组转换成 JSON 格式的字符串
  ```javascript
  console.log(
      JSON.stringify({
          username:'alex',
          age:18
      })
  )
  ```
  - 这样ajax的send()中就能发送对象了，把我们要发的数据转换成JSON格式发送给服务端
- 使用 JSON.parse() 和 JSON.stringify() 封装 localStorage
  - [storage.js](./../storage.js)
  - [json-test.html](./../json-test.html)

## 跨域

### 初识跨域

- 跨域是什么    
  向一个域发送请求，如果要请求的域和当前域是不同域，就叫跨域  
  不同域之间的请求，就是跨域请求
- 什么是不同域，什么是同域  
  - URL地址：https(协议)://www.imooc.com(域名):443(端口号)/course/list(路径)
  - 协议、域名、端口号，任何一个不一样，就是不同域
  - 与路径无关，路径不一样无所谓
- 跨域请求为什么会被阻止  
  阻止跨域请求，其实是浏览器本身的一种安全测略——同源策略    
  其他客户端或者服务器都不存在跨域被阻止的问题
- 跨域解决方案     
  - CORS Cross-origin resource sharing 跨域资源共享
  - JSONP JSON with Padding
  > 优先使用 CORS 跨域资源共享，   
  如果浏览器不支持 CORS 的话，再使用 JSONP

### CORS跨域资源共享

- CORS 是什么
  - Access-Control-Allow-Origin:*      
    表明允许所有的域名来跨域请求它，* 是通配符，没有任何限制
  - Access-Control-Allow-Origin:http://127.0.0.1:5500   
    只允许指定域名的跨域请求
- 使用 CORS 跨域的过程
  - 浏览器发送请求
  - 后端在响应头中添加 `Access-Control-Allow-Origin` 头信息
  - 浏览器接收到响应
  - 如果是同域下的请求，浏览器不会额外做什么，这次前后端通信就圆满完成了
  - 如果是跨域请求，浏览器会从响应头中查找是否允许跨域访问
  - 如果允许跨域，通信圆满完成
  - 如果没找到或不包含想要跨域的域名，就丢掉响应结果
- CORS 的兼容性
  - IE10 及以上版本的浏览器可以正常使用CORS

### JSONP

- JSONP的原理
  - script标签跨域不会被浏览器阻止
  - JSONP主要就是利用script标签，加载跨域文件
- 使用JSONP实现跨域
  - 服务器端准备好 JSONP 接口
  - 用script标签中的src手动加载 JSONP 接口 或 动态加载 JSONP 接口
  - 声明函数

## XHR对象

### XHR的属性

[xhr属性](../ajax-test.html)
- responseType 和 response 属性
- timeout属性   
  设置请求的超时时间（单位 ms）
- withCredentials属性   
  指定使用 Ajax 发送请求时是否携带 Cookie   
  使用 Ajax 发送请求，默认情况下，同域时，会携带 Cookie；跨域时，不会  
  要想跨域时，会携带 Cookie，设置 `xhr.withCredentials=true`   
  最终能否成功跨域携带 Cookie，还要看服务器同不同意

### XHR的方法

- abort()
  - 用于终止当前请求
  - 一般配合同名的 abort 事件一起使用
- setRequestHeader()
  - 用于设置请求头信息
  - xhr.setRequestHeader(头部字段的名称，头部字段的值);
  - xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  - xhr.setRequestHeader('Content-Type','application/json');

### XHR的事件

- load事件
  - 响应数据可用时触发
  - 可用来替代onreadystatechange
  - xhr.onload=()=>{}
  - xhr.addEventListener('load',()=>{},false);
  - IE6~8不支持load事件
- error事件
  - 请求发生错误时会触发，和响应无关
  - IE10开始支持
- abort事件
  - 调用abort() 终止请求时触发
  - IE10开始支持
- timeout事件
  - 请求超时后触发  
  - IE8开始支持

## Ajax进阶

### FormData

- 使用 Ajax&FormData 提交表单   
  [FormData.html](../FormData.html)
  
### 封装Ajax

- ajax的封装 [ajax.js](./../ajax.js)
- 默认参数 [defaults.js](./../defaults.js)
- 工具函数 [utils.js](./../utils.js)
- 常量 [constants.js](./../constants.js)
- 再封装 [index.js](./../index.js)
- 测试 [ajax-test2.js](./../ajax-test2.html)

### 使用Promise改造封装好的Ajax

- [ajax_promise.js](./../ajax_promise.js)
- [constants.js](./../constants.js)
- [ajax_promise.html](./../ajax_promise.html)

## Ajax应用

### 搜索提示

### 二级菜单

### 多个Ajax请求的并发执行

## Ajax扩展

### axios库

### Fetch
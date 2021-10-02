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

### JSON的三种形式

### JSON的常用方法

## 跨域

### 初识跨域

### CORS跨域资源共享

### JSONP

## XHR对象

### XHR的属性

### XHR的方法

### XHR的事件

## Ajax进阶

### FormData

### 封装Ajax

### 使用Promise改造封装好的Ajax

## Ajax应用

### 搜索提示

### 二级菜单

### 多个Ajax请求的并发执行

## Ajax扩展

### axios库

### Fetch
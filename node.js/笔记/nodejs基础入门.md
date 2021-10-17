>2021.9.25

# Node.js 入门和使用

## 准备工作

### Node.js下载和安装

- 下载安装   
  - 网址：`nodejs.cn`
- 学习使用控制台
  - `node -v`
  - `npm -v`
  - `node`(control + c control + c 终止)
- node.js初体验
  
## 使用npm

### npm是什么

- npm: node package manager,即nodejs软件包管理者
- 官网: https://www.npmjs.com/
- 有几百万的软件包，开源免费
- npm会随着nodejs一起被安装
- `npm init` 初始化环境
  - 注意：在需要使用npm安装包的文件夹下使用
  - 初始化完成会出现一个package.json文件
- `npm install lodash --save` / `npm i lodash --save` 
  - 安装lodash//一个实用的js库
  - 在package.json中会出现一个dependencies
  - 还会出现一个node_modules的文件夹和package-lock.json文件
- `npm i nodemon --save-dev`
  - --save 和 --save-dev 的区别
    - --save 指在代码中会真正用到
    - --save-dev 在实际的代码中不会用到
  - 在package.json中的表现
    - 在package.json中的script中作改动
      - `"dev":"nodemon index.js"`
      - 在控制台中 `npm run dev`
      - 实际启动的是 `nodemon index.js`
  - nodemon 是帮我们启动服务的
  - nodemon index.js 比 node index.js 好处在于，当我们在代码中有改动时，nodemon也会立刻帮我们重写，不用不停启动node index.js
### 使用npm安装软件包

### 关于package.json

## commonjs模块化

>需要去学习第13周课程：ES6之Module模块与Babel编译

### 回顾ES6 module

- export... 或 export default... 去导出一个内容
- import...from... 去引入一个内容
- 一般用于前端javascript开发

#### 演示 ES6 Module
  
- `npm i @vue/cli -g` 安装vue脚手架，-g是全局安装
- `vue create xxx(起个名字)` 一路回车
- `cd xxx(刚刚起的名字)`
- `npm run serve`

### commonjs语法介绍

- module.exports 输出，导出一个内容
- require(...) 导入一个内容
- 主要用于nodejs开发

#### require(...)的三个层级

- 系统自带模块。如：`require('http')`
- 通过npm安装的模块。如：`require('lodash')`
- 自定义模块。如：`require('xxx')` xxx是一个相对路径

### commonjs 和 ES6 Module 的区别

- 两者语法不一样
- commonjs是执行时引入，动态的，执行时才引入
- ES6 Module是打包时引入，静态的，不能放在函数中，需要提前引入

### 为何要使用模块化

- 模块拆分开，便于代码的组织和管理
- 便于多人协作开发，各不干扰
- 成熟的语言，都支持模块化

## nodejs debug

### 什么是debug

- bug即错误
- debug即排错，也叫调试
- 编程语言，必须有成熟的debug机制

### inspect调试法

- 修改scripts，增加 inspect，启动服务
- 打开chrome，访问 chrome://inspect
- 增加debugger，重启服务，即可调试

### debug的重要性

## nodejs 和 前端js 的区别

- 两者都使用js语法
  - 变量的定义和类型
  - 函数的定义和执行
  - ES6 和 Class Promise 等语法 //promise语法要重学
- 前端js使用浏览器提供的web API
  - 如前端网页的 DOM BOM 事件 Ajax 等
  - 前端js可以使用，因为在浏览器环境
  - nodejs则无法使用，因为nodejs在nodejs环境
- nodejs使用nodejs API
  - 如处理http
  - nodejs可以使用，因为是nodejs环境（使用node xxx.js启动）
  - 前端js则无法使用，因为在浏览器环境

>总结：
>1. 前端js = js语法 + Web API
>2. nodejs = js语法 + nodejs API
>3. 同样的语法，不同的工作

## 总结

- nodejs是什么
  - nodejs是一个基于Chrome V8引擎的js运行环境 
  - nodejs使得js语言能够做更多的事情，而不仅仅是网页
  - 安装nodejs，即可执行js代码（使用node xxx.js)
- nodejs下载和安装
- 使用npm
  - npm是什么，软件包有何作用
  - 安装和使用npm包，--save 和 --save-dev
  - package.json(scripts dependencies devDependencies)
- commonjs
  - commonjs语法
  - commonjs 和 ES6 Module 的区别
  - 为何要使用模块化
- debug
  - debug即排错、调试，debugger是断点
  - debug对于编程非常重要
  - inspect调试方法
- nodejs和js的区别
  - 前端js = js语法 + Web API
  - nodejs = js语法 + nodejs API
  - 同样的语法，不同的工作
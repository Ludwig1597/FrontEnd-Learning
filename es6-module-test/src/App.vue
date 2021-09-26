<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
//import sum from './util'//把sum函数引进来
import {sum,test} from './util' //静态的，不能放在函数中

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    const res=sum(10,20)
    console.log(res)
    test()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

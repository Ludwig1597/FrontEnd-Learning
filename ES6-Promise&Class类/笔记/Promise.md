>2021.10.10

# Promise

## 初识 Promise

### Promise 是什么

- 初识 Promise
  - Promise 是异步操作的一种解决方案
  - (回调函数也是异步操作的一种解决方案)
    ```javascript
    //回调函数
    //第二个参数就是一个回调函数
    document.addEventListener(
        'click',
        ()=>{
            console.log('这里是异步的');
        },
        false
    );
    console.log('这里是同步的');
    ```
- 什么时候使用 Promise
  - Promise 一般用来解决层层嵌套的回调函数（回调地狱callback hell）的问题
    ```javascript
    const boxEl=document.getElementById('box');
    document.addEventListener(
        'click',
        ()=>{
            move(boxEl,{x:150},()=>{
                move(boxEl,{x:150,y:150},()=>{
                    move(boxEl,{y:150},()=>{
                        move(boxEl,{x:0,y:0});
                    })
                })
            })
        },
        false
    );
    ```
- [callback-hell](./../初识promise.html)

### Promise 的基本用法

- 实例化构造函数生成实例对象
  - console.log(promise);//promise实际是一个构造函数
  - //const p = new Promise(()=>{});//中间有一个回调函数
- Promise 的状态
  ```javascript
  const p = new Promise((resolve,reject)=>{
      //resolve 和 reject 只是形参，任意名字都行
      //1.未调用任何函数之前，是pending，即未完成状态、等待状态
      //2.调用resolve();是fulfilled，即成功状态，pending->fulfilled
      //3.调用rejec();是rejected状态，即失败,pending->rejected
      //Note:Promise的状态一旦变化，就不会再改变了
      //只能从等待状态变为要么成功，要么失败，之后状态不再改变
  })
  ```
- then() 方法 
  ```javascript
  p.then(
      ()=>{
          //pending->fulfilled,执行第一个函数
          console.log('success');
      },
      ()=>{
          //pending->rejected,执行第二个函数
          console.log('error');
      }
  )
  ```
- resolve 和 reject 函数的参数
  - 这两个函数可以传递参数
  ```javascript
  const p = new Promise((resolve,reject)=>{
      resolve({username:'lily'});
  });

  p.then(
      //data是一个形参，任意名字都行
      (data)=>{
          console.log('success',data);//success {username:"lily"}
      },
      ()=>{
          console.log('error');
      }
  )

  ```
  ```javascript
  const p = new Promise((resolve,reject)=>{
      reject(new Error('reason'));
  });

  p.then(
      //data是一个形参，任意名字都行
      (data)=>{
          console.log('success',data);//success {username:"lily"}
      },
      //err也是一个形参
      err=>{
          console.log('error',data);
      }
  )

  ```
## Promise 的实例方法

通过实例对象调用的方法叫做实例方法。

### then()

- 什么时候执行
  - pending -> fulfilled 时，执行 then 的第一个回调函数
  - pending -> rejected 时，执行 then 的第二个回调函数
- 执行后的返回值
  - then()方法执行后会返回一个新的 Promise 对象
  - 在 then 的回调函数中，return 后面的东西，会用 Promise 包装一下
    ```javascript
    //return undefined;
    //等价于 => 
    return new Promise((resolve,reject)=>{
        resolve(undefined);
    })
    ```
  - 默认返回的都是成功状态的 Promise 对象，除非
    ```javascript
    return new Promise((resolve,reject)=>{
        reject('reason');
    })
    ```
  - [then().html](./../then().html)
- then()方法返回的 Promise 对象的状态改变
  - 如上。
- 使用 Promise 解决回调地狱
  - 原：[callback-hell](./../初识promise.html)
  - 现：[promise](../promise-kill-hell.html)

### catch()

- 有什么用
  - then()方法既能处理成功的也能处理失败的
  ```javascript
  then(
      data => {},
      err => {}
  );
  ```
  - 但我们可以用then()方法专门用来处理成功的
  - 而使用catch()方法，专门用来处理rejected状态的
  - catch的意思实际上就是捕获
  - catch本质上是then的特例
  ```javascript
  then(null,err => {});
  ```
  - catch()可以捕获它前面的错误
  - 一般总是建议，promise对象后面跟catch方法，这样可以处理Promise内部发生的错误
- 基本用法
  - [catch()](../catch().html)

### finally()

- 什么时候执行
  - 当 Promise 状态发生变化时，无论如何变化都会执行，不变化不执行
- 本质
  - finally()本质上是 then() 的特例
  - 一般用不上

## Promise 的构造函数方法

通过Promise构造函数调用的方法叫做构造函数方法。

### Promise.resolve()

- 本质
  - 是成功状态 Promise 的一种简写形式
  - 原：new Promise(resolve => resolve('foo'));
    - 第一个resolve是形参
    - 第二个resolve是方法名，不能乱写
  - 现：Promise.resolve('foo');
- 参数
  - 一般参数
    ```javascript
    Promise.resolve('foo').then(data => {
        console.log(data);
    });
    ```
  - Promise
    ```javascript
    const p1 = new Promise(resolve => {
        setTimeout(resolve,1000,'I am done');
        //setTimeout(() => {
        //  resolve('我执行了');    
        //},1000);
    });
    Promise.resolve(p1).then(data => {
        console.log(data);
    });
    //等价于
    //p1.then(data => {
    //  console.log(data);
    //});
    console.log(Promise.resolve(p1)===p1);//true
    ```
    当 resolve 函数接收的是 Promise 对象时，后面的 then 会根据传递的 Promise 对象的状态变化决定执行哪一个回调
  - 具有 then() 方法的对象
    ```javascript
    const thenable={
        then(){
            console.log('then');
        }
    };
    Promise.resolve(thenable).then(
        data => console.log(data),
        err => console.log(err)
    );
    console.log(Promise.resolve(thenable));
    ```

### Promise.reject()

- 失败状态 Promise 的一种简写形式
  ```javascript
  //new Promise((resolve,reject) => {
  //    reject('reason');
  //});
  //等价于
  Promise.reject('reason');
  ```
- 参数
  - 不管什么参数，都会原封不动地向后传递，作为后续方法的参数
    ```javascript
    const p1 = new Promise(resolve => {
        setTimeout(resolve,1000,'I am done');
    });
    Promise.reject(p1).catch(err => console.log(err));
    ```
    ```javascript
    new Promise((resolve,reject) => {
        resolve(123);
    }).then(data => {
        //return data;
        //return Promise.resolve(data);
        return Promise.reject('reason');
    }).then(data => {
        console.log(data);
    }).catch(err => console.log(err));
    ```
### Promise.all()

- 有什么用
  - Promise.all() 关注多个 Promise 对象的状态变化
  - 传入多个 Promise 实例，包装成一个新的 Promise 实例返回
- 基本用法
  ```javascript
  const delay = ms => {
      return new Promise(resolve => {
          setTimeout(resolve,ms);
      });
  };

  const p1 = delay(1000).then(() => {
      console.log('p1 completed');
      return 'p1';
  });
  const p2 = delay(2000).then(() => {
      console.log('p2 completed');
      return 'p2';
  })

  const p = Promise.all([p1,p2]);
  p.then(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
  )
  ```
- 小结
  - Promise.all() 的状态变化与所有传入的 Promsie 实例对象状态有关
  - 所有状态都变成 resolved，最终的状态才会变成 resolved
  - 只要有一个变成 reject，最终的状态就变成 rejected

### Promise.race()

- 有什么用
  ```javascript
  const delay = ms => {
      return new Promise(resolve => {
          setTimeout(resolve,ms);
      });
  };

  const p1 = delay(1000).then(() => {
      console.log('p1 completed');
      return 'p1';
  });
  const p2 = delay(2000).then(() => {
      console.log('p2 completed');
      return 'p2';
  })

  const racePromise = Promise.race([p1,p2])
  racePromise.then(data => {
      console.log(data);
  },err => {
      console.log(err);
  })
  ```
  Promise.race() 的状态取决于第一个完成的 Promise 实例对象，如果第一个完成的成功了，那最终就是成功；如果第一个完成的失败了，那最终的就是失败

### Promise.allSettled()

- 有什么用
  ```javascript
  const delay = ms => {
      return new Promise(resolve => {
          setTimeout(resolve,ms);
      });
  };

  const p1 = delay(1000).then(() => {
      console.log('p1 completed');
      return 'p1';
  });
  const p2 = delay(2000).then(() => {
      console.log('p2 completed');
      return 'p2';
  });

  const allSettledPromise = Promise.allSettled([p1,p2]);
  allSettledPromise.then(
      data => {
          console.log('succ',data);
      },
      //err => {
      //    console.log(err);
      //}
      //allSettled永远不会执行第二个回调
  );
  ```
  Promise.allSettled() 的状态与传入的 Promise 状态无关，永远都是成功的，它只会忠实的记录下各个 Promise 的表现。

## Promise 的注意事项和应用

### Promise 的注意事项

- resolve 或 reject 执行后的代码
  - 会执行，但是不推荐
  ```javascript
  new Promise((resolve,reject) => {
      resolve(234);//推荐：return resolve(234);
      //reject('reason');//推荐return reject('reason');
      console.log('hi');
  });
  ```
  推荐在调用 resolve 或 reject 函数的时候加上 return，不再执行他们后面的代码
- Promise.all/race/allSettled 的参数问题
  - 参数如果不是 Promise对象 数组，会将不是 Promise 的数组元素转变成 Promise 对象
  ```javascript
  Promise.all([1,2,3]).then(datas => {
      console.log(datas);
  });
  //等价于
  Promise.all([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
  ]).then(datas => {
      console.log(datas);
  });
  ```
  - 不只是数组，任何可遍历的都可以作为参数
    - 数组、字符串、Set、Map、NodeList、arguments
  ```javascript
  Promise.all(new Set([1,2,3])).then(datas => {
      console.log(datas);
  })
  ```
- Promise.all/race/allSettled的错误处理
  ```javascript
  const delay = ms => {
      return new Promise(resolve => {
          setTimeout(resolve,ms);
      });
  };

  const p1 = delay(1000).then(() => {
      console.log('p1 completed');
      return Promise.reject('reason');
  })
    //.catch(err => {
    //    console.log('p1',err);
    //});
  const p2 = delay(2000).then(() => {
      console.log('p2 completed');
      return 'p2';
  })
    //.catch(err => {
    //    console.log('p2',err);
    //});

  const allPromise = Promise.all([p1,p2]);
  allPromise.then(datas => {
      console.log(datas);
  }).catch(err => console.log(err));
  ```
  - 错误即可以单独处理，也可以统一处理
  - 一旦被处理，就不会在其他地方再处理一遍
  
### Promise 的应用

- 异步加载图片 [loadImgAsync](../promise-test.html)
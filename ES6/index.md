
### ES6中高频面试题

1、let、const 与 var 的区别 ？

```md
 同： 都是用于在JS中声明变量
 异：
  - 作用域不同： 
    var: 函数作用域（全局作用域）；
    const/let: 块级作用域({}内有效)
  - 变量提升
    var声明的变量存在变量提升(初始值为undefined),会被提到作用域顶部
    const/let存在暂时性死区(TDZ),声明前访问会报错
  - 重复声明
    var允许重复声明（后声明的覆盖前面的）
    const/let同一作用域内声明会报错
  - 全局作用域下的行为
    var会成为window的属性
    const/let不会
  - const的特殊性
    const: 必须初始化(否则报错)，一旦赋值不可修改，如果值是数组或对象，对象/数组的属性或元素可修改
```

2、普通函数与箭头函数的区别？

```md
  - 写法不同
   普通函数function定义，箭头函数 =>,更简洁，根据情况可省略{}和return
  - This不同
   普通函数中This由函数调用时确定；指向函数运行时的对象；动态this可以通过apply/call/bind修改This指向
   箭头函数没有自己的This,函数内部This指向上层作用域：固定this，不可以修改This指向
  - 是否可以被New
   普通函数(构造函数)可以通过new关键字创建实例，有prototype属性
   箭头函数不可以，没有prototype属性，也没有super、new.target。
  - arguments 对象​
   普通函数内部有arguments对象(类数组)，包含所有参数
   箭头函数不存在有arguments对象，可用...rest剩余参数代替
  - yield
   箭头函数不可以使用yield命令，不能用做Generator 函数
```

3、for in 与 for of 有什么区别？

```md
  for in 主要用于遍历一个对象的可枚举属性(Symbol属性除外), 包括从原型上继承的属性(可用hasOwnProperty屏蔽掉)
  
  for of 主要用于遍历可迭代对象的值; 可迭代对象(只要数据结构部署了Symbol.iterator属性)如Array/String/Set/Map/TypedArray/NodeList (其他DOM集合)，包括用户的自定义迭代对象。

```
4、Promise 相关面试题
 - 4.1 简单介绍一下Promise？ 有什么作用
```md
  Promise是ES6引入的一种异步编程的解决方案，旨在解决传统回调函数导致的 `回调地狱`问题，使异步代码更易读、可维护。
  特点：
    1、Promise对象有3种状态： `pending`（进行中）、`fulfilled`(已成功)、`rejected`(已失败)
    2、状态一旦变成fulfilled或者rejected，`不可逆`
    3、支持链式调用（可通过then或者catch链式处理异步结果，避免多层嵌套; 、错误冒泡(链式调用中，若某一步发生错误，会跳过后续 .then()，直接进入最近的 .catch())
    4、值透传机制：
       Promise在链式调用过程中，如果then的回调(成功或失败)缺失或者不是一个函数，会触发值透传。
       核心：
        .then中的onfulfilled未定义，Promise会将​​成功值​​透传到下一个.then()的onFulfilled
        .then()未提供onRejected回调，Promise会将​​失败原因​​透传到下一个.then()的onRejected或最近的.catch()。
        .then()的参数不是函数（如数字、对象等），会被视为未定义，触发透传
        
```js
 // Callback Hell
 getData(a => {
   processA(a, b => {
    processB(b, c => {
      // ... 多层嵌套
    });
  });
});

// Promise链式调用
 getData()
  .then(a => processA(a))
  .then(b => processB(b))
  .then(c => processC(c));

// catch统一处理链式调用的错误
 fetchData()
  .then(step1)
  .then(step2)
  .catch(error => {
    console.error("操作失败:", error);
  });

// 支持请求并行和竞态操作
// 并行请求
Promise.all([fetchUser(), fetchOrders()])
  .then(([user, orders]) => renderPage(user, orders));

// 竞态请求（如超时控制）
Promise.race([fetchData(), timeout(5000)])
  .then(data => handleData(data));

// 值透传
Promise.resolve(1)
  .then(2) // onfulfilled非函数，透传1
  .then(value => value + 1) // 得到2
  .then(3) // onfulfilled非函数，透传2
  .then(value => console.log(value)); // 输出2
```
```
 - 4.2 Promise.all 与 Promise.race区别及使用场景

```js
  同： 两者都需要接收一个数组,并且数组元素是Promise实例
  不同：
   Promise.all需要等待所有结果响应后，才会返回结果； 一旦



```


 - 4.3、手写PromiseA+、 Promise.all、Promise.race实现

 ```md



 ```


5、异步编程的解决方案

```md
 callback
 Promise
 async/await
 Generator
```

6、Set、Map、WeakSet、WeakMap的区别？

```md


```

7、forEach 和 map 区别：forEach侧重遍历执行,map侧重转换数据
 - 返回值
   forEach 无返回值 ,map返回新数组
 - 是否修改原数组
   forEach否(除非回调中操作原数组)， map 否 (生成新数组，原数组不变)
 - 链式调用
   forEach不支持，map支持(返回新数组，可继续链式操作)
 - 终止遍历
    两者均无法通过 break 或 return 提前终止遍历（会抛出语法错误）。
    若需提前终止，需改用 for 循环或 some/every 方法。如果forEach 强行终止，可通过`抛出异常`终止循环
 
```JS
try {
  [1, 2, 3].forEach((item) => {
    if (item === 2) throw new Error("break"); // 通过抛出异常终止循环
    console.log(item); // 输出 1
  });
} catch (e) {
  // 捕获异常，无操作
}

```

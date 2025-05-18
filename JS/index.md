### JS 高频面试题

#### 1、JS 数据类型有哪些？

- 基本数据类型: String/Number/Boolean/Null/Undefined/Symbol(ES6 新增)/Bigint(ES2020 新增)
- 引用类型:
  - Object/Function/Array 以及 JS 内置的一些对象：Math、Date、RegExp、Map、Set 等

> PS: 原始类型按照"值"访问；储存在 stack; 引用类型按照"引用"访问; 储存在 heap；

#### 2、JS 数据类型判断及优缺点 ？

- typeof

  - typeof 适用于判断除 null 以外的基本数据类型；
  - typeof 无法准确判断引用类型，除了 function 类型可以准确判断，对于 Array、Date、RegExp 等无法区分。

- instanceof

  - instanceof 适用于判断某个对象是否属于某个构造函数，不能用于基本类型判断
  - 无法跨全局环境(iframe 或不同窗口对象)、编码中原型链可能被篡改，导致判断失误

    ```js
    // 跨 iframe 时可能失效
    iframeArray instanceof Array; // false

    //原型链可能被修改
    obj.__proto__ = Array.prototype;
    ```

- constructor

  - 无法跨全局环境(iframe 或不同窗口对象)、编码中原型链可能被篡改，导致判断失误

    ```js
    const arr = [1, 2];
    arr.__proto__ = {}; //手动修改原型链
    console.log(arr.constructor === Array); // false（实际指向 Object）
    ```

- Object.prototype.toString.call() -> 推荐使用

#### 3、null 和 undefined 的区别？

- undefined 表示未定义,有以下场景会出现
  - 变量未初始化
  - 函数参数未传值
  - 试图访问对象不存在的属性
  - 函数无返回值
- null 表示一个空值，通常开发者主动赋值.
  - 清空变量引用
  - 某些逾期结果获取不到，null 值会被返回如 document.getElementById('btn')

#### 4、谈一下 JS 中的 this 指向?

- 全局作用域下，无论是否处于严格模式下，this 都指向 window、
- 函数作用域下：严格模式下，this 为 undefined、非严格模式下，由调用方和运行环境确定。
  - 对象调用自己的方法,this 指向该对象
  - DOM 事件监听程序,this 指向 DOM 节点对象
  - setInterval/seTimeout,this 指向 window
  - 箭头函数中没有 this; this 指向父级
  - 原型链中 this,指向 new 出的实例

#### 5、call/apply/bind 区别 ？

```md
同： call/apply/bind 都用于修改函数中的 This 指向，但使用方式不同
异：
1、apply(thisObj, arrayLike/array): 数组或者类数组传参,立即执行
2、call(thisObj, arg1,arg2...)： 参数列表（逐个传参）,立即执行
3、bind(thisObj,arg1,arg2...),bind 会创造一个新函数,不会立即执行，传递的参数会变成新函数的参数
```

#### 6、谈一下 JS 中闭包及应用场景？

- 概念：
  - 有权访问另一个函数中变量的函数(JS 高级编程)
  - 能够访问`自由变量`的函数(MDN),另一种说法是函数和创建该函数的词法环境的组合。
- 特点
  - 记忆性: 可以记住创建它时的上下文环境
  - 封装性：可以封装私有变量和方法，避免全局污染
  - 持久性：即使外部函数执行完成，仍能访问其内部变量
- 优缺点
  - 闭包能延长变量生命周期。避免全局变量污染，但是由于变量常驻内存，过度使用，可能导致内存泄漏
- 应用场景

```js
// 函数柯里化(Curring)：将多参数函数转成单参数的链式调用
function add(x) {
  return (x) => x + y; // 缓存x
}

// 缓存(Memoize): 缓存计算结果，提升性能

/* 
  防抖节流()：限制高频事件的触发频率
*/

// 防抖函数(Debounce)
function debounce(fn, delay = 300) {
  let timer = null; // 闭包保存定时器 ID
  return function (...args) {
    clearTimeout(timer); // 清除之前的定时器
    timer = setTimeout(() => {
      fn.apply(this, args); // 延迟执行
    }, delay);
  };
}
// 节流函数(Throttle)
function throttle(fn, interval = 300) {
  let timer = null; // 闭包保存定时器 ID
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args); // 执行回调
        timer = null; // 重置定时器
      }, interval);
    }
  };
}

/* 
  模拟私有变量和方法:隐藏数据，防止外部修改
*/
```

#### 7、如何避免闭包导致的内存泄漏？
 - 及时解除不再使用的引用（如移除事件监听）
 - 使用 WeakMap 或 WeakSet 管理关联数据。
 - 清除定时器/事件监听等

#### 8、谈一下内存泄漏，及常用场景及解决方案？

- 概念：
  内存泄漏指的是程序在运行过程中不在使用的内存无法释放，导致内存占用持续增长，引发性能下降甚至系统崩溃的现象。
- 内存泄漏常见场景

  - 意外的全局变量
  - 未及时清除的定时器和回调
  - 闭包导致的变量未释放
  - 未释放的 DOM 引用
  - 事件监听未解绑
  - 使用 Map 或 Set 存储对象引用，阻止垃圾回收。
  - 第三方库未正确销毁

- 解决方案：

  - 使用严格模式或者模块化以及正确的 let/const 方式，避免意外的全局变量

  ```js
  function add() {
    globar = "全局变量"; //   建议使用let/const声明
    console.log("globar-", global);
  }
  ```

  - 不需要时手动清除定时器（clearInterval/clearTimeout)/使用 removeEventListener 移除事件监听。

  ```js
  const intervalId = setInterval(() => {
    // 持续执行...
  }, 1000);

  // 未调用 clearInterval(intervalId) 导致定时器无法回收
  ```

  - 闭包中的大对象引用，及时清除大对象，或者解除引用，促进垃圾回收

  ```js
  function createClosureLeak() {
    const bigData = new Array(100000).fill("data"); // 占用内存的大对象
    const privateKey = Math.random(); // 重要敏感数据

    return function () {
      // 闭包中只使用了privateKey，但无意中保留了bigData的引用
      console.log("Secret key:", privateKey);
    };
  }

  //使用示例
  let leakedClosure = createClosureLeak();
  leakedClosure = null; // 即使设为null，bigData也不会被释放
  ```

  - 及时在 DOM 移除时，设置 DOM 为 null 解除引用

  ```js
  function cleanDOM() {
    const list = document.querySelector(".big-list");
    list.remove();
    list = null; // 释放DOM引用
  }
  ```

  - 第三方库正确销毁

  ```js
  // 图表库示例
  let chartInstance = echarts.init(dom);

  // 正确销毁
  function destroyChart() {
    if (chartInstance) {
      chartInstance.dispose(); // 调用库的销毁方法
      chartInstance = null; // 解除引用
    }
  }
  ```

  - 使用 weakSet 和 weakMap 弱引用代替强引用

#### 9、讲一下 JS 中的垃圾回收？

- 概念：
  JS 中的垃圾回收是一种自动管理内存的机制；用于识别和释放不再使用的内存，防止内存泄漏。开发者无需手动分配或释放内存，引擎会自动跟踪对象的使用情况，并在适当的时候回收内存。
- 常见垃圾回收策略
  - 引用计数(Reference Counting)
  - 标记清除(Mark and Sweep)
  - 分代回收(Generational Collection)
  - 增量/空闲回收（Incremental GC）/ （Incremental GC）
    > 由于引擎无法识别对象是否 `用不用`的问题，所以以上回收策略都是不完美的解决方案;现代 JavaScript 引擎（如 V8、SpiderMonkey）通过组合多种策略（分代 + 增量 + 并行）优化垃圾回收，开发者应关注代码习惯，避免常见内存泄漏问题
- 回收策略的优缺点

  - 引用计数是通过计算对象被引用的次数，如果为 0 会被垃圾回收； 实时性高,会被立即回收；但如果存在`循环引用`问题，引用次数永远不能为 0,无法被回收

  ```js
  //循环引用
  let objA = { a: null };
  let objB = { b: null };
  objA.a = objB; // objA 引用 objB
  objB.b = objA; // objB 引用 objA
  // 即使 objA 和 objB 不再被使用，引用计数仍为 1，无法回收
  ```

  - 标记清除

  ```md
  ​​ 原理:
  ​​ 标记阶段 ​​：从根对象（全局对象、活动执行上下文等）出发，递归标记所有可达对象。
  ​ ​ 清除阶段 ​​：遍历堆内存，回收未被标记的对象。
  ​​ 优点:
  解决了循环引用问题。
  缺点:
  ​​ 暂停时间（Stop-The-World）​​：标记和清除过程会阻塞脚本执行，可能导致页面卡顿。
  ​​ 内存碎片 ​​：清除后`内存不连续`，可能影响后续内存分配效率。
  ```

  - 分代回收

  ```md
  原理 ​​：基于对象存活时间将内存分为两代：
  ​​ 新生代（Young Generation）​​：存放短生命周期的对象（如局部变量），使用 ​​Scavenge 算法 ​​（复制存活对象到新空间，清空旧空间）。
  ​​ 老生代（Old Generation）​​：存放长生命周期对象，使用 ​​ 标记-清除 ​​ 或 ​​ 标记-整理（Mark-and-Compact）​​（清除后整理内存碎片）。
  ​​ 优点 ​​：
  针对不同对象特性优化，提升回收效率。
  ​​ 缺点 ​​：
  实现复杂，需维护多代内存结构。
  ```

  - 增量/空闲回收

  ```md
  增量回收 ​​：将垃圾回收任务拆分为多个小任务，穿插在脚本执行间隙，减少卡顿。
  ​空闲回收 ​​：在浏览器空闲时段（如 requestIdleCallback）执行回收，避免影响用户体验。
  ```

#### 10、谈一下 JS 中的高阶函数(HOF)？

```md
高阶函数： 能操作其他函数的函数。(`可以接受函数作为参数、或者函数作为返回值(满足其一即可)返回的函数`)就可称之为高阶函数。

- 如 Array 原型上的 map/filter...，可以接受 callback 作为参数
- 函数作为返回值: 如闭包
```

#### 11、函数柯里化？ 函数组合？

- 函数柯里化(curring)：将一个多参数的函数分解成单参数的链式调用的过程称为函数柯里化,如 f(x,y,z) -> f(x)(y,z) ->f(x)(y)(z)，本质是对函数的一种转换。

```js
// 普通多参函数
function add(a, b, c) {
  return a + b + c;
}
// 柯里化之后
const curriedAdd = (x) => (y) => (z) => x + y + z;
curriedAdd(1)(2)(3); //6

// 通用实现
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}
```

- 函数组合(compose)：将多个函数按照执行顺序组合形成一个新的函数，前一个函数的输出作为后一个函数的输入。H(x) = f(g(x))

```js
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x); //实现
```

#### 12、实例、原型与原型链？

- 实例（Instance）
  - 通过构造函数 new 出来的对象，就是实例
- 原型(Prototype)
  - 实例的**proto**属性(构造函数的 Prototype 属性)指向的对象就是原型对象
- 原型链 (Prorotye Chain)
  - 实例的**proto**的链接形成的链式结构就是原型链，当访问对象属性时，则会沿着原型链向上查找，直至找到或到达终点(null)

#### 13、谈一下 new 构造实例经历了哪些过程？ 手动实现一个 myNew 函数

- new 实例化过程
  - 创建一个空对象，并且其原型指向构造函数的 Prototype 属性
  - 绑定上下文; 调用构造函数，将 this 绑定到新创建的对象
  - 处理返回值
    - 如果构造函数 return 对象，则 new 实例化对象就是该对象
    - 如果构造函数 return 原始值，则忽略，返回步骤 1 创建的对象
- 手动实现一个 myNew 函数

  ```js
  function myNew(constructor, ...args) {
    if (typeof constructor !== "function") {
      throw new TypeError(`${constructor} is not a constructor`);
    }
    // 创建对象，链接原型
    let obj = Object.create(constructor.prototype); // Object.create() 基于现有对象作为原型创建一个新对象
    let result; // 返回值

    try {
      result = constructor.call(obj, args);
    } catch (error) {
      throw error; //处理构造函数异常
    }
    // 处理返回值
    return result instanceof Object ? result : obj;
  }
  ```

#### 14、ES5、ES6 中继承实现方式

- ES5 继承
  - 盗用构造函数继承(又称: "对象伪装"或 "经典继承")
  - 组合继承(又称"伪经典继承")
  - 原型式继承
  - 寄生式继承
  - 继承组合式继承
- ES6 继承
  - 通过 `extends` 与`super`关键字配合实现继承

#### 15、JS 对象中的深浅拷贝区别？深拷贝几种实现方式的优缺点、手动实现一个较完美的深拷贝

- 区别：
- 浅拷贝仅拷贝第一层属性(嵌套属性不复制)，对于引用类型拷贝的是引用地址。修改嵌套属性会影响原对象。
- 深拷相当于递归复制所有层级的属性(包括嵌套属性),拷贝对象和原对象是两个完全独立的副本。修改嵌套属性不影响原对象。
- 常见的深浅拷贝
- shallow copy
  - {...obj}
  - Object.assign()
  - Array.prototype.slice()
  - Array.prototype.concat()
- deepClone Copy
  - JSON.parse(JSON.stringfy())
  - deepClone(递归)
  - 第三方库 lodash.deepClone 、jQuery 的 $.extend(true, {}, obj)
  - 其他的 API,如 MessageChannel、History API、Notification API、structuredClone(JS 原生 API 存在兼容性问题)
- 深拷贝实现方式的一些利与弊
- JSON.parse(JSON.stringfy())对于可以被序列化的数据类型才可以进行拷贝，否则会出现属性丢失,报错问题，无法解决`循环引用`问题
  - 无法处理 Symbol、function、undefined,循环引用
  - Date 类型会被转成字符串(反序列化后无法恢复为 Date)
  - ​RegExp​​、​​Map​​、​​Set​​ 等会变成空对象
  - 无法解决循环引用问题
- deepClone(递归手动实现)
  - 灵活可控
- 第三方库 lodash.deepClone 、jQuery 的 $.extend(true, {}, obj)较完美，生产环境推荐使用
- structuredClone API(原生 API)，现代浏览器推荐使用
  - 不支持 IE 和旧版浏览器，存在兼容性问题
  - ​​ 无法处理函数 ​​：会抛出 DOMException 错误。
- 手动实现一个较完美的深拷贝？

```js
// 支持循环引用、各种数据类型（包括 Date、RegExp、Map、Set 等），并保持原型链
function deepClone(target, map = new WeakMap()) {
  // 处理非对象类型和 null（typeof null === 'object'）
  if (target === null || typeof target !== "object") {
    return target;
  }

  // 处理特殊对象类型
  if (target instanceof Date) {
    return new Date(target.getTime());
  }

  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags);
  }

  // 处理循环引用
  if (map.has(target)) {
    return map.get(target);
  }

  // 处理 Map
  if (target instanceof Map) {
    const cloneMap = new Map();
    map.set(target, cloneMap);
    target.forEach((value, key) => {
      cloneMap.set(deepClone(key, map), deepClone(value, map));
    });
    return cloneMap;
  }

  // 处理 Set
  if (target instanceof Set) {
    const cloneSet = new Set();
    map.set(target, cloneSet);
    target.forEach((value) => {
      cloneSet.add(deepClone(value, map));
    });
    return cloneSet;
  }

  // 处理数组和对象
  const cloneObj = Array.isArray(target)
    ? []
    : Object.create(Object.getPrototypeOf(target));

  map.set(target, cloneObj);

  // 处理 Symbol 作为属性键
  const symbols = Object.getOwnPropertySymbols(target);
  const allKeys = [...Object.keys(target), ...symbols];

  for (const key of allKeys) {
    cloneObj[key] = deepClone(target[key], map);
  }

  return cloneObj;
}
```

#### 16、数组去重实现？

- [...new Set(array)]
- filter + indexOf
- reduce
- 对象键值唯一
- Map 结构
- 双重 for 循环
- 借助第三方库 lodash

```js
// new Set() 时间复杂度 O(n)；天然支持所有数据类型（包括 NaN），无法处理 对象引用类型去重
function uniqueArr(arr) {
  return [...new Set(arr)];
}
//filter + indexOf 时间复杂度 O(n²)
function uniqueArr(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
// reduce  时间复杂度 O(n²),性能较差，无法处理 NaN
function uniqueArr(arr) {
  return arr.reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur];
  }, []);
}

// 对象键值唯一： 时间复杂度 O(n)
function uniqueArr(arr) {
  let obj = {};
  let result = [];
  for (const item of arr) {
    const key = typeof item + JSON.stringify(item);
    if (!obj[key]) {
      obj[key] = true;
      result.push(item);
    }
  }
  return result;
}
// Map结构：时间复杂度 O(n) 无法深度去重
function uniqueArr(arr) {
  let map = new Map();
  let result = [];
  for (const item of arr) {
    if (!map.has(item)) {
      map.set(item, true);
      result.push(item);
    }
  }
  return result;
}
// 双重for循环: 性能最差（时间复杂度 O(n²),无法处理NaN，对象
function uniqueArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
```

#### 17、数组扁平化： 将多维数组转成一维数组

- flat() (ES6)
- 递归(reduce + concat)
- 迭代+ 队列/栈
- toString + split + map
- 正则(regxp)
- 生成器函数（ES6）

```js
// ES6的 flat() 可指定depth
function flatten(arr) {
  return arr.flat(Infinity);
}
//递归(reduce+concat)
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
// 迭代+ 队列、栈
function flatten(arr) {
  let stack = [...arr];
  let result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }
}

// toString
function flatten(arr) {
  return arr.toString().split(",").map(Number);
}
// 正则 (regxp)
function flatten(arr) {
  return JSON.stringify(arr).replace(/\[|\]/g, "").split(",").map(Number);
}

// generator
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}
console.log([...flatten(arr)]);
```

#### 18、伪数组(类数组对象)以及真伪数组转换?

- 概念：具有 length 属性，可以通过索引访问元素，但不具备数组方法(forEach/map)的对象。
- 常见的伪数组：NodeList、arguments 对象、字符串等
- 真伪数组转换方法
  - [...arrayLike]
  - Array.from(arrayLike)
  - Array.prototype.slice.call(arrayLike)/ [].slice.call(arrayLike)

#### 19、数组打乱(打乱一个数组排序，随机排序)

- 打乱数组常见方法
  - sort + Math.random()
  - Fisher-Yates 洗牌算法
  - 随机映射法
  - lodash 库的 shuffle 方法 (推荐)
- 打乱数组方法的优缺点
  - sort + Math.random()随机分布不均匀，时间复杂度 O(n log n)（低效）
  -
- 使用场景
  - 随机播放音乐列表
  - 生成随机测试数据
  - 抽奖或游戏中的随机排序
  - 轮播图随机展示顺序

```js
// sort + Math.random() 看似随机，实际分布不均匀
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

//Fisher-Yates 洗牌算法； 时间复杂度为O(n)
function shuffle(arr) {
  const array = arr.slice(); // 不修改原数组
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 随机选取下标
    [array[i], array[j]] = [array[j], array[i]]; // 交换元素
  }
  return array;
}
//Fisher-Yates 洗牌算法优化版
const shuffle = (arr) =>
  arr.reduce(
    (a, _, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    },
    [...arr]
  );

// 随机映射法(不推荐)：为每个元素生成随机数作为权重，重新排序
const shuffled = arr
  .map(v => ({ value: v, rand: Math.random() }))
  .sort((a, b) => a.rand - b.rand)
  .map(v => v.value);

// lodash中的shuffle
import { shuffle } from 'lodash';
const shuffled = shuffle(arr);

// 测试 Fisher-Yates 算法的均匀性
const count = Array(5).fill(0).map(() => Array(5).fill(0));
for (let i = 0; i < 100000; i++) {
  const arr = [0, 1, 2, 3, 4];
  const shuffled = shuffle(arr);
  shuffled.forEach((num, pos) => count[num][pos]++);
}
console.log("位置分布统计:", count);
```

#### 20、JS中的防抖（Debounce）节流（Throttle） ？
- 概念： JS中的防抖和节流都是控制高频事件执行的频率。常用于`resize`，`input`,`scroll`等场景。
- 防抖节流实现方式对比
  - 防抖(Debounce): 事件首次触发，回调延迟执行，若在延迟时间内重新触发,则重新计时。
  ```js
   // 定时器(基础版)

   // 定时器(高级版，带immediate选项)

   
   // 时间戳版

  ```

  
  - 节流(Throttle)






#### 21、EventLoop(事件循环)是什么？


<!-- DOM -->

#### 22、事件冒泡与事件捕获 ？

#### 23、事件委托？

#### 24、跨域及常见解决方式？


#### 25、localStorage/sessionStorage/cookie区别？


#### 26、
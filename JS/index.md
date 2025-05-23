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
  ​ 空闲回收 ​​：在浏览器空闲时段（如 requestIdleCallback）执行回收，避免影响用户体验。
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
  - Fisher-Yates 洗牌算法
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
  .map((v) => ({ value: v, rand: Math.random() }))
  .sort((a, b) => a.rand - b.rand)
  .map((v) => v.value);

// lodash中的shuffle
import { shuffle } from "lodash";
const shuffled = shuffle(arr);

// 测试 Fisher-Yates 算法的均匀性
const count = Array(5)
  .fill(0)
  .map(() => Array(5).fill(0));
for (let i = 0; i < 100000; i++) {
  const arr = [0, 1, 2, 3, 4];
  const shuffled = shuffle(arr);
  shuffled.forEach((num, pos) => count[num][pos]++);
}
console.log("位置分布统计:", count);
```

#### 20、JS 中的防抖（Debounce）节流（Throttle） ？

- 概念： JS 中的防抖和节流都是控制高频事件执行的频率。常用于`resize`，`input`,`scroll`等场景。
- 防抖节流实现方式对比

  - 防抖(Debounce): 事件首次触发，回调延迟执行，若在延迟时间内重新触发,则重新计时
    - 特点：连续操作后延迟执行 (只执行最后一次)

  ```js
  // 定时器(基础版)： 事件首次触发需要延迟等待，无法立即执行
  function debounce(func, dela = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // 定时器(高级版，带immediate选项,支持立即执行): 支持事件首次触发，立即执行： 最后一次可能不执行
  function debounce(func, delay, immediate = false) {
    let timer = null;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      if (immediate && !timer) {
        func.apply(context, args);
      }
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) func.apply(context, args);
      }, delay);
    };
  }
  ```

  - 节流(Throttle): 事件触发后，固定间隔时间内只执行一次
    - 特点：固定频率执行

  ```js
  // 时间戳版 (基础版): 首次触发立即执行,最后一次触发可能在时间间隔外，导致未执行
  function throttle(func, delay) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        func.apply(this, args);
        lastTime = now;
      }
    };
  }
  // 定时器版(基础版): 首次触发不会立即执行, 最后一次触发会延迟执行
  function throttle(func, delay) {
    let timer;
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }

  // 高级版(时间戳结合定时器): 首次立即执行，最后一次触发保证执行, 代码复杂度高
  function throttle(func, delay) {
    let lastTime = 0;
    let timer = null;
    return function (...args) {
      const context = this;
      const now = Date.now();
      const remaining = delay - (now - lastTime);

      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        func.apply(context, args);
        lastTime = now;
      } else if (!timer) {
        timer = setTimeout(() => {
          func.apply(context, args);
          lastTime = Date.now();
          timer = null;
        }, remaining);
      }
    };
  }
  ```

- 总结
  - 防抖：适合「最终状态」场景（如输入停止后搜索）。
  - 节流：适合「过程控制」场景（如滚动时计算位置）。
  - 项目中实际选择：
    - 简单场景用基础版本。
    - 需要首次/最后一次控制时用混合版本
    - 复杂项目推荐使用 Lodash 或自行封装可配置版本

#### 21、EventLoop(事件循环)是什么？

- 概念：EventLoop 是 JS 处理异步任务的调度机制，通过循环调用栈（callStack）和 任务队列（Task Queue）实现非阻塞执行。
- 宏任务(MacroTask)和微任务(MicroTask)分类

  - 宏任务由宿主环境（Node/浏览器）触发，进入宏任务队列；
    - script（整体代码）
    - setTimeout / setInterval
    - setImmediate（Node.js）
    - I/O 操作（文件读写、网络请求）
    - UI 渲染（浏览器）
    - DOM 事件回调
    - postMessage
    - MessageChannel
    - requestAnimationFrame（浏览器）
      > PS: 宏任务之间的执行是串行的，即一个宏任务完成后，才会执行下一个宏任务.
  - 微任务由 JS 引擎触发，进入微任务队列
    - Promise.then/catch/finally
    - async/await（底层基于 Promise）
    - queueMicrotask
    - MutationObserver（浏览器）
    - process.nextTick（Node.js）
      > PS: 每个宏任务执行完毕后，会立即执行当前宏任务中产生的所有微任务，然后再执行下一个宏任务

- 事件循环执行顺序顺序
  - 执行一次宏任务（script 整体代码）
  - JS 主线程执行同步任务，放入 callStack,执行完毕出栈
  - 循环微任务队列，直至微任务队列清空； 如果出现微任务嵌套微任务(必须一次性清空),微任务嵌套宏任务，宏任务会被推迟到下一个事件循环（优先级低于当前微任务队列）
  - 执行宏任务，如果宏任务嵌套微任务，这些微任务会立即执行，而不是等待下一个事件循环（微任务`插队`现象）
- 关键性结论
  - 微任务优先级优于宏任务(nodejs相反)
- 面试题

```js
console.log("start");

Promise.resolve().then(() => {
  console.log("A1")
    Promise.resolve()
      .then(() => {
        console.log("A2-1");
      })
      .then(() => {
        console.log("A2-2");
      });
});

Promise.resolve()
  .then(() => {
    console.log("B1-1");
    setTimeout(() => {
      console.log("B2");
    }, 0);
  })
  .then(() => {
    console.log("B1-2");
  });

setTimeout(() => {
  console.log("C1");
  Promise.resolve().then(() => {
    console.log("C2");
  });
}, 0);

setTimeout(() => {
  console.log("D1");
  setTimeout(() => {
    console.log("D2");
  }, 0);
}, 0);

console.log("end");

上面代码的执行顺序：
  同步代码先执行： start - end
  微任务队列:
    A1->A2-1 -> A2 -2

```

#### 22、事件冒泡与事件捕获 ？

- 事件冒泡和事件捕获是事件在 DOM 中传播的两个阶段
- 事件流(3 个阶段)
  - 捕获阶段（Capturing Phase）: 从根节点（window）向下传播到目标元素。
  - 目标阶段（Target Phase）: 事件到达目标元素
  - 冒泡阶段（Bubbling Phase）: 从目标元素向上冒泡到根节点
- 阻止事件冒泡的`stopPropagation`和`stopImmediatePropagation` API 区别
  - event.stopPropagation()：阻止事件进一步传播（不影响当前阶段的其他监听器）
  - event.stopImmediatePropagation()：立即停止所有后续监听器执行
- 浏览器兼容性
  - 旧版 IE（≤8）仅支持冒泡，不支持捕获。
  - 现代浏览器均支持完整的事件流模型。
    > 多数事件默认在冒泡阶段触发， addEventListener 第三个参数 true 可启用捕获模式

```js
// 捕获阶段监听（父元素）
document.getElementById("parent").addEventListener(
  "click",
  () => console.log("捕获阶段：父元素被触发"),
  true // 启用捕获模式
);
// 核心要点：冒泡：自下而上，捕获： 自上而下
```

#### 23、事件委托？

- 概念：事件委托也叫事件代理，是 JS 编程中利用`事件冒泡`优化事件处理的编程技巧，将子元素的事件监听绑定在父元素(或者外层元素上)上，借助`事件冒泡`和`e.target`统一处理多个子元素的事件。
- 事件委托优势
  - 单一监听，减少内存占用
  - 动态增加子元素，无需重复绑定
  - 集中处理事件，代码更简洁；避免内存泄漏风险(传统方式需要管理多个监听器的绑定和解绑，易遗漏导致内存泄漏)
- 应用场景
  - 动态元素及大量同类子元素场景

```html
<ul id="oul">
  <li data-index="1">1</li>
  <li data-index="2">2</li>
  <li data-index="3">3</li>
  <li data-index="4">4</li>
  <li data-index="5">5</li>
</ul>
<script>
  let oul = document.getElementById("oul");
  let oli = document.querySelectorAll("ul>li");
  oul.addEventListener("click", function (e) {
    console.log(e.target, e.currentTarget, e.currentTarget === this);
    [...oli].forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
</script>
```

> 注意区分 e.target(用户实际点击的元素) / e.currentTarget (绑定事件监听的元素，恒等于 this)

#### 24、跨域及常见解决方式？

- 跨域本质：浏览器的`同源策略`限制，当请求的协议、域名、端口任意一个不同，浏览器会拦截响应(请求实际已发送到服务器)
- 解决方案及优缺点

  - JSONP(仅支持 GET,安全性低（易受 XSS 攻击）)
    - 本质：利用<script> 标签的跨域能力，通过回调函数接收数据
    - 适用场景：适用于老旧项目或需要兼容不支持 CORS 的浏览器
    ```js
    function handleResponse(data) {
      console.log("Received:", data);
    }
    // 服务端需支持：返回 handleResponse({ data: ... }) 格式
    const script = document.createElement("script");
    script.src = "http://api.example.com/data?callback=handleResponse";
    document.body.appendChild(script);
    ```
  - CORS(跨域资源共享)
    - 什么情况下需要Cors (跨源的HTTP请求)
       - 由 XMLHttpReques 或者Fetch API 发起的跨源 HTTP 请求
       - Web 字体（CSS中通过 @font-face 使用跨源字体资源）
       - WebGL 贴图
       - 使用 drawImage() 将图片或视频画面绘制到 canvas
       - 来自图像的 CSS 图形等
    - 本质: 服务端配置 HTTP 响应头"Access-Control-Allow-Origin"声明允许的跨域来源
    - 适用场景：生产环境主流方案，需要服务端支持。

    ```js
    // Express 中间件; 服务器配置（Node）
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 允许的域名
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // 允许的方法
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // 允许的请求头
      res.header("Access-Control-Allow-Credentials", "true"); // 允许携带 Cookie
      next();
    });
    ```

    - CORS 的预检请求(preflight)（非简单请求会比简单请求多一个预检过程）；预检请求是浏览器安全机制 ​​，确保跨域操作经过服务器授权.
      - 简单请求需要满足的条件
        - 请求方式为 GET、POST、HEAD 任意一种
        - 请求头仅限制为
          - Accept
          - Accept-Language
          - Content-Language
          - Content-Type（且值需符合下一条件）
          - Range（需配合特定条件，如分块请求）
        - Content-Type 只能为 text/plain、multipart/form-data、application/x-www-form-urlencoded 任意一种
        - 请求中没有使用 ReadableStream 对象
        - 请求中的 XMLHttpRequestUpload 对象未注册任何事件监听器(如 onprogress),也就是说，给定一个 XMLHttpRequest 实例 xhr，没有调用 xhr.upload.addEventListener()，以监听该上传请求
      - 非简单请求
        - 不满足简单请求的条件的请求都是非简单请求，在发起真正的 HTTP 请求前，浏览器会增加一个 HTTP 预检的查询请求。确认服务器是否允许本次请求；得到浏览器的准确答复后，浏览器才会发起真正的请求。

  - 代理服务器(Proxy)

    - 本质：前端请求同域代理服务器，由代理转发至目标服务器，绕过浏览器限制；(服务器与服务器之间不存在跨域问题)
    - 开发环境 (vue/react),配置 proxy

    ```js
    module.exports = {
      devServer: {
        proxy: {
          "/api": {
            target: "http://api.example.com",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
          },
        },
      },
    };
    ```

    - 生产环境: Nginx 反向代理: 生产环境部署的标准方案

    ```js
    server {
      listen 80;
      server_name localhost;

      location /api {
        proxy_pass http://api.example.com; # 目标服务器
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        add_header Access-Control-Allow-Origin *; # 可选，也可在目标服务器配置 CORS
      }
    }
    ```

  - postMessage(H5):iframe 嵌套或多窗口间通信， 页面和其打开的新窗口数据通信
  - websocket 协议：天然支持跨域通信

  ```js
  const socket = new WebSocket("ws://api.example.com");
  socket.onmessage = (event) => {
    console.log("Received:", event.data);
  };
  ```

#### 25、localStorage/sessionStorage/cookie 区别？

- 生命周期不同
  - localStorage 永久存储,除非用户手动清除
  - sessionStorage 会话级存储，标签页关闭失效
  - 临时性 cookie(无 Expires 或 Max-Age 属性)，浏览器关闭后自动删除； 持久化 cookie（设置 Expires 或 Max-Age 属性）在过期前有效。
- 存储容量不同
  - localStorage 和 sessionStorage 大约 5MB(不同浏览器可能不同)
  - cookie 大约 4kb(单个域名下 cookie 数量有限制)
- 作用域不同
  - localStorage 同源页面共享
  - sessionStorage 仅限当前标签页
  - cookie 同源页面共享（可设置路径和域名限制）
- 是否自动发送服务器
  - cookie 会随着 HTTP 请求每次携带 cookie,本地存储不会
- 访问权限不同
  - sessionStorage、sessionStorage 仅客户端可以访问
  - cookie 客户端和服务端都可以访问
- 安全性
  - localStorage、sessionStorage 易受 XSS(恶意脚本)攻击
  - cookie 可通过设置 HttpOnly、Secure、SameSite，提高安全性

#### 26、

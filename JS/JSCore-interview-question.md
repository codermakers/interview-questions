# JS 核心概念

### JS 数据类型

**Primitive Type**

- Number
- String
- Boolean
- null
- undefined
- Symbol
- BigInt

**Reference Type**

- Function
- RegExp / Date / 原始包装类型(new Boolean()...) / Math / Window (基本引用类型)
- Object / Array / 定型数组(ArrayBuffer/DataView...) / Set / Map / WeakSet / WeakMap (集合引用类型)

> 区别: 原始类型按照"值"访问；储存在 stack; 引用类型按照"引用"访问; 储存在 heap；

### JS 数据类型 判断

- typeof `适用于判断非null以外的基本类型`
- instanceOf `编程中prototype可能会被重写,所以不安全`
- constructor `编程中constructor可能会被重写,所以不安全`
- Object.prototype.toString.call() `推荐使用,Js的一些lib库也使用这种方法判断`

> typeof 判断基本类型，除了 null 为`object`，基本比较完美，判断引用类型,除了 function，判断为`function` 外，其余均为`object`,无法判断具体类型。
> typeof null 为 'object' 为历史遗留问题，曾有人提出修复这个问题，考虑改动太大，被拒绝了。

### JS 类型转换

**显式转换**

- ToBoolean: Boolean()
  > Boolean(val) 除了 undefined， null， false， NaN， ''， 0 都为 false,其余全为 true`
- ToNumber: Number()

```js
 空字符串、null 、[] 会转成 0;
 NaN / Undefined 会转成 NaN;
 非空字符串，能转成数字的就转成数字，否则转成NaN
```

- ToString: String()、toString()
- parseInt
- parseFloat

**隐式转换**

- 四则运算
  - 加法
    - 当一侧为 String 类型,被识别为字符串拼接，另一侧被转为字符串类型
    - 当一侧为 Number 类型，另一侧为原始类型，则转为 Number 类型
    - 当一侧为 Number 类型，另一侧为引用类型，则转为 String 类型
      > 注意: 以上规则，优先级从高到低
  - 减、乘除
    - 在非 Number 类型中运用这些运算符，会将非 Number 转为 Number
- 逻辑语句(if/while/for)中的隐式运算

  - if(val)默认会将 val 转成 Boolean,除了 undefined， null， false， NaN， ''， 0 这几个会被转成 false,其他[],{}都会被转成 true
  - if(a == b)中，相等符号==，遵循以下规则
    - 规则 1：NaN 和其他任何类型比较永远返回 false（包括和他自己）`NaN == NaN // false`
    - 规则 2：Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型
    - 规则 3：String 和 Number 比较，先将 String 转换为 Number 类型
    - 规则 4：null == undefined 比较结果是 true，除此之外，null、undefined 和其他任何结果的比较值都为 false
    - 规则 5：原始类型和引用类型做比较时，引用类型会依照 ToPrimitive 规则转换为原始类型
      > ToPrimitive 规则，是引用类型向原始类型转变的规则，它遵循先 valueOf 后 toString 的模式期望得到一个原始类型。 如果还是没法得到一个原始类型，就会抛出 TypeError

- !与!!、&&与||等

### This

**this 指向**

- 全局上下文中,无论是否是在严格模式下，this 都指向全局对象 window
- 函数上下文中，严格模式下,this 为 undefined,非严格模式下，运行时绑定，取决于调用方和运行环境
  - 对象调用自己的方法,this 指向该对象
  - DOM 事件监听程序,this 指向 DOM 节点对象
  - setInterval/seTimeout,this 指向 window
  - 箭头函数中没有 this; this 指向父级
  - 原型链中 this,指向 new 出的实例

**apply/call/bind 修改 this 指向**

- apply(thisObj, arrayLike/array)
- call(thisObj, arg1,arg2...)
- bind(thisObj,arg1,arg2...),bind 会创造一个新函数,传递的参数会变成新函数的参数；

### 原型

实例有个非标准属性**proto**属性，本质也是实例中[[Prototype]]内部属性的指向； 同时也是构造函数的 prototype 属性的指向。

> 详情请看 JS 原型链示意图：实例是由构造函数 new 出的,实例的**proto**属性指向它的原型;实例的 constructor 指向它的构造函数；构造函数的 prototype 指向它的原型；原型的 constructor 属性又指回构造函数

### new 操作符：实例化过程

- 创建一个空对象 `var obj = {}`
- 对象的**proto**属性链接它的原型 `obj.__proto__ == con.prototype`
- 绑定 this,this 指向当前对象，执行构造函数中的代码(追加属性和方法) `this.name = name;...`
- 有 return 返回 return 的值(本身不需要写 return)，反之,返回这个对象 `return obj`

### 继承

**ES5 继承**

- 原型链继承

```js
function SuperType() {}
function SubType() {}
// 继承 SuperType
SubType.prototype = new SuperType();
SubType.prototype.construcor = SubType;
```

> 优点：实现简单，节省内存空间，实例共享同一个原型
> 缺点：子类实例化不可向父类构造函数传递参数;子类原型属性（父类实例属性）存在引用类型，会被所有实例共享

- 盗用构造函数继承(又称: "对象伪装"或 "经典继承")

```js
function SuperType(name) {
  this.colors = ["red", "blue", "green"];
  this.name = name;
}
function SubType() {
  // 调用父类构造函数,并传递参数
  SuperType.call(this, "Coder");
  // 实例属性
  this.age = 17;
}
let instance1 = new SubType();
let instance2 = new SubType();

instance1.colors.push("black");

console.log(instance1.colors); // "red,blue,green,black"
console.log(instance2.colors); // "red,blue,green"
```

- 组合继承(又称"伪经典继承")
- 原型式继承
- 寄生式继承
- 继承组合式继承

**ES6 继承**

- extends

### JS 浅拷贝 深拷贝

**shallowClone**

- [...obj]
- Object.assign({},obj)
- slice()
- concat()

**deepClone**

- JSON.parse(JSON.stringfy()) `在响应接口数据进行拷贝，可以使用，但有坑，如果对数据源进行拷贝，不推荐使用，建议使用递归`
- deepClone(递归实现) `推荐在项目中使用，较安全; 没有解决循环引用问题`
- lodash.cloneDeep() `使用成本过大,最完美`
- $.extend() `推荐JQ项目中使用`
- 其他的 API: 如 MessageChannel、History API、Notification API、structuredClone(JS 原生 API,存在兼容性问题)

### 数组扁平化

- flat(array,depth)
- reduce + 递归
- toString().split(',').map(Number)
- regex

**示例**

```js
array.flat(Infinity);
```

```js

```

### 伪数组转真数组

**FakeArray: 具有 length 属性，可以通过下标访问内部元素; 不能使用数组原型上的方法**

- NodeList / HTMLCollection
- arguments

**FakeArray 转 RealArray**

- Array.from(fakeArray)
- [...fakeArray]
- Array.prototype.slice.call(fakeArray) / [].slice.call(fakeArray)

### 数组去重

- [...new Set(array)]
- 循环 + indexOf/includes: 声明一个新数组，最终去重后的数组返回

### 打乱数组

- array.sort(() => Math.random() - 0.5)
- 循环随机位交换法
- 洗牌算法

```js
// sort
function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}
```

```js
// ES 6 引入了Fisher-Yates shuttle洗牌算法: 该算法遍历数组，每次将当前元素与随机位置的元素进行交换位置，避免重复，并且平均分布
function shuffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
}
```

### 数组排序

- sort
- 冒泡
- 快排

### 闭包 closure

**Introdution**

- 红宝书: 能访问其他函数中变量的函数
- MDN: 能够访问自由变量的函数(`自由变量: 在函数中使用，既不是函数参数，也不是当前函数局部变量的变量`)

  - 从理论角度来讲: 所有函数都是闭包<br>
  - 从实践角度来讲：满足下面条件的函数才能称为闭包<br>
    - 即使创建它的父级上下文已经销毁，它依然存在(内部函数从父函数返回)
    - 在代码中使用了自由变量

**优缺点**

- `优点：延长变量的生命周期; 变量私有化，防止全局变量污染 `
- `缺点: 变量常驻内存,使用不当,容易造成内存泄漏`

**应用场景**

- 函数柯里化
- 防抖节流
- 匿名函数自执行
- 模拟私有变量和方法

```js
function add(x ){
  return y = > x + y
}
```

### 高阶函数 HOF

- 函数作为参数，或者函数作为返回值的函数
  - callback、Array 原型上的方法: forEach/map/filter...
  - closure

### 函数柯里化

- curry：将一个多参函数拆分成多个小函数，逐步传参
  func(a,b,c) => curry(a)(b)(c) // curry(a,b)(c)

### 防抖 / 节流

> 本质：都是限制回调函数执行的频率

**throttle 应用场景**

- scroll(滚动加载)/比如滚动间隔，发送埋点请求
- 浏览器播放事件，每隔 1 妙后计算下进度信息等
- input 实时搜索展示搜索结果列表(也可用防抖)

**debounce 应用场景**

- resize
- 验证码 / 登录按钮, 防止连续触发
- 富文本编辑实时保存，无任何更改后一秒后保存


### 作用域scope




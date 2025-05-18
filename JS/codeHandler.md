#### JS 常见手写面试题‘

### 1、手动实现Array.prototype上面的map/filter/reduce...

```js

// myMap
Array.prototype.myMap = function (callback) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callback(this[i], i, this));
  }
  return output;
};

// myFilter
Array.prototype.myFilter = function (callback) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) {
      output.push(this[i]);
    }
  }
  return output;
};
// myReduce
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    if ((i = 0 || accumulator === undefined)) {
      accumulator = this[i];
    } else {
      accumulator = callback(accumlater, this[i], this);
    }
  }
  return accumlater;
};

```

### 2、手动实现myCall、myApply、myBind函数

```js






```


### 3、手写防抖节流函数(基础版和高级版) 

```js




```



### 4、手动实现Promise.all/Promise.race/Promise.any/Promise.myAllSettled

```js




```


### 4、手动实现一个符合PromiseA+ 规范的myPromise

```js


```


### 5、三大经典排序： 冒泡、插入、快排

```js



```


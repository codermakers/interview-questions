#### JS 常见手写面试题‘

### 1、手动实现 Array.prototype 上面的 map/filter/reduce...

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

### 2、手动实现 myCall、myApply、myBind 函数

```js

```

### 3、手写防抖节流函数(基础版和高级版)

```js

```

### 4、手动实现 Promise.all/Promise.race/Promise.any/Promise.myAllSettled

```js
// Promise.all
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Argument must be an array"));
      return;
    }
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(promises.length);
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch((err) => reject(err));
    });
  });
}

// Promise.race
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Argument must be an array"));
      return;
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}
```

### 4、手动实现一个符合 PromiseA+ 规范的 myPromise

```js

```

### 5、三大经典排序： 冒泡、插入、快排
- 冒泡排序(bubble sort)
  - 本质： 通过相邻元素比较大小，将最大值冒泡到数组末尾
```js
function bubbleSort

```

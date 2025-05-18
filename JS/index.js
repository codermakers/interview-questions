// Array.prototype.myMap = function (callback) {
//   let output = [];
//   for (let i = 0; i < this.length; i++) {
//     output.push(callback(this[i], i, this));
//   }
//   return output;
// };

// Array.prototype.myFilter = function (callback) {
//   let output = [];
//   for (let i = 0; i < this.length; i++) {
//     if (callback(this[i], i, this) === true) {
//       output.push(this[i]);
//     }
//   }
//   return output;
// };

// Array.prototype.myReduce = function (callback, initialValue) {
//   let accumulator = initialValue;
//   for (let i = 0; i < this.length; i++) {
//     if ((i = 0 || accumulator === undefined)) {
//       accumulator = this[i];
//     } else {
//       accumulator = callback(accumlater, this[i], this);
//     }
//   }
//   return accumlater;
// };

// let arr = [1, 1, 2, 3, 2, 3, 4, 5];
// function uniqueArr(arr){
//   return [...new Set(arr)]
// }

// filter + indexof
// function uniqueArr(arr){
//   return arr.filter((item, index) => arr.indexOf(item) === index)
// }

// reduce

// function uniqueArr(arr){
//   return arr.reduce((acc,cur) =>{
//     return acc.includes(cur) ? acc: [...acc, cur]
//   },[])
// }

// 对象键值唯一
// function uniqueArr(arr) {
//   let obj = {}
//   let result = []
//   for (const item of arr) {
//     const key = typeof item + JSON.stringify(item)
//     if(!obj[key]){
//       obj[key] = true
//       result.push(item)
//     }
//   }
//   return result
// }

// function uniqueArr(arr){
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1);
//         j--;
//       }
//     }
//   }
//   return arr
// }
// console.log(uniqueArr(arr))

// let arr = [
//   [1, 2],
//   [3, 4],
//   [5, [6, 7]],
// ];

// function flatten(arr){
//   return arr.flat(Infinity)
// }

// function flatten(arr){
//   return arr.reduce((acc,cur) =>{
//     return acc.concat(Array.isArray(cur)? flatten(cur) : cur)
//   },[])
// }

// function flatten(arr) {
//   let stack = [...arr]
//   let result = []

//   while(stack.length){
//     const next = stack.pop()
//     if(Array.isArray(next)){
//       stack.push(...next)
//     }else{
//       result.unshift(next)
//     }
//   }
// }


// function flatten(arr){
//   return arr.toString().split(',').map(Number)
// }

// function flatten(arr){
//   return JSON.stringify(arr) .replace(/\[|\]/g, '')
//   .split(',')
//   .map(Number)
// }

// function* flatten(arr) {
//   for (const item of arr) {
//     if (Array.isArray(item)) {
//       yield* flatten(item);
//     } else {
//       yield item;
//     }
//   }
// }
// console.log([...flatten(arr)]);

let arr = [1,2,3,4,5,6]

function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5)
}

// 测试 Fisher-Yates 算法的均匀性
const count = Array(5).fill(0).map(() => Array(5).fill(0));
for (let i = 0; i < 100000; i++) {
  const arr = [0, 1, 2, 3, 4];
  const shuffled = shuffle(arr);
  shuffled.forEach((num, pos) => count[num][pos]++);
}
console.log("位置分布统计:", count);
console.log(shuffle(arr))

function F () {
  this.a = 3;
  return {
    a: 4
  }
 }
  
 const f = new F();
 console.log(f.a);
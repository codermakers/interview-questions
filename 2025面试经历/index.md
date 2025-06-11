#### 2025 前端面试

- 2025.5.15

  - 美团外包一面(人瑞科技)
  - 面试题

    - Vue 常见的生命周期？
    - Vue 的组件通信方式？
    - Vue3 的新特性？
    - Vue 双向绑定原理？
    - v-if 与 V-show 区别？
    - 路由传参方式

    - CSS 权重？
    - 浏览器输入 URL 发生什么？
    - Promise.all 和 Promise.race
    - 常见的 Http 状态码？
    - webapck 的打包原理？

- 2025.5.13  √ (通过)

  - 综合邮政(外包)
  - 面试题
    - 着重项目经验

- 2025.5.26
  - 高伟达（项目外包）
  - 面试题(一面)
  - 简单做下自我介绍？
  - 简单介绍下自己最近做的一个项目？ 自己做了哪些优化？
  - 着重讲下项目的手段及场景？
  - 项目从需求出来到投产，团队协作过程是怎样的？
  - 遇到排期与预期不一致或者差距过大怎么处理？
  - 你还有什么需要问我的吗？
    2025.5.30(二面)
  - 面试题

- 2025.6.5 (京北方外包- 工银科技)
  - 面试题
    - 浏览器输入 URL 发生什么？
    - forEach 和 map 有啥区别？
    - call、apply、bind 有啥区别？
    - 如何理解浏览器的内存泄漏？
    - Vue2 中常见的修饰符？
    - v-model的实现原理是啥？
    - Vuex刷新后数据会丢失吗？如何解决？
    - Vue3 中组件通信？
    - Vue3 中 Setup 是什么？ 怎么理解？
    - axios 常见的封装有哪些？
    - 单点登录做过吗？ 如何实现？
    - 有没有从 0 到 1 完整搭建过项目？
    
- 2025.6.5 (中科软 - 人力外包-中信保诚人寿)
  - 面试题
    - Vue常见生命周期？
    - Vue组件通信？
    - 如何实现一个长按指令？
    - 项目中如何使用Vuex？
    
- 2025.6.5 (中金电信 - 丽泽商务) √ (通过)
  - 面试题
    - Vue2与Vue3有哪些区别？
    - 常见的跨域方式有哪些？
    - 有没有封装过组件？
    - 组件通信方式有哪些？
    - 项目中做过哪些性能优化？
    - 移动端适配方案有过哪些？
    - 有没有写过原生HTML、CSS、JS这种项目？
    - 在银行工作经历有几年？
   
- 2025.6.9 (中科软 - 人寿大厦)
   - 面试题
     - PC 端大屏项目如何适配？具体原理是什么？
     - Vue、Anglar、React 与JQuery 有什么区别？
     - Vue2与Vue3有什么区别？
     - git merge 与git reabse有什么区别？
     - 如果在当前分支开发，此时来了一个紧急需求，需要保留当前分支开发的内容如何做？

- 2025.6.9 易车互联(自研) √ (通过)
   - 面试题
     - CSS中的两种盒模型？
     - CSS中单行文本居中与多行文本左对齐实现方式？
     - CSS中fixed定位参照物是谁？
     - CSS中padding-top的百分比如何计算的
     - CSS中一个图片内联样式是<img style="width: 400px!important">,如何在不改变内联样式情况下如何使得盒子200px；
     - localstorage 与cookie在父子域名中数据是否可共享？
     - script中defer与async中区别是什么？
     - JS中模块化esm 与common.js 区别是什么？
     - JS中为什么会存在变量提升？
     - Vue中父子组件生命周期钩子执行顺序？
     - Vue中组件通信方式？
     - Vue中mixin选项混入规则是什么？
     - Vue-router中hash模式原理是什么？
     
  
- 2025.6.10 慧博(杭州半年短期本部) -> √ (通过)
  - 面试题
    - 考虑到杭州出差？
    - Vue组件通信方式有哪些？
    - Vue2与Vue3区别？
    - 响应式原理是什么？
    - 说一下对事件循环的理解？
    - 实例、原型对象、构造函数的关系？
    - webpack打包与Vite打包区别是什么？
    - 编程题考察事件循环、原型链
```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise((resolve) => {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

```


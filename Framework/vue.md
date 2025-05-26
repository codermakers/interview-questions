## Vue2/3 高频面试题

### Vue2 相关面试题

#### 1、`v-if` vs `v-show`

- v-if 是惰性渲染，只有表达式为真，才真正渲染 DOM，`初始渲染开销低`；切换`会触发生命周期钩子函数`。`切换开销高`
- v-show 始终渲染，`初始渲染开销高`，仅仅是修改 DOM 的 display 属性，DOM 始终存在，`不会触发生命周期钩子函数`；`切换开销低`

#### 2、`computed` vs `watch`

- computed 有`缓存`特性，只有依赖的响应式数据发生变化，才会重新计算；不支持异步操作；必须要有返回值；适用于`一对多`场景.
- watch 用于监听响应式数据执行副作用，支持`异步`操作，`无缓存`特性，数据变化每次都会执行，侧重于数据变化之后做什么

```js
watch: {
  searchQuery(newVal) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.fetchResults(newVal);
    }, 300);
  }
}
```

#### 3、组件`LifeCycle Hooks` 及父子组件`LifeCycle Hoos`执行顺序

- 生命周期钩子（常见的）
  - 创建阶段：beforeCreate → created
  - 挂载阶段：beforeMount → mounted
  - 更新阶段：beforeUpdate → updated
  - 销毁阶段: beforeDestroy → destroyed
  - 缓存组件: activated(缓存组件激活)、deactivated(缓存组件失活)
- 使用场景
  - created 常用于数据初始化、API 请求发送
  - mounted 常用于 API 请求发送、DOM 操作，集中第三方库
  - beforeDestroy、destroyed 常用于资源清理(清除定时器、解绑事件监听)、断开外部链接（闭 WebSocket 连接或取消未完成的 API 请求）
- 父子组件加载生命周期钩子执行顺序
  - 加载阶段(父子组件首次渲染)
    - 父 beforeCreate → 父 created → 父 beforeMount → 子 beforeCreate → 子 created → 子 beforeMount → 子 mounted → 父 mounted
  - 更新阶段（父组件数据变化影响子组件）
    - 父 beforeUpdate → 子 beforeUpdate → 子 updated → 父 updated
  - 销毁阶段 (父组件销毁)
    - 父 beforeDestroy → 子 beforeDestroy → 子 destroyed → 父 destroyed

#### 4、Vue2 中组件通信方式？

- 父子组件通信
  - props/$emit、$ref、v-model、`$parent`(不推荐)、`$children`(不推荐)
- 兄弟组件通信
  - EventBus(事件总线)、Vuex/pinia
- 跨层级组件通信
  - EventBus(事件总线)、Vuex/pinia、provide/inject、`$attrs/$listeners(透传属和事件)`
- 其他通信方式： 本地存储、window 存储共享数据

#### 5、组件中 data 属性为什么是一个函数而不是对象？

- 为了保证组件数据的私有化

#### 6、v-for 中的 Key 的作用？

- 帮助 Vue 方便高效追踪节点身份,优化虚拟 DOM 更新
- 避免 Vue 复用同类型元素导致的渲染出错相关问题
- 常见问题：key 属性为什么不建议是 index(索引) 而是唯一值？
  - 数据变化时，index 无法稳定识别元素。性能下降，状态错乱等
  - 示例 当一个列表有`删除`和`排序`操作，元素 index 会动态变化，Vue 会错误的复用元素导致渲染出错；
  ```js
  <template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <input type="text" :value="item.text">
      <button @click="remove(index)">删除</button>
    </div>
  </div>
  ```
  - 删除中间项：删除第二个项（index=1）后，后续项的 index 会前移（原 index=2 变为 index=1），Vue 会认为 key=1 的元素是原来的第二项（实际已被删除）导致：
    - 输入框内容错位：原第三项（index=2）的输入框复用为 index=1，但数据未同步。
    - 状态混乱：如子组件内部状态（如输入值）被错误保留。

#### 7、v-if 与 v-for 作用于同一个元素的优先级（不建议一起用）

- Vue2 中 v-for > v-if，由于 v-for 不管子项条件真假,都会先遍历所有，会导致性能浪费
- Vue3 中 V-if > v-for，会导致逻辑出错；控制台直接报错
- 最佳实践
  - 避免 v-for，v-if 同时作用在同一元素
  - 使用计算属性或者将 v-if 移到父元素上等方法避免这种问题

#### 8、`$nextTick`

- 概念：下次 DOM 更新循环结束之后执行延迟回调，方便安全的获取更新后的 DOM
- 本质:它利用了 JavaScript 的 微任务队列（Microtask Queue）（如 Promise.then、MutationObserver）或降级为 宏任务（Macrotask）（如 setTimeout）来实现这一目标
- 使用场景

  - 响应式数据发生变化后，需要立即操作更新后的 DOM

  ```js
  this.message = "更新后的内容"; // 修改数据
  this.$nextTick(() => {
    const element = document.getElementById("text");
    console.log(element.textContent); // 输出：'更新后的内容'
  });
  ```

  - 初始化依赖 DOM 的第三方库(如 Echarts)

  ```js
   mounted() {
     this.$nextTick(() => {
       this.initChart(); // 确保 DOM 已渲染
     });
   }
  ```

#### 9、谈一下 Vue 中的`双向数据绑定`？

- 核心: 数据劫持 + 发布订阅

#### 10、vue-router 两种模式`hash`与`history`的区别？

- URL 美观度：
  - hash 模式带有`#`,history 模式比较美观
- 原理
  - hash 模式是通过`hashchange`监听 Hash 变化
  - history 模式是通过`popstate`事件监听路径变化
- 服务端支持

  - hash 模式是无需服务器配置
  - history 模式需要服务器配置

  ```md
  <!-- 需要Nginx配置：否则刷新页面404 -->

  location / {
  try_files $uri $uri/ /index.html;
  }
  ```

- SEO 友好性
  - hash 模式对 SEO 支持度较差，不利于 SEO 抓取
  - history 模式较好,URL 更规范，利于 SEO 抓取

#### 11、vue-router 中`$route`和`$router`的区别？

- `$route`当前只读路由信息对象，包含当前路由详细信息(name,path,params,query 参数)等
- `$router`路由实例,可控制路由的行为(跳转,返回)

#### 12、vue-router 中路由跳转方式有哪些

- 声明式导航：通过<router-link>跳转
- 编程式导航：通过 router 实例上的方法实现跳转

#### 13、vue-router 路由传参方式有哪些？

- 动态路由参数(Params)
- 查询参数(Query)
- 路由组件传参(Props)
- 路由元信息(Meta)

#### 14、vue-router 的路由守卫钩子有哪些？

- 全局守卫
  - beforeEach
  - beforeResolve
  - afterEach
- 路由独享守卫
  - beforeEnter
- 组件内的守卫
  - beforeRouteEnter
  - beforeRouteUpdate
  - beforeRouteLeave
- 守卫钩子的执行顺序？

#### 15、谈一下 Vuex 的理解？

- Vuex 是 Vue 的一个状态管理库
- 核心属性
  - state: 状态
  - getters: 基于状态派生出的计算属性
  - mutations: 用于修改 state,必须是同步函数
  - actions: 用于提交 mutations 间接修改 state, 允许异步操作
  - modules: 模块用于将 Vuex 分割成多个模块,每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。
  - plugins: 用于扩展 Vuex 的功能, 比如 Vuex 的第三方插件如 vuex-persistedstate 可在此配置

#### 16、Vuex 中数据如何保持持久化?

- 本地存储(localStorage/sessionStorage)
- Vuex 的第三方插件如 vuex-persistedstate、vuex-persist 等

### Vue3 相关面试题

#### 1、Vue3 与 Vue2 相比,带来了哪些变化？

#### 2、Vue3 中有哪些新特性？

#### 3、`ref` 与 `reactive` 有什么区别？

#### 4、`watch` 与 `watchEffect`有什么区别？

#### 5、

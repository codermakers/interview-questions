## Webpack 高频面试题

### 1、 Webpack 的核心概念？（入口 / 出口 /loader/plugin/ 模式）

- Entry（入口）：指定 Webpack 构建的起始文件（如src/main.js），Webpack 从入口开始递归解析所有依赖；
- Output（出口）：配置构建后产物的输出路径和文件名（如dist/main.js）；
- Loader：处理非 JS 文件（如 CSS / 图片 / Vue 组件），将其转为 Webpack 可识别的模块（如css-loader解析 CSS，vue-loader解析.vue 文件）；
- Plugin（插件）：扩展 Webpack 功能，处理编译打包全流程（如HtmlWebpackPlugin生成 HTML，MiniCssExtractPlugin提取 CSS）；
- Mode（模式）：预设环境配置，分development（开发，不压缩、保留 sourcemap）、production（生产，压缩代码、优化构建）、none（无默认配置）

> PS: Webpack 中一切皆模块

### 2. Webpack 中 Loader 和 Plugin 的区别？

- 作用对象：
  - loader用于转换单个文件(或模块)，转换文件内容
  - Plugin作用于构建全流程，扩展webpack功能
- 执行时机：
  - loader是在模块解析阶段（module）
  - plugin是编译输出阶段
- 使用方式：
  - loader是在module.rules中配置，指定 test 匹配文件，use 指定 loader,常见loader如css-loader、file-loader等
  - Plugin在plugins数组中实例化使用，常见的plugin如HtmlWebpackPlugin、CleanWebpackPlugin

> PS: loader是转换器，只能同步或者异步处理文件,Plugin是扩展器可监听 Webpack 生命周期钩子实现复杂逻辑。

### 3. Webpack 的构建流程？

- 初始化:
  - 解析配置文件 / 命令行参数，创建Compiler实例，初始化内置插件
- 编译：
  从 Entry 开始，调用对应 Loader 解析文件，生成 AST 抽象语法树；
  递归解析 AST 中的依赖，构建所有模块的依赖图谱；
- 输出：
  - 将依赖图中的模块按照chunk分组；
  - 遍历所有chunk，调用plugin处理优化(如压缩、分割)
  - 将最终产物输出到output指定路径

> PS: Webpack 的生命周期钩子（如compiler.hooks.entryOption、compilation.hooks.buildModule），插件通过监听钩子实现功能。

### 4. Webpack 如何优化构建速度 / 打包体积？

- ① 优化构建速度(dev环境)
  - 缩小构建范围：exclude/include排除 / 只包含指定文件（如babel-loader排除node_modules）
  - 缓存构建结果：cache: true开启缓存，babel-loader?cacheDirectory缓存 babel 编译结果；
  - 多进程构建：thread-loader/happyPack（Webpack4），Webpack5 内置thread-loader优化
  - 模块热替换(HMR): devServer.hot: true，修改代码不刷新整个页面
  - DLL预构建：抽离第三方依赖（如 Vue/React），避免重复编译。
- ② 优化打包体积(prod环境)
  - 代码分割 (splitChunks): 抽离公共代码和第三方依赖，按需加载代码

  ```js
  optimization: {
    splitChunks: {
      chunks: 'all', // 分割同步/异步代码
      cacheGroups: {
        vendor: { test: /node_modules/, name: 'vendor', chunks: 'all' } // 抽离第三方依赖
      }
    }
  }
  /**
   * 配置项说明：
   *chunks: 'all'	分割同步 + 异步代码（initial仅分割同步，async仅分割异步）
   *cacheGroups	缓存组：按规则分组分割代码，vendor抽离第三方依赖，common抽离公共业务代码
   * priority	优先级：vendor优先级更高（-10 > -20），先分割第三方依赖
   * contenthash	哈希值基于文件内容生成，文件内容不变则哈希不变，利于浏览器缓存
   *runtimeChunk	分离运行时代码（webpack 加载模块的逻辑），避免第三方依赖不变但哈希变
  */
  ```

  > PS: 第三方依赖如(vue/ElementUI)等打包到；vendors.xxx.js，业务代码变动不影响该文件缓存;公共业务代码（如工具函数）打包到common.xxx.js，减少重复代码;每个页面的按需加载代码打包为独立chunk.js，实现 “按需加载”。
  - Tree Shaking：
    - 原理：webpack通过静态分析，识别并删除未被引用的死代码(如未调用的函数，未使用的变量)
    - 开启：仅需开启mode: production，Webpack 自动开启 Tree Shaking
    - 必要条件：
      - 代码使用ES6 模块化（import/export），禁用 CommonJS（require）；
      - package.json中配置sideEffects（标记无副作用文件）

      ```json
      {
        "sideEffects": [
          "*.css", // CSS文件有副作用（不能删除）
          "*.scss"
        ]
      }
      ```

  - 资源与代码压缩：
    - 压缩JS: Webpack5 内置TerserPlugin压缩 JS;
    - 压缩CSS: 使用css-minimizer-webpack-plugin替代optimize-css-assets-webpack-plugin（Webpack5 推荐).需配合MiniCssExtractPlugin使用（先提取 CSS，再压缩）。
    - 压缩图片：使用image-minimizer-webpack-plugin（Webpack5 推荐），替代旧的image-webpack-loader；
      内置imagemin生态，支持 gif/jpg/png/svg 全格式压缩，可自定义压缩级别。
    - Gzip压缩:(两种方式)
      - 本地预压缩：通过 compression-webpack-plugin 插件, 提前将JS/CSS/HTML等文件压缩,生成对应的.gz文件（比如 app.js → app.js.gz），和源文件一起部署服务器；Nginx 开启 gzip_static on 读取该包，既利用 Gzip 压缩的优势，又避免 Nginx 实时压缩的性能损耗；
      - Nginx 实时压缩：读取服务器上未压缩的原文件（如 app.js），实时压缩成 Gzip 格式后返回给浏览器；

      ```HTTP

       // webpack.prod.config.js：webpack 预压缩文件
        const CompressionPlugin = require('compression-webpack-plugin');

        module.exports = {
          plugins: [
            new CompressionPlugin({
              algorithm: 'gzip', // 指定Gzip算法
              test: /\.(js|css|html|svg)$/, // 仅压缩文本文件
              threshold: 8192, // 仅压缩大于8kb的文件（小文件压缩收益低）
              minRatio: 0.8, // 压缩率<0.8才保留（压缩后体积/原体积）
              filename: '[path][base].gz' // 生成xxx.js.gz、xxx.css.gz
            })
          ]
        };

       // nginx配置文件： Nginx 配置（读取预压缩包，避免实时压缩）
       server {
        listen 80;
        server_name your-domain.com;

        # 核心：开启Gzip静态读取（优先用Webpack预生成的.gz包）
        gzip on;
        gzip_static on; # 关键配置：有.gz包则返回，无则实时压缩
        gzip_comp_level 6; # 压缩级别（1-9，6是平衡值）
        gzip_types text/plain text/css application/json application/javascript; # 压缩文件类型

        # 静态资源目录（存放Webpack打包后的文件+gz包）
        location / {
          root /usr/share/nginx/html;
          index index.html;
        }
      }

      ```

    - 按需加载（路由 / 组件）

    ```js
    // Vue路由懒加载示例（配合SplitChunks自动分割）
    const Home = () => import(/_ webpackChunkName: "home" _/ './views/Home.vue');
    const About = () => import(/_ webpackChunkName: "about" _/ './views/About.vue');

    const routes = [
      { path: '/', name: 'Home', component: Home },
      { path: '/about', name: 'About', component: About }
    ];
    // 此时访问/about时才加载about.chunk.js，首屏加载体积减少。
    ```

1. Webpack5 对比 Webpack4 有哪些核心升级？

   > 核心答案：
   > 表格
   > 升级点 Webpack4 Webpack5
   > 构建性能 需手动配置缓存 / 多进程 内置持久化缓存、默认多进程构建
   > 模块联邦 无 新增 Module Federation（跨应用共享模块）
   > Tree Shaking 基础支持 更精准（支持嵌套模块、CommonJS）
   > 输出优化 需手动配置 Terser 内置代码压缩、CSS 提取
   > 兼容性 需 polyfill 内置 Node.js 模块 polyfill，可按需关闭
   > 构建产物 无 Asset Modules 内置 Asset Modules（替代 file-loader/url-loader）
   > 加分点：Module Federation 是 Webpack5 核心亮点，可实现微前端跨应用组件共享（如 EMP 框架）。7. 如何实现 Webpack 的代码分割（Code Splitting）？
   > 核心答案：
   > （1）自动分割公共代码（SplitChunks）
   > javascript
   > 运行
   > // webpack.config.js
   > module.exports = {
   > optimization: {
   > splitChunks: {
   > chunks: 'all', // 分割所有类型的chunk
   > minSize: 20000, // 最小分割体积
   > cacheGroups: {
   > // 抽离第三方依赖
   > vendor: {
   > test: /[\\/]node_modules[\\/]/,
   > name: 'vendors',
   > priority: -10 // 优先级更高
   > },
   > // 抽离公共业务代码
   > common: {
   > name: 'common',
   > minChunks: 2, // 被引用至少2次
   > priority: -20,
   > reuseExistingChunk: true // 复用已存在的chunk
   > }
   > }
   > }
   > }
   > };
   > （2）动态导入（按需加载）
   > javascript
   > 运行
   > // 路由懒加载（Vue/React通用）
   > const Home = () => import(/\* webpackChunkName: "home" \_/ './Home.vue');
   > （3）手动分割（Entry 多入口）
   > javascript
   > 运行
   > module.exports = {
   > entry: {
   > app: './src/main.js',
   > admin: './src/admin.js'
   > },
   > output: {
   > filename: '[name].[chunkhash].js'
   > }
   > }; 8. Webpack 中处理 CSS 的常用 loader 和 plugin？
   > 核心答案：
   > 表格
   > 工具 作用 适用场景
   > css-loader 解析 CSS 中的@import和url() 所有 CSS 文件
   > style-loader 将 CSS 注入到 HTML 的<style>标签 开发环境
   > MiniCssExtractPlugin 将 CSS 提取为独立文件（替代 extract-text-webpack-plugin） 生产环境
   > postcss-loader 自动添加 CSS 前缀（autoprefixer） 兼容多浏览器
   > sass-loader/less-loader 编译 SCSS/LESS 为 CSS 使用预处理器
   > css-minimizer-webpack-plugin 压缩 CSS 文件 生产环境
   > 核心配置示例：
   > javascript
   > 运行
   > module: {
   > rules: [
   > {
   > test: /\.scss$/,
   > use: [
   >
   > > process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
   > > 'css-loader',
   > > 'postcss-loader',
   > > 'sass-loader'
   > > ]
   > > }
   > > ]
   > > },
   > > plugins: [
   > > new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })
   > > ]

2. Webpack 的热更新（HMR）原理？
   核心答案：
   启动阶段：DevServer 创建 WebSocket 连接，与浏览器建立通信；
   修改代码：文件变动触发 Webpack 重新编译，生成更新后的模块；
   推送更新：DevServer 通过 WebSocket 将更新信息（模块 ID、哈希）推送给浏览器；
   应用更新：浏览器接收更新，通过 HMR runtime 替换旧模块，执行模块的module.hot.accept回调，实现无刷新更新。
   加分点：Vue/React 需配合专属插件（vue-loader、react-refresh-webpack-plugin）实现组件级热更新。
3. Webpack 如何处理图片等静态资源？
   核心答案：
   （1）Webpack4 及以下（使用 loader）
   javascript
   运行
   module: {
   rules: [
   {
   test: /\.(png|jpg|jpeg|gif|svg)$/,
use: [
{
loader: 'url-loader',
options: {
limit: 8192, // 小于8kb转为base64，大于8kb用file-loader输出文件
name: 'images/[name].[hash:8].[ext]'
}
},
// 压缩图片
{ loader: 'image-webpack-loader' }
]
}
]
}
（2）Webpack5（内置 Asset Modules）
javascript
运行
module: {
rules: [
{
test: /\.(png|jpg|jpeg)$/,
   type: 'asset', // 自动判断：小于8kb转base64，否则输出文件
   parser: { dataUrlCondition: { maxSize: 8 \* 1024 } },
   generator: { filename: 'images/[name].[hash:8].[ext]' }
   }
   ]
   }
   二、Vite 核心考点（11-16 题）11. Vite 的核心原理？为什么比 Webpack 快？
   核心答案：
   Vite 核心原理：基于 ES Module（浏览器原生支持），采用 “按需编译”+“预构建” 策略：
   开发环境：不打包，直接启动开发服务器，浏览器请求模块时实时编译（只编译当前请求的模块）；
   生产环境：基于 Rollup 打包（比 Webpack 更轻量，Tree Shaking 更优）；
   预构建：启动时预构建第三方依赖（如 node_modules），将 CommonJS/UMD 转为 ES Module，避免浏览器重复请求。
   比 Webpack 快的核心原因：
   ✅ Webpack 开发环境需打包所有模块（即使只改一行代码），Vite 按需编译，启动速度从秒级→毫秒级；
   ✅ Webpack 使用自定义模块系统，Vite 复用浏览器原生 ES Module，无需解析模块依赖；
   ✅ Vite 预构建只处理第三方依赖，且缓存构建结果，后续启动更快。
   加分点：补充 Vite 的esbuild（Go 语言编写），预构建速度比 Webpack 的 babel 快 10-100 倍。12. Vite 的热更新（HMR）原理？
   核心答案：Vite 的 HMR 基于原生 ES Module，比 Webpack 更高效：
   模块修改后，Vite 只重新编译该模块，生成新的模块哈希；
   通过 WebSocket 通知浏览器更新对应的模块；
   浏览器直接替换该模块的引用，无需刷新页面，也无需重新编译依赖。
   加分点：Vite 的 HMR 是精确更新（只更改进变的模块），Webpack 的 HMR 需遍历依赖树，效率更低。13. Vite 和 Webpack 的核心区别？
   核心答案：
   表格
   维度 Vite Webpack
   核心原理 原生 ES Module + 按需编译 + Rollup 打包 自定义模块系统 + 全量打包
   开发环境 不打包，实时编译 打包所有模块，热更新需重新打包
   构建工具 开发：esbuild；生产：Rollup 全程基于 Webpack（JS 编写）
   启动速度 毫秒级（100ms 左右） 秒级（3-10s）
   热更新速度 即时更新（只编译变更模块） 慢（需重新打包依赖）
   生态 较新，适配 Vue/React 主流框架 成熟，插件生态丰富
   适用场景 中小型项目、Vue/React 前端项目 大型复杂项目、多入口 / 多页面项目 14. Vite 的配置文件核心选项？
   核心答案：
   javascript
   运行
   // vite.config.js
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import path from 'path'

export default defineConfig({
// 插件
plugins: [vue()],
// 开发服务器
server: {
port: 3000, // 端口
open: true, // 自动打开浏览器
proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } } // 跨域代理
},
// 路径别名
resolve: {
alias: { '@': path.resolve(\_\_dirname, 'src') }
},
// 构建配置
build: {
outDir: 'dist', // 输出目录
assetsDir: 'assets', // 静态资源目录
minify: 'esbuild', // 压缩工具（esbuild/terser）
rollupOptions: { // Rollup配置
output: {
// 代码分割
chunkFileNames: 'js/[name].[hash].js',
entryFileNames: 'js/[name].[hash].js',
assetFileNames: 'assets/[name].[hash].[ext]'
}
}
}
}) 15. Vite 如何处理 CommonJS 模块？
核心答案：Vite 基于 ES Module，默认不支持 CommonJS，处理方式：
预构建阶段：Vite 的esbuild会自动将node_modules中的 CommonJS/UMD 模块转为 ES Module；
手动转换：使用@vitejs/plugin-commonjs插件，处理业务代码中的 CommonJS 模块；
按需导入：避免直接require，改用import（或import.meta.glob动态导入）。16. Vite 的性能优化手段？
核心答案：
（1）开发环境优化
缓存预构建结果：Vite 默认缓存node_modules/.vite，删除缓存可执行vite --force；
优化依赖预构建：optimizeDeps.include指定预构建依赖，exclude排除无需预构建的依赖；
禁用文件监听：server.watch = null（适用于无文件变更的场景）。
（2）生产环境优化
代码分割：通过 Rollup 的output.manualChunks手动分割代码；
javascript
运行
build: {
rollupOptions: {
output: {
manualChunks: {
vendor: ['vue', 'axios'], // 抽离第三方依赖
common: ['src/utils'] // 抽离公共业务代码
}
}
}
}
压缩优化：build.minify: 'terser'（比 esbuild 压缩率更高，速度稍慢）；
静态资源优化：build.assetsInlineLimit调整 base64 转换阈值，vite-plugin-imagemin压缩图片；
按需加载：路由懒加载（import()）、组件懒加载。
三、Webpack vs Vite 综合考点（17-18 题）17. 项目中如何选择 Webpack 还是 Vite？
核心答案：
选 Vite：
✅ 中小型前端项目（Vue/React）；
✅ 追求开发体验（启动 / 热更新快）；
✅ 以 ES Module 为主，无复杂的旧代码（CommonJS）；
选 Webpack：
✅ 大型复杂项目（多入口、多页面、微前端）；
✅ 需兼容旧代码（CommonJS、AMD）；
✅ 依赖丰富的 Webpack 插件（如webpack-bundle-analyzer、Module Federation）；
✅ 需定制化构建流程（如复杂的代码分割、自定义插件）。
加分点：补充 “Vite+Webpack 混合使用” 场景 —— 开发用 Vite（快），生产用 Webpack（兼容 / 插件丰富）。18. Vite 为什么在生产环境用 Rollup 而不是 esbuild？
核心答案：
esbuild 的不足：
✅ 代码分割能力弱，不支持复杂的 chunk 拆分；
✅ Tree Shaking 不如 Rollup 精准；
✅ 生态插件少，适配性差；
Rollup 的优势：
✅ 专为 ES Module 设计，打包产物更精简；
✅ Tree Shaking 更成熟，压缩率更高；
✅ 插件生态丰富，支持复杂的构建需求；
Vite 的折中策略：开发环境用 esbuild（快），生产环境用 Rollup（优），兼顾速度和产物质量。
总结
Webpack 核心：掌握 “打包流程、Loader/Plugin、性能优化、代码分割”，重点是生产环境的打包优化；
Vite 核心：掌握 “原生 ES Module、按需编译、预构建、Rollup 打包”，重点是开发环境的效率提升；
对比核心：Vite 胜在开发体验，Webpack 胜在生态和兼容性，面试时结合项目场景说明选型思路即可

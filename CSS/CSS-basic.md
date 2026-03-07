## CSS 基础及中高级面试题

### 一、CSS 基础面试题

#### 1.1 如何在Chrome中控制CSS让元素的字体大小小于12px

- transform: scale()
- zoom: 非标准属性
- svg文本
- webkit-text-size-adjust(Chrome 27版本后不生效)

#### 1.2 px、em、rem、vw、vh区别?

- px绝对单位
- em相对单位，基于父元素字体大小，父元素没有，找祖先元素
- rem相对单位，基于HTMl根元素字体大小
- vw/vh相对单位，基于视口的宽高的百分比

#### 1.3 CSS 文字超出省略 单行、多行？

```css
/* 1. 单行文本省略: 定宽 + display为block 或者inline-block */
.single-ellipsis {
  width: 200px;
  white-space: nowrap; /* 强制不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
}

/* 2. 多行文本省略（webkit内核，移动端通用） */
.multi-ellipsis {
  width: 200px;
  display: -webkit-box; /* 转为弹性盒 */
  -webkit-line-clamp: 3; /* 限制显示3行 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  overflow: hidden; /* 隐藏溢出 */
}

/* 3. 多行省略：定高 + 伪元素（兼容所有浏览器，需固定高度） */
.multi-ellipsis-compat {
  width: 200px;
  height: 60px; /* 3行文字高度（行高20px） */
  line-height: 20px;
  overflow: hidden;
  position: relative;
}
.multi-ellipsis-compat::after {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
  background: #fff; /* 覆盖最后一个字 */
  padding-left: 5px;
}
```

#### 1.4 CSS 选择器中:nth-child () 和 :nth-of-type() 区别？

- nth-child(n)匹配的父元素的第n个元素
- nth-of-type(n)匹配的父元素的第n个同类型的元素，统计类型，例如div:nth-of-type(2) 匹配父元素下第 2 个 div（不管前面有多少其他类型元素）

#### 1.5 伪类和伪元素的区别、:和::区别？

- 伪类是选择器的一种，用于筛选特性状态或者位置的元素。并不创建新元素
- 伪元素表示创建不存在文档树中的一种虚拟元素，必须配合content属性使用
  > CSS2中伪元素:after也用单冒号，CSS3为了区分伪类和伪元素，规定伪元素用双冒号，伪类用单冒号

### 二、盒模型、浮动、定位相关问题

#### 2.1 盒模型及box-sizing作用 ？

- 概念：在网页中，所有元素被视为一个矩形盒子，有四部分组成，内容区(content)、内边距(padding)、边框(border)、外边距(margin)
  - 标准盒模型: width 和 height 是内容区的尺寸
  - IE盒模型: width 和 height 是包含了内边距和边框的尺寸
  - box-sizing: 是CSS3中用来决定浏览器采用何种模型来渲染元素的新增属性，默认值content-box。

#### 2.2 margin塌陷和合并，及解决办法？

- margin外边距合并：相邻两个同级block元素垂直方向，一个设置margin-bottom，一个设置margin-top,取较大值，而不是简单相加（若有负值则取代数和）
  - 解决办法
    - 其中一个用div包裹，触发BFC
    - 使用现代布局方案，gap代替margin
- margin塌陷：两个block嵌套元素，父元素没有设置padding、border,子元素设置margin-top，导致一起被顶下来。(子元素margin穿透到父元素)
  - 解决办法:
    - 父元素触发BFC即可，比如overflow不等于visible即可
    - 父元素设置padding或者border，代替子元素的margin

#### 2.3 如何清除浮动(半脱离文档流)及父元素高度塌陷问题？

- 清除浮动
  - 触发父元素的BFC,例如父元素overflow:hidden
  - 额外标签法：在浮动子元素后面追加一个空标签，设置样式clear:both
  - 经典万能双伪元素清除法
  ```css
  .clearfix::before,
  .clearfix::after {
    content: ''; /* 必须有content，伪元素才生效 */
    display: block; /* 转为块级元素，才能触发clear */
    clear: both; /* 清除左右两侧浮动 */
    height: 0; /* 可选：避免伪元素占用高度 */
    visibility: hidden; /* 可选：隐藏伪元素 */
  }
  /* 兼容IE6/7（可选，现代项目可省略） */
  .clearfix {
    *zoom: 1;
  }
  ```

#### 2.4 设置了position为absolute的元素,display属性是啥？

- block

#### 2.5 ixed什么时候会失效（不相对于视口定位）？

- 当父元素有 transform/perspective/filter 属性，fixed 会相对于该父元素定位，而非视口

#### 2.6sticky 原理 及失效场景

- 原理：粘性定位sticky开始时相对定位，超过阈值变为固定定位
- 失效场景：
  - 元素未设置 top、right、bottom 或 left 中的任意一个值
  - 父元素 overflow≠visible、
  - 父元素高度不足、
  - 定位冲突（fixed/absolute）

#### 2.7 什么是层叠上下文（stacking context）、层叠顺序or等级(stacking order)及触发方式

- 概念：层叠上下文是 CSS 中用于决定元素在 Z 轴上显示顺序的三维渲染环境，拥有独立的层叠规则。每个网页默认有一个天然的上下文(root元素自动创建)，其他层叠上下文由CSS特定属性触发。
- 触发条件（高频）：
  - root元素（<html>）自动创建根层叠上下文；
  - 定位元素(非static)且z-index ≠ auto；
  - Flex/grid的子元素且z-index ≠ auto
  - opacity < 1
  - 以下属性不为none的元素
    - transform
    - filter
    - backdrop-filter
    - perspective
    - clip-path
    - mask / mask-image / mask-border
  - mix-blend-mode 属性值不为 normal 的元素
  - will-change指定了某些可变属性
  - contain: layout、paint 或 strict、content等

  > [核心规则]：层叠上下文内部的元素，`无法突破该上下文的层叠层级`（比如子元素 z-index 再高，也无法覆盖父上下文外更高层级的元素）。

- 同一个层叠上下文的元素堆叠顺序(等级)
  - 背景与边框(形成当前层叠上下文的背景与边框)
  - 负的z-index的元素
  - 标准文档流中的块级元素
  - 浮动的元素
  - 行内元素(inline/inline-block)
  - z-index为0的定位元素
  - z-index为正值的定位元素
- 本质：层叠上下文是用来解决当多个元素子在视觉上发生重叠，谁覆盖谁的问题，这不是由z-index决定，这是由层叠上下文及其内部层叠顺序共同决定

### 三、BFC、包含块、百分比参照问题

#### 3.1 BFC及触发条件？

- BFC: 块级格式化上下文，即CSS用于控制块级元素布局的一块独立渲染区域，与外部隔离，它决定了元素如何在页面中排列、与其他元素交互，以及如何处理浮动、外边距等布局行为。类似的还有IFC、GFC、FFC
- 触发条件
  - Root元素 <html>。
  - float 值不为 none
  - position 值为 absolute 或 fixed，
  - overflow不为visible,（如 hidden、auto、scroll）
  - display 值为 inline-block、table-cell、table-caption、flex、inline-flex、grid、inline-grid、flow-root（CSS3 新增，专门触发 BFC（无副作用）等
- 特性：
  - 独立的渲染区域: BFC 内部的元素不会影响外部，`隔离特性`
  - 垂直方向排列规则：块级元素依次垂直分布
  - 同一 BFC 内部相邻元素会出现 margin 外边距合并现象。不同的 BFC 外边距不会
  - 包含浮动元素：BFC 会计算浮动元素高度，避免高度塌陷问题
  - 阻止浮动覆盖： BFC 区域不会与浮动元素重叠
- 经典应用场景：
  - 父子元素 margin-top 穿透、兄弟元素 margin 重叠问题
  - 浮动带来的高度塌陷问题
  - 布局问题(避免与浮动元素重叠等)

#### 3.2 包含块、初始包含块及如何确定包含块

- 包含块: CSS是元素布局的参考框。元素尺寸(百分比)计算和定位属性left等都是基于包含块来计算，包含块的确定根据最近祖先元素的position来确定。
- 确定包含块的条件：依据于该元素的 position 属性
  - 如果是 relative/static/sticky，包含块就是最近的块级祖先元素的内容区(content-box)
  - 如果是 absolute,包含块就是最近的 position 不为 static 的祖先元素的内边距区域(padding-box)
  - 如果是 fixed,包含块是视口(大部分情况下是)
- 初始包含块： root元素所在的包含块被称为初始包含块

#### 3.3、CSS中某些属性值设置为百分比，如何计算？

- 当某些属性被赋予百分比，依赖于这个元素的包含块
  - height、top 及 bottom 属性根据包含块的 height 计算百分比值
  - width、left、right、padding 和 margin 属性根据包含块的 width 计算百分比值

### 四、Flex布局与Grid布局问题

#### 4.1 flex: 1 完整写法是什么？分别代表什么？

- flex: 1 等价于 flex: 1 1 0%; 但值得注意IE11等早期浏览器可能会渲染成 1 1 auto，带来布局问题；显式写全flex:1 1 0;
- flex是flex-grow、flex-shrink、flex-basis的简写

#### 4.2 flex-grow / flex-shrink / flex-basis 如何理解以及计算公式

- flex-grow: 控制剩余空间按照比例分配，默认值0,负数无效
  - 计算公式：子项宽度 = basis + (剩余空间 \* 子项grow比例 /子项grow比例之和)
- flex-shrink: 控制溢出空间按照比例压缩,默认值1，负数无效
  - 计算公式：子项宽度 = basis - (子项权重 / 总权重) _ 溢出宽度。 其中权重等于basis _ shrink。
  - 举例说明：比如一个400px容器，一个子元素A宽度300px, shrink为1，另一个子元素B宽度200px,shrink为2，计算各自收缩比例。

  ```js
  - 1、计算超出空间：(300+ 200) - 100 = 100px
  - 2、计算各自权重：
    A权重：300 * 1，
    B权重: 200 * 2,
    总权重300 + 400 = 700
  - 3、分配
    A压缩后宽度: 300 - 100 * (300/700)
    B压缩后宽度： 200 - 100 * (400/700)
  ```

- flex-basis: 定义子项的初始宽度，默认值auto,由内容撑开

#### 4.3 为什么有时 flex:1 的子元素会被内容撑开？怎么解决？

- 现象: 比如一个600px的容器，其中三个子元素设置flex:1,其中一个元素内容超长，在IE一些浏览器，内容会被撑开，且宽度分配不均。
- 本质：

#### 4.4 Flex布局如何实现三列等宽布局？

#### 4.5 Flex布局如何实现完美的三栏，应对宽度和小屏幕，左右固定宽度200px,中间内容自适应。

```css
.container {
  dispaly: flex;
  justify-content: center; /*宽屏幕居中*/
}
.left,
.right {
  width: 200px;
  flex-shrink: 0; /*禁止窄屏幕压缩*/
}
.middle {
  flex-grow: 1;
  max-width: 1000px; /*限制宽屏幕无限拉伸*/
}
```

#### 4.6、flex-basis 、width、minWidth、max-width优先级

minWidth > maxWidth > flex-basis > width

> PS: minWidth、max-width定义的是边界，width是flex-basis的备用方案

#### 4.7 Grid布局与Flex布局区别？

- Flex: 一维布局(行和列选其一)
- Grid: 二维布局(同时控制行和列)，适用于复杂的网格布局

### 五、CSS工程化相关问题

#### 5.1 CSS性能优化有哪些手段

- 选择器优化,避免深层嵌套等
- 样式体积优化，提取公共样式，开启CSS压缩，按需加载CSS等
- 渲染性能优化：避免批量修改触发重排的属性，批量修改样式，而非逐个修改，使用CSS硬件加速GPU,避免使用filter/box-shadow等高开销属性，增加GPU负担
- 资源加载优化： CDN加载CSS、预加载preload关键样式，避免@import(串行加载，会阻塞CSS解析)引入，改为link并行加载

#### 5.2 CSS 模块化方案

- CSSinJS、BEM、CSS Modules等

#### 5.3 CSS预处理器与后处理器区别和应用

- CSS预处理器：用于在CSS编译前扩展CSS写法，可以使用变量、函数、循环等，如Sass/less/stylus,最终会通过构建工具编译成普通CSS。
- CSS后处理器: 用于已生成的CSS进行处理，如压缩，自动追加前缀，转译等，如插件PostCSS

#### 5.4 CSS兼容性问题如何处理？

- 提前规避
- 优雅降级/渐进增强
- 浏览器检测
  - 通过JS检测浏览器版本(判断IE)，加载对应的兼容样式
  - 使用CSSHack。
- 使用第三方兼容库：Normalize.css/reset.css

### 六、场景题

#### 6.1 图片下方默认间隙原因 & 解决？

- 本质：图片为inline元素(display)，图片，表单等元素会默认与父级盒子的基线对齐,默认对齐方式baseline.
- 解决办法: img { display: block } or img{ vertical-align: middle }

#### 6.2 行内块空白间隙原因 & 解决？

- 本质：换行和空格造成的间隙
- 解决办法
  - 取消换行/空格
  - font-size为0，但子元素需重置font-size，避免继承
  - marign负值
  - ...
    > 传送门： https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/

### 七、CSS3过渡与动画

### 八、常见手写题

- 居中(水平垂直方向)
  - 已知宽高: position + margin负值的一半
  - 未知宽高：
    - absolute + transform
    - absolute + margin auto(left: 0; top: 0; right: 0;bottom: 0)
    - flex + margin(auto)/ flex + justify-content + align-items
    - grid + margin(auto)/ grid + place-items
- 布局类
  - 两栏布局：左侧定宽200px，右侧自适应
    - Flex布局(IE10)

    ```css
    .left {
      width: 200px;
      flex-shrink: 0; /*禁止缩放*/
    }
    .right {
      flex: 1;
      min-width: 0; /*j避免超长内容撑开宽度*/
    }
    ```

    - float + overflow:hidden(IE8+)

    ```css
    .left {
      width: 200px;
      float: left;
    }

    .right {
      overflow: hidden;
    }
    ```

    - Position + calc()

    ```css
    .left {
      postion: absolute;
      top: 0;
      left: 0;
      width: 200px;
    }

    .right {
      margin-left: 200px;
      width: calc(100% - 200px);
    }
    ```

    - Grid布局

    ```css
    .container {
      display: grid;
      grid-template-columns: 200px 1fr;
    }
    ```

  - 三栏布局：两侧定宽200px，中间自适应
    - flex布局

    ```css
    .left,
    .right {
      width: 200px;
      flex-shrink: 0;
    }
    .middle {
      flex: 1;
      min-width: 0;
    }
    ```

    - Grid布局

    ```css
    .container {
      display: grid;
      /* 网格列：左200px + 中自适应 + 右200px */
      grid-template-columns: 200px 1fr 200px;
    }
    ```

    - 圣杯布局 、双飞翼布局 (浮动 + 负margin)： 中间优先渲染，

  - 等宽布局
  - 等高布局
  - 九宫格布局：等分宽度 + 间距一致 + 允许换行; 3 \* 3网格
    - Grid布局(天然支持)，适合现代PC项目,最简单

    ```css
    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    ```

    - Flex布局(兼容IE10+) + calc()

    ```css
    :root {
      --gap: 10px;
      --col-count: 3;
    }

    .container {
      display: flex;
      flex-wrap: wrap; /* 允许换行*/
      gap: var(--gap);
    }
    .flex-item {
      width: calc(100% / 3 - var(--gap) * 2 / var(--col-count));
    }
    ```

    - float布局(兼容IE6+),兜底方案

- CSS绘制图形
  - 圆形: 控制宽高长度一致，border-radius 大于等于其一半就行。

  ```css
  .round {
    /* */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
  }
  ```

  - 扇形
  - 三角形
    - border法：width和height为0,将其他三个边border-color设置透明色transparent即可

    ```css
    .triangle {
      width: 0;
      height: 0;
      border: 50px solid transparent;
      border-top-color: red;
    }
    ```

    - clip-path裁剪法: clip-path可裁剪成任意形状

    ```css
    .triangle-clip {
      width: 20px;
      height: 20px;
      background: #f00;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%); /* 三个顶点坐标 */
    }
    ```

    - svg作为背景图

    ```css
    .triangle-svg {
      width: 20px;
      height: 20px;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23e74c3c" d="M0 0 L100 0 L50 100 Z"/></svg>');
    }
    ```

  - 箭头

  ```css

  ```

  - 自适应正方形

  ```css

  ```

- 1px问题: 本质是Retina高清屏,1px被渲染成多个物理像素，视觉上变粗。
  - 伪元素 + transform
  - viewport 缩放
  - 媒体查询: 根据 DPR 动态设置边框

  ```css
  /*1、伪元素 + transform*/
  .border-1px {
    position: relative;
  }
  .border-1px::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #ccc;
    transform: scaleY(0.5); /* DPR=2 时缩放 0.5，DPR=3 时 0.333 */
    transform-origin: 0 0;
  }
  /*2、viewport 缩放：适合整站统一*/
  <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5">
   /* 3、媒体查询：根据 DPR 动态设置边框*/
   @media (-webkit-min-device-pixel-ratio: 2) {
    .border {
      border-width: 0.5px;
    }
  }
  ```

- 移动端吸顶、吸顶效果
  - 吸顶: sticky定位

  ```css
  .sticky-nav {
    height: 60px;
    postion: sticky;
    top: 0;
    z-index: 9999;
  }
  ```

  - JS控制：监听scroll事件，切换fixed类

- 吸底:

```css
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
body {
  padding-bottom: 50px; /* 等于 footer 高度 */
}
```

- 粘性页脚(sticky Footer): 注意和吸底进行区分
  - 特点：当主体内容不足一屏，页脚固定在顶部，超过一屏，页面附着在页面的底部

```css
/* 
 <div class='app-wrapper'>
   <div class='app-content'>
      <p>一屏内容</p>
      <p>一屏内容</p>
      ...
   </div>
   <div class='app-footer'>footer</div>
 </div>

*/
/* 法1: FLex布局 */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 关键控制高度*/
}
.app-content {
  flex: 1;
}

/* 法2：Calc(100% - footer高度)  */
.app-content {
  min-height: calc(100% - 60px);
}
```

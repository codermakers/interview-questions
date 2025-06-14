### CSS 高频面试题

#### 1、简述一下 CSS 盒模型？

- 概念：在网页中，所有元素被视为一个矩形盒子，有四部分组成，内容区(content)、内边距(padding)、边框(border)、外边距(margin).
- 盒模型的两种模式
  - 标准盒模型(content-box): width 和 height 是内容区的尺寸
    元素宽度： width + padding + border + margin
    元素高度： height + padding + border + marign
  - IE 盒模型(怪异盒模型)(border-box): width 和 height 是内容区、内边距、边框的总和
    元素宽度： width(包含 border 和 padding) + margin
    元素高度： height(包含 border 和 padding) + margin
    > CSS3 中 box-sizing 属性可决定网页选择何种盒模型进行渲染页面

#### 2、CSS 三大特性

- 层叠性:
- 优先级(特异性)：
- 继承性:

#### 3、介绍常用的 CSS 选择器？

- 通用选择器：\*
- 元素选择器： elename
- 类选择器： .className
- ID 选择器：#idname
- 属性选择器：
  [attr] [attr=value] [attr~=value] [attr|=value] [attr^=value] [attr$=value] [attr*=value]
- 分组选择器(grouping selector): A,B
- 后代选择器： A B
- 儿子选择器： A>B
- 通用兄弟选择器： A ~ B
- 相邻兄弟选择器： A+B
- 伪类选择器：
- 伪元素选择器：::before ::after

#### 4、CSS 垂直水平居中的多种方式？

- Flex 布局

  - 父元素 flex 布局

  ```css
  .parent {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  ```

  - 父元素 flex + 子元素 margin + auto

  ```css
  .parent {
    display: flex;
  }
  .child {
    margin: auto;
  }
  ```

- Grid 布局

  - 父元素 Gird 布局

  ```css
  .parent {
    display: grid;
    place-items: center;
  }
  ```

  - 父元素 grid + 子元素 margin + auto

  ```css
  .parent {
    display: grid;
  }
  .child {
    margin: auto;
  }
  ```

- absolute + transform

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

- absolute + (负)margin (已知元素宽高)

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -50px; //子元素高度的一半
  margin-left: -100px; //子元素宽度的一半

  width: 100px;
  height: 200px;
}
```

- absolute + margin auto(left: 0; top: 0; right: 0;bottom: 0)

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

- 动态计算 calc() (已知元素宽高)

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 200px;
  height: 200px;
}
```

#### 5、谈一下 CSS 中的 Postion(定位)？

- static 所有元素定位默认值，常用于清除浮动
- relative(相对定位)
  - 特征
    - 相对于原本位置进行偏移
    - 不脱离文档流，仍占据原位置空间；此时 top, right, bottom, left 和 z-index 属性无效。
  - 应用场景
    - 微调元素位置(如图标偏移)
    - 作为 absolute 定位元素的参考容器 (子绝父相)
  - 注意事项：
    - position:relative 对 table-\*-group, table-row, table-column, table-cell, table-caption 元素无效
- absolute(绝对定位)
  - 特征
    - 相对于`包含块`进行偏移，包含块可简单理解为最近非 static 定位的祖先元素
    - 脱离文档流，不占位原位置空间，注意此时元素的`display: block`,但是表现为 inline-block 特性,默认值 100%失效
  - 应用场景：
    - 常配合父元素 relative 布局，
- fixed(固定定位)
  - 特征
    - 相对于浏览器的视口(viewport)(`不绝对`)进行定位； 注意：当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，容器由视口改为该祖先
    - 元素脱离文档流
  - 应用场景
    - 固定导航栏、悬浮按钮、广告栏、通栏等
  - 注意事项：
    - 当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，容器由视口改为该祖先
- sticky(粘性定位)
  - 特征：相对定位与固定定位的组合； 元素在跨越特定阈值前为相对定位，之后为固定定位
  - 应用场景：
    - 吸顶效果、侧边栏跟随滚动
  - 注意事项(`sticky生效`的前提条件)
    - 必须设置元素 top、right、bottom 或 left 中的任意一个值
    - 父元素的 overflow 必须为 visble(默认)，否则失效
    - 父元素的高度必须大于 sticky 的元素高度。

#### 6、隐藏一个元素的方式及区别？

- display: none:
  - 特点：
    - 元素完全从 DOM 中移除，不占据空间，子元素也会隐藏
    - 会触发回流与重绘
    - 无法响应事件
- visibility: hidden
  - 特点：
  - 元素不可见，占据原位置空间，子元素也会隐藏
  - 会触发重绘，但不会触发回流
  - 无法响应事件
- opacity: 0
  - 特点：
  - 元素完全透明，但保留空间和交互性
  - 会触发重绘，但不会触发回流
  - 可响应事件
- width 和 height 为 0，可能导致文本溢出，需设置 overflow:hidden
- 通过定位或者 marign 将元素移出视口

#### 7、 CSS 权重计算方式

!important > 内联样式> id > class/属性选择器/伪类选择器 > 标签选择器/伪元素选择器

#### 8、BFC(Block Formatting Context)： 块级格式化上下文

- 概念： BFC 是 CSS 渲染页面用于控制块级元素布局的一个独立渲染区域。
- 触发 BFC 的条件
  - 根元素 <html>。
  - float 值不为 none
  - position 值为 absolute 或 fixed
  - display 值为 inline-block、table-cell、table-caption、flex、inline-flex、grid、inline-grid
  - overflow 值不为 visible（如 hidden、auto、scroll）
  - contain 值为 layout、content 或 strict（CSS Containment Module）
    ...
    以上条件满足其一即可。
- BFC 的特性
  - 独立的渲染区域: BFC 内部的元素不会影响外部
  - 垂直方向排列规则：块级元素依次垂直分布
  - 同一 BFC 内部相邻元素会出现 margin 外边距合并现象。不同的 BFC 外边距不会
  - 包含浮动元素：BFC 会计算浮动元素高度，避免高度塌陷问题
  - 阻止浮动覆盖： BFC 区域不会与浮动元素重叠
- 应用场景
  本质：通过隔离布局环境，解决 CSS 中的常见布局问题（如浮动、边距合并）
- 其他的格式上下文
  - IFC(行内格式化上下文)
  - FFC(弹性格式化上下文)
  - GFC(网格格式化上下文)

#### 9、层叠上下文(Stacking context)

#### 10、包含块(Containing Block)

- 概念:
- 确定一个元素的包含块的条件：依据于该元素的 position 属性
  - 如果是 relative/static，包含块就是最近的块级祖先元素的内容区
  - 如果是 absolute,包含块就是最近的 position 不为 static 的祖先元素的内边距区域
  - 如果是 fixed,包含块是视口(大部分情况下是)
  - 如果是 sticky,包含块是最近的滚动容器的内容区域（通常是父级或祖先元素）
- 作用: 用于计算元素尺寸和位置
  - 当某些属性被赋予百分比，依赖于这个元素的包含块
    - height、top 及 bottom 属性根据包含块的 height 计算百分比值
    - width、left、right、padding 和 margin 属性根据包含块的 width 计算百分比值

#### 11、如何实现一个三角形、扇形、圆形、梯形？

- 三角形实现

  - border 边框
  - clip-path 裁剪
  - svg 作为背景图

  ```css
  /* border边框法 */
  .triangle {
    width: 0;
    height: 0;
    border: 10px solid #000;
    border-color: transparent;
    border-left-color: red;
  }
  /* clip-path裁剪: 可裁剪任意形状 */
  .triangle-clip {
    width: 20px;
    height: 20px;
    background: #f00;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%); /* 三个顶点坐标 */
  }
  /* svg作为背景图*/
  .triangle-svg {
    width: 20px;
    height: 20px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23e74c3c" d="M0 0 L100 0 L50 100 Z"/></svg>');
  }
  ```

- 扇形实现
  - Border
  - 圆锥渐变 conic-gradient 语法
  - 圆角裁剪 + 旋转法
  - clip-path 路径裁剪
  - SVG 背景图裁剪

  ```css
  // border边框实现
  .sector{
    border: 100px solid transparent;
    width: 0;
    height: 0;
    border-radius: 100px;
    border-top-color: red;
  }
   <!-- 圆锥渐变 conic-gradient -->
  .sector-conic {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      #ff6b6b 0deg 90deg,
      /* 扇形区域（0°~90°） */ transparent 90deg 360deg /* 透明剩余部分 */
    );
  }
  ```

> 圆锥渐变 conic-gradient 语法更多参考https://www.zhangxinxu.com/wordpress/2020/04/css-conic-gradient/

- 圆形实现


- 梯形实现



#### 12、重绘(repaint)与回流(也叫重排)(reflow)
- 概念： 重绘与回流是浏览器渲染引擎更新页面的两种核心策略，直接影响页面性能

- 触发回流的场景：元素的几何属性或布局发生改变，需重新计算布局

  - 元素的几何属性变化：width、height、margin、padding、border、font-size
  - 添加/删除可见的 DOM 元素
  - 元素位置改变（position、float、display: flex 等）
  - 窗口大小调整（resize 事件）
  - 读取布局属性（offsetTop、scrollHeight、clientWidth 等，强制同步回流）
> 回流一定触发重绘，重绘不一定触发回流

- 触发重绘的场景: 元素外观变化（颜色、背景等）但布局不变;
  - 外观属性变化：color、background、visibility、outline、border-radius。
  - 不影响布局的样式修改：如阴影（box-shadow）、渐变（gradient）

- 性能优化策略： 如何避免或者减少重绘与回流？
  - 减少回流的次数
    - 批量修改DOM
    - 使用文档碎片DocumentFragment
    - 使用CSS transforms

  ```




  

  

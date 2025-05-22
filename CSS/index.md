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

- 层叠性：
- 优先级(特异性)：
- 继承性

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
    - position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效
- absolute(绝对定位)
  - 特征
    - 相对于`包含块`进行偏移，包含块可简单理解为最近非static定位的祖先元素
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
    - 必须设置元素top、right、bottom 或 left 中的任意一个值
    - 父元素的overflow必须为visble(默认)，否则失效
    - 父元素的高度必须大于sticky的元素高度。

#### 6、隐藏一个元素的方式及区别？
- display: none: 
  - 特点：
    - 元素完全从DOM中移除，不占据空间，子元素也会隐藏
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
- width和height为0，可能导致文本溢出，需设置overflow:hidden
- 通过定位或者marign将元素移出视口


#### 7、 CSS 权重计算方式

!important > 内联样式> id > class/属性选择器/伪类选择器 > 标签选择器/伪元素选择器 


#### 8、BFC(Block Formatting Context)： 块级格式化上下文
- 概念： BFC是CSS渲染页面用于控制块级元素布局的一个独立渲染区域。
- 触发BFC的条件
  - 根元素 <html>。
  - float 值不为 none
  - position 值为 absolute 或 fixed
  - display 值为 inline-block、table-cell、table-caption、flex、inline-flex、grid、inline-grid
  - overflow 值不为 visible（如 hidden、auto、scroll）
  - contain 值为 layout、content 或 strict（CSS Containment Module）
  ...
以上条件满足其一即可。
- BFC的特性
  - 独立的渲染区域: BFC内部的元素不会影响外部
  - 垂直方向排列规则：块级元素依次垂直分布
  - 同一BFC内部相邻元素会出现margin外边距合并现象。不同的BFC外边距不会
  - 包含浮动元素：BFC会计算浮动元素高度，避免高度塌陷问题
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
- 确定一个元素的包含块的条件：依据于该元素的position属性
   - 如果是relative/static，包含块就是最近的块级祖先元素的内容区
   - 如果是absolute,包含块就是最近的position不为static的祖先元素的内边距区域
   - 如果是fixed,包含块是视口(大部分情况下是)
   - 如果是sticky,包含块是最近的滚动容器的内容区域（通常是父级或祖先元素）
- 作用: 用于计算元素尺寸和位置
   - 当某些属性被赋予百分比，依赖于这个元素的包含块
     - height、top 及 bottom 属性根据包含块的 height 计算百分比值
     - width、left、right、padding 和 margin 属性根据包含块的 width 计算百分比值

#### 11、如何实现一个三角形、扇形、圆形、梯形？
- 三角形实现
```css


```


- 扇形实现


- 圆形实现



- 梯形实现

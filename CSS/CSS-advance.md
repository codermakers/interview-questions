## CSS Advance Skills

## CSS Format Text

## CSS Layout

### CSS Table Layout (早期方案，已摈弃)

### CSS Float Position Layout(旧方案)

### CSS Flex Layout (现代主流布局方案: 一维布局)

- [Flex CheatSheet](./images/flex-cheatsheet.png)

- Flex Container Property
  - display:
    - inline-flex
    - flex
  - flex-direction: 设置主轴方向
    - row(默认)
    - row-rerverse
    - column
    - column-reverse
  - flex-wrap: 默认items排列一行,控制是否换行
    - nowrap(默认不换行)
    - wrap
    - wrap-reverse
  - flex-flow: flex direction + flex wrap的简写
  - justify-content: 设置items在主轴对齐方式
    - flex-start(默认)
    - center
    - flex-end
    - space-between
    - space-around
    - space-evenly
  - align-items (single Line align items): 设置`单行`items在交叉轴对齐方式
    - flex-start
    - center
    - flex-end
    - stretch(默认，items如果不显式设置高度，默认拉伸同父元素等高)
    - baseline
  - align-content: (multi Line align items): : 设置`多行`items在交叉轴对齐方式
    - flex-start
    - center
    - flex-end
    - space-between
    - space-around
    - space-evenly
  - gap: (row gap + column-gap): 控制items之间的间隔(此时margin失效)
    - 示例
    ```css
     .box{
       display: flex;
       gap: 10px; // row-gap: 10px column-gap: 10px;
       gap: 10px 20px; // row-gap: 10px column-gap: 20px;
       row-gap: 10px;
       column-gap: 20px;
     }
    ```
- Flex Items Property
  - order: 控制单个item在主轴显示顺序。
    - 0 (默认值)，可设置负数，越小排列越靠前
  - align-self: 设置单个item在交叉轴对齐方式。用于覆盖align-items。
    - flex-start
    - center
    - flex-end
    - stretch(默认，items如果不显式设置高度，默认拉伸同父元素等高)
    - baseline
  - flex-basis: 设置items在主轴方向上的初始尺寸，优先级高于同方向的width或height属性(auto时候除外)
    - auto(默认)：默认子项初始宽度由内容撑开。
    - 可设置为具体数值50px,或者百分比，常搭配flex-grow和flex-shrink使用。
  - flex-grow:
    - 0 (默认值),可设置具体数值，负数无效
    - 1 如果items 都设置为1，此时items平均分配剩余空间
  - flex-shrink
    - 1(默认值),可设置具体数值，负数无效
    - 0 如果items 都设置为0，等价于禁止收缩
  - flex: flex grow + flex shrink(可缺省) + flex basis(可缺省)
    - 0 1 auto(默认值: 不放大，可缩小，初始值（基准值)为内容宽)
    - 1(等价于 flex: 1 1 0%;：可放大、可缩小、基准为0)
    - 0 1 250px(不放大、不缩小、固定基准250px)

> PS: 重点理解主轴交叉轴一些概念;如果设置父元素flex,子元素的float, clear and vertical-align 设置无效。

### CSS Grid Layout (现代主流布局方案: 二维布局)

- 前提重点理解如下概念：
  - Grid Container:
  - Grid Item
  - Grid Line
  - Grid Track
  - Grid Area
  - Grid Cell: 相邻网格线之间的空间
- Important Concepts and Property
  - Parent Container Property
    - display
      - grid /inline-grid
    - grid-template-\*
      - grid-template-row
      - grid-template-column
      - grid-

### CSS Varible

### CSS Function

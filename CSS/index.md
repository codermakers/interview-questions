### CSS 高频面试题

#### 1、简述一下CSS 盒模型？
 - 概念：在网页中，所有元素被视为一个矩形盒子，有四部分组成，内容区(content)、内边距(padding)、边框(border)、外边距(margin).
 - 盒模型的两种模式
   - 标准盒模型(content-box): width 和 height是内容区的尺寸
     元素宽度： width + padding + border + margin 
     元素高度： height + padding + border + marign
   - IE盒模型(怪异盒模型)(border-box):  width 和 height是内容区、内边距、边框的总和
     元素宽度： width(包含border和padding) + margin
     元素高度： height(包含border和padding) + margin
> CSS3中box-sizing属性可决定网页选择何种盒模型进行渲染页面

#### 2、CSS 三大特性
- 层叠性：
- 优先级(特异性)：
- 继承性

### 3、常用的CSS选择器？

 - 通用选择器：*
 - 元素选择器：如h、p、div
 - 类选择器： 如.wrapper
 - ID 选择器：#idname
 - 属性选择器：
     [attr] [attr=value] [attr~=value] [attr|=value] [attr^=value] [attr$=value] [attr*=value]
 - 分组选择器(grouping selector): A,B
 - 后代选择器： A B
 - 儿子选择器： A>B
 - 兄弟选择器： A ~ B
 - 相邻兄弟选择器： A+B
 - 伪类选择器
 - 伪元素选择器

 
  



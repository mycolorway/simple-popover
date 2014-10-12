# Simple Popover

Simple Popover 是一个继承自[Simple Module](https://github.com/mycolorway/simple-module)的组件，同时依赖于JQuery。

#### 初始化
通过`simple.popover(opts)`来初始化popover组件，其中

```
opts ＝ {
  pointTo [String popover指向元素的选择器],
  content [String popover填充的内容]
  position [String popover的位置]
  offset [Number popover的偏移量]
  align [String popover的箭头指向的水平位置]
  vertialAlign [String popover的箭头的竖直位置]
  cls [String 给popover添加自定义的class]
  autohide [Boolean 当点击其他对象后，popover自动隐藏]
  autoAdjustPosition [Boolean 自动确定位置]
}
```
其中，position可以是

- left-top
- left-middle
- left-bottom
- right-top
- right-bottom
- right-middle
- top-left
- top-right
- top-center
- bottom-left
- bottom-right
- bottom-center

align:

- left
- center
- right

verticalAlign:

- top
- middle
- bottom

初始化之后，返回一个Popover对象，同时出现popover组件

#### Popover对象方法

`destroy()` popover消失

`distroyAll()` 销毁所有popover
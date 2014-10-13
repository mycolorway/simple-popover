# Simple Popover

一个简单的Popover组件。

依赖项：

- JQuery 2.0+
- [Simple Module](https://github.com/mycolorway/simple-module)

### 使用方法
首先，需要在页面里引用相关脚本以及css

```html
<link media="all" rel="stylesheet" type="text/css" href="path/to/popover.css" />
<script type="text/javascript" src="path/to/jquery.min.js"></script>
<script type="text/javascript" src="path/to/module.js"></script>
<script type="text/javascript" src="path/to/popover.js"></script>

```

初始化实例，返回Popover对象：

```js
simple.popover({
  pointTo: $('#pointTo'),
  content: 'This is content'
});

```

### API 文档

####初始化选项

__pointTo__

popover控件指向元素的JQuery选择器，必选
  
__content__

String, popover显示的内容，必选

__position__

popover的位置，支持以下选项：

```
[
  'left-top',
  'left-middle',
  'left-bottom',
  'right-top',
  'right-bottom',
  'right-middle',
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center'
]
```

__offset__

popover相对于指向元素的偏移量

__align__

popover的箭头指向的水平位置，支持以下选项

```
[
  'left',
  'right',
  'centet'
]
```

__vertialAlign__

popover的箭头指向的竖直位置，支持以下选项

```
[
  'top',
  'middle',
  'bottom'
]
```

__cls__

String，给popover增加自定义的类

__autohide__

Boolean，设置当点击其他目标时，popover自动销毁

__autoAdjustPosition__

Boolean，设置自动调整位置

#### 方法

`destroy()` 销毁popover实例

`distroyAll()` 销毁所有popover实例
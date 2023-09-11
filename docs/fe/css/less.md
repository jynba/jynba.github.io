# Hello Less

:::tip Less
It's CSS, with just a little more.

[Learn More](https://less.bootcss.com/)
:::

## What is Less

Less(Leaner Style Sheets 精简样式表) 是一种动态样式语言，属于 css 预处理器的范畴，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展，Less 既可以在 客户端 上运行 ，也可以借助 Node.js 在服务端运行。

Less 编译工具：

- [Koala](http://koala-app.com/index.html)
- vscode 的 Easy LESS 插件

## 注释(Comments)

- 多行注释保留
- 单行注释不被保留在编译生成的 CSS 中

```less
/* 
 * 一个块注释
 * style comment! 
*/

// 这一行被注释掉了！
div {
  color: red;
}
```

## 变量(Variables)

### 基本使用

- @ 声明变量，作为普通属性值使用

```less
@width: 50px;
@height: 100px;

div {
  width: @width;
  height: @height;
}
```

### 变量插值(Variable Interpolation)

- 变量用于选择器名、属性名、URL、`@import`语句

```less
@my-selector: banner;

// 需要添加 {}
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

```less
// Variables
@images: '../img';

// Usage
body {
  color: #444;
  background: url('@{images}/white-sand.png');
}
```

```less
// Variables
@themes: '../../src/themes';

// Usage
@import '@{themes}/tidal-wave.less';
```

### 延迟加载(Lazy Evaluation)

:::tip Lazy Evaluation
When defining a variable twice, the last definition of the variable is used, searching from the current scope upwards.
:::

当一个变量被声明多次，会取最后一次的值，并从当前作用域往外寻找变量。

```less
@var: 0;
.class {
  @var: 1;
  .brass {
    @var: 2;
    three: @var;
    @var: 3;
  }
  one: @var;
}
```

```css
.class {
  one: 1;
}
.class .brass {
  three: 3;
}
```

### 属性名变量(Properties as Variables)

:::tip Properties as Variables
You can easily treat properties like variables using the $prop syntax
:::

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

```css
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

## 嵌套(Nesting)

Less 提供了使用嵌套(nesting)代替层叠或与层叠结合使用的能力

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

## 父选择器 (Parent Selectors)

在嵌套规则中， `&` 表示父选择器，常用于给现有选择器添加伪类。

```less
.header {
  a {
    color: blue;
    &:hover {
      color: green;
    }
  }
}
```

```css
.header a {
  color: blue;
}
.header a:hover {
  color: green;
}
```

如果没有 `&`，会被编译成后代选择器 `a :hover`。

除此之外，`&` 还能用于生成重复类名：

```less
.button {
  &-ok {
    background-image: url('ok.png');
  }
  &-cancel {
    background-image: url('cancel.png');
  }

  &-custom {
    background-image: url('custom.png');
  }
}
```

```css
.button-ok {
  background-image: url('ok.png');
}
.button-cancel {
  background-image: url('cancel.png');
}
.button-custom {
  background-image: url('custom.png');
}
```

## 混合(Mixins)

混合(Mixin)是一种将一组属性从一个规则集包含(或混入)到另一个规则集的方式，可理解为复制粘贴。

### 普通混合

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

### 带参数的混合(Parametric Mixins)

1. 混合带参数，参数需要按顺序传递

```less
.border(@width, @style, @color) {
  border: @width @style @color;
}
div {
  .border(1px, solid, #ccc);
}
```

```css
div {
  border: 1px solid #ccc;
}
```

2. 混合带参数并有默认值

- 需注意的是，就算有默认值，也要按顺序传递

```less
.border(@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(1px, solid);
}

// 会出错
.border(@width: 1px, @style, @color) {
  border: @width @style @color;
}
div {
  .border(solid, #ccc);
}
```

### 命名参数

可以在向混合传参是指定参数名称，从而不需要按顺序传入

```less
.border(@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(@style: solid, @color: red, @width: 100px);
}
```

### @arguments 变量

`@arguments` 变量包含了传入的所有参数

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
```

```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  box-shadow: 2px 5px 1px #000;
}
```

### 匹配模式(Pattern-matching)

在多个相同的混合中(参数个数必须相同)，匹配特定的混合。

```less
.mixin(dark, @color) {
  color: darken(@color, 10%);
}
.mixin(light, @color) {
  color: lighten(@color, 10%);
}
// @_ 表示匹配所有
.mixin(@_, @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch, #888);
}
```

```css
.class {
  color: #a2a2a2;
  display: block;
}
```

## 运算(Operations)

- 计算结果以操作数最左侧的单位类型为准

```less
@conversion-1: 5cm + 10mm; // 6cm
@conversion-2: 2 - 3cm - 5mm; // -1.5cm
@conversion-3: 3.1 * 2cm; // 6.2cm
@conversion-4: 4px / 2; // 4px / 2

// conversion is impossible
@incompatible-units: 1cm - 1px; // 0.97354167cm

// example with variables
@base: 5%;
@filler: @base * 2; // 10%
@other: @base + @filler; // 15%

@color: #224488 / 2; // #112244
background-color: #112244 + #111; // #223355
```

## 继承(Extend)

### Extend Syntax

- 继承可让多个选择器应用同一组属性，最终编译为并集选择器
- 其性能比混合高，但灵活性比混合低

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```

```css
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

### Extend "all"

:::tip Extend "all"
When you specify the all keyword last in an extend argument it tells Less to match that selector as part of another selector. The selector will be copied and the matched part of the selector only will then be replaced with the extend, making a new selector.

You can think of this mode of operation as essentially doing a non-destructive search and replace
:::

- 可理解为把 `all` 前的选择器出现的地方全都替换为 `extend` 前的选择器
- 即把 `.test` 替换为 `.replacement` 生成一个新的选择器应用样式，且不破坏原有的选择器

```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {
}
```

```css
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```

## 避免编译

通过加引号可以避免 Less 编译，直接把内容输出到 CSS 中

```less
.banner .inline .header {
  width: '100px + 100px';
  height: 100px + 100px;
}
```

```css
.banner .inline .header {
  width: '100px + 100px';
  height: 200px;
}
```

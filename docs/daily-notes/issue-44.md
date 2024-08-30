> 昨天想要初始化一个动态二维数组，竟然想不起要怎么做，只想到了最笨的方法，两个for循环new Array，不行，这肯定不能满足我对代码质量有追求的人，于是我尝试了几种方式，最后发现Array.from竟然可以帮助我做到这一点

  :::tip 原文地址
  [你不知道的Array.from | GitHub](https://github.com/jynba/jynba.github.io/issues/44)
  :::
  
### 解决方法：

- 方法1：两层for循环
<img width="274" alt="a076e71fe124dfbc9c0cc0d18d2058a" src="https://github.com/jynba/jynba.github.io/assets/75623303/74b08774-e89d-40af-bfd9-92fae4e20fa5">

- 方法2：Array.from
```js
let b = Array.from({length:2},()=>[])
```
![image](https://github.com/jynba/jynba.github.io/assets/75623303/8963c767-4de7-4bec-92d3-64c8bea1507c)

**Array.from定义**：从**可迭代**或**类数组对象**创建一个新的浅拷贝的数组实例**
**参数：arraylike,  (item,index)=>{}, this**

[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

```js
//Set变数组 去重
Array.from(new Set(["foo", "bar", "baz", "foo"]));//["foo", "bar"]

//Map变数组
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
Array.from(map);// [[1, 2], [2, 4], [4, 8]]
const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
Array.from(mapper.values());// ['a', 'b'];
Array.from(mapper.keys());// ['1', '2'];

// 根据 DOM 元素的属性创建一个数组
const images = document.querySelectorAll("img");
const sources = Array.from(images, (image) => image.src);
const insecureSources = sources.filter((link) => link.startsWith("http://"));

//从类数组对象构建数组（arguments）
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);// [ 1, 2, 3 ]

//使用箭头函数和 Array.from()
Array.from([1, 2, 3], (x) => x + x);// [2, 4, 6]
Array.from({ length: 5 }, (v, i) => i);// [0, 1, 2, 3, 4]

```


### 错误示例：
数组的fill方法传入对象时，会传入地址，因此会导致元素都指向相同的地址，导致初始化出错
```js
let a = new Array(3).fill(new Array(3).fill(0));
```
![image](https://github.com/jynba/jynba.github.io/assets/75623303/ff8e533a-1bd1-41e9-bb9d-a661f6d187a1)

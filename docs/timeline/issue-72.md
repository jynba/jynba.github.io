> 今天在看源码的时候，薅牛毛薅到这个概念，第一次学习到这个，记录一下

  :::tip 原文地址
  [什么是null原型对象？它有什么作用？ | GitHub](https://github.com/jynba/jynba.github.io/issues/72)
  :::
  
参考文档: [null原型对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object#null_%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1)
### 什么是null原型对象

* null原型对象的创建方法：
```js
const obj = Object.create(null);
const obj2 = { __proto__: null };
```

* 它是一个非常“干净”的对象，它不会从 Object.prototype 继承任何对象方法、包括但不限于`hasOwnProperty` `valueOf` `constructor` `toString`... 
它甚至不能被console.log()打印出来
```js
const normalObj = {}; // 创建一个普通对象
const nullProtoObj = Object.create(null); // 创建一个 "null" 原型对象

console.log(`normalObj 是：${normalObj}`); // 显示 "normalObj 是：[object Object]"
console.log(`nullProtoObj 是：${nullProtoObj}`); // 抛出错误：Cannot convert object to primitive value

alert(normalObj); // 显示 [object Object]
alert(nullProtoObj); // 抛出错误：Cannot convert object to primitive value
```
* 但我们也可以通过为 null 原型对象分配属性的方式将 toString 方法添加回去
```js
nullProtoObj.toString = Object.prototype.toString; 
// 由于新对象缺少 `toString` 方法，因此需要将原始的通用 `toString` 方法添加回来。

console.log(nullProtoObj.toString()); // 显示 "[object Object]"
console.log(`nullProtoObj 是：${nullProtoObj}`); // 显示 "nullProtoObj 是：[object Object]"
```

* 当我们使用for...in 或者直接读取对象属性时，由于存在 Object.prototype 属性，会导致一些错误
```js
const ages = { alice: 18, bob: 27 };

function hasPerson(name) {
  return name in ages;
}

function getAge(name) {
  return ages[name];
}

hasPerson("hasOwnProperty"); // true
getAge("toString"); // [Function: toString]
```
* 此外还能避免一些恶意的全局污染
```js
const user = {};

// 恶意脚本：
Object.prototype.authenticated = true;

// 意外允许未经身份验证的用户通过
if (user.authenticated) {
  // 访问机密数据
}
```

### null原型对象有什么作用
* Object.create(null) 提供了一个没有继承链的原始对象，适用于需要创建简洁、干净对象的场景，尤其是在避免原型链干扰时非常有用。通过去除继承的属性，代码更易于控制和优化，避免了属性冲突和潜在的安全问题。

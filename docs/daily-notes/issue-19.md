# 什么是Symbol.toPrimitive？

  :::tip 原文地址
  [什么是Symbol.toPrimitive？ | GitHub](https://github.com/jynba/jynba.github.io/issues/19)
  :::
  > Symbol.toPrimitive 允许我们将对象描述为原始值转换
* 如果没有 Symbol.toPrimitive，那么 JavaScript 将尝试寻找 toString 和 valueOf 方法
* string优先调用toString，其他优先调用valueOf；
这两个方法必须返回一个原始值。如果 toString 或 valueOf 返回了一个对象，那么返回值会被忽略
* 默认情况下，普通对象具有 toString 和 valueOf 方法：
toString 方法返回一个字符串 "[object Object]"。
valueOf 方法返回对象自身
```js
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```
**注意：** 没有限制 toString() 是否返回字符串，或 Symbol.toPrimitive 方法是否为 "number" hint 返回数字。
唯一强制性的事情是：这些方法必须返回一个原始值，而不是对象。
```js
 [Symbol.toPrimitive](hint) {
              alert(`hint: ${hint}`);
              return hint == "string" ? `{name: "${this.name}"}` : this.money;
 }
    //等价于
 toString() {
              return `{name: "${this.name}"}`;
 }
valueOf() {
      return this.money;
  }
```
### 总结
转换算法是：

调用 obj[Symbol.toPrimitive](hint) 如果这个方法存在，
否则，如果 hint 是 "string"

尝试调用 obj.toString() 或 obj.valueOf()，无论哪个存在。
否则，如果 hint 是 "number" 或者 "default"

尝试调用 obj.valueOf() 或 obj.toString()，无论哪个存在。
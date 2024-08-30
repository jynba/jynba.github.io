### 什么是隐式数据类型转换？

  :::tip 原文地址
  [类型转换之toString与valueOf | GitHub](https://github.com/jynba/jynba.github.io/issues/53)
  :::
  
- 在出现操作符(+-*/==><)时，会触发隐式数据类型转换，调用valueOf 和 toString 对数据类型进行转换

### toString与valueOf两者区别

- 共同点：他们均为原型链上的方法，在输出对象时会自动调用。

- 不同点：默认返回值不同，且存在优先级关系
  - 使用《运算操作符》的情况下，valueOf的优先级高于toString。
  - 在进行《对象转换》时，将优先调用toString方法，如若没有重写 toString，将调用 valueOf 方法；如果两个方法都没有重写，则按Object的toString输出。
  - 在进行强转《字符串类型》时，将优先调用 toString 方法，强转为数字时优先调用 valueOf。

```js
class A {
    valueOf() {
        return 2     
    }     
    toString() {
      return '哈哈哈'     
    } 
} 
let a = new A() 
console.log(String(a))  // '哈哈哈'   => (toString)
console.log(Number(a))  // 2         => (valueOf) 
console.log(a + '22')   // '222'     => (valueOf) 
console.log(a == 2)     // true      => (valueOf) 
console.log(a === 2)    // false     => (严格等于不会触发隐式转换)
```

### [Symbol.toPrimitive]
* Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数，会被传递一个字符串参数hint，表示当前运算的模式。
```js
class A {
        constructor(count) { 
            this.count = count     
        }
        valueOf() {
            return 2     
        } 
        toString() {
          return '哈哈哈'     
        }     
        // 我在这里     
        [Symbol.toPrimitive](hint) {
        if (hint == "number") {
            return 10;
        }        
        if (hint == "string") { 
            return "Hello Libai";        
        }        
            return true;    
        } 
} 
const a = new A(10) 
console.log(`${a}`)     // 'Hello Libai' => (hint == "string") 
console.log(String(a))  // 'Hello Libai' => (hint == "string") 
console.log(+a)         // 10            => (hint == "number") 
console.log(a * 20)     // 200           => (hint == "number") 
console.log(a / 20)     // 0.5           => (hint == "number") 
console.log(Number(a))  // 10            => (hint == "number") 
console.log(a + '22')   // 'true22'      => (hint == "default") 
console.log(a == 10)     // false        => (hint == "default")
```

### 几道有意思的题目
1. 如何让(a==1&&a==2&&a==3)的值为true?
```js
class A {
    constructor(value) {
        this.value = value;     
    }     
    valueOf() { 
        return this.value++;    
    } 
} 
const a = new A(1);
if (a == 1 && a == 2 && a == 3) {
    console.log("Hi Libai!");
}
```
2. 如何让(a===1&&a===2&&a===3)的值为true?
```js
let value = 1; 
Object.defineProperty(window, 'a', { 
get() {
    return value++     
} }) 
if (a === 1 && a === 2 && a === 3) { 
    console.log("Hi Libai!")
}
```
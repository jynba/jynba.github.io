## 什么是Proxy?

  :::tip 原文地址
  [JS中的Proxy和Reflect和Object.defineProperty是什么？ | GitHub](https://github.com/jynba/jynba.github.io/issues/18)
  :::
  proxy作为一个代理对象去代理目标对象，修改Proxy对象进行的绝大部分操作，包括get set in new 都可以在第二个参数handler中配置拦截。
其中，getter接收三个参数，target，prop，receiver（如果目标属性是一个 getter 访问器属性，则 receiver 就是本次读取属性所在的 this 对象。通常，这就是 proxy 对象本身）

> 可以通过代理get set deleteproperty将_的属性封装成内部属性

## 什么是Reflect?
reflect作为一种proxy对象代理属性的方法存在，他可以简单理解为target[prop]，内部有handler的方法。
他解决了target[prop]时可能存在的this指向错误的问题（在代理对象作为父对象，子对象的getter方法调用时可能会错误地把this变为父级，此时需要用receiver来接收该子对象的this，而reflect就是做这事的）

## 什么是Object.defineProperty？
用于定义或修改对象的属性。这个函数允许你在对象上设置一个新属性，或者修改现有属性的特性，如可写性、可枚举性、可配置性等。或者也可为对象设置访问器（getter/setter）
* 注意：一个属性要么是访问器（具有 get/set 方法），要么是数据属性（具有 value），但不能两者都是。

## 区别与联系
* Object.defineProperty:

用于定义或修改对象的属性。
主要用于单个属性的控制，可以设置属性的可写性、可枚举性和可配置性，以及属性的值。
不能直接监听整个对象，需要针对每个属性单独设置。
* Proxy:

用于创建代理对象，允许你拦截并自定义对象上的操作，如读取属性、设置属性、删除属性等。
可以监听整个对象，而不是单个属性。
提供了更灵活和强大的元编程能力，可以实现观察者模式、数据验证等高级功能。
* Reflect:

Reflect 是一个内置对象，提供了一组与对象操作相关的静态方法，用于执行默认操作。
Reflect 方法通常与 Proxy 结合使用，以执行默认行为，或在代理中实现某些操作，以确保一致性和安全性。
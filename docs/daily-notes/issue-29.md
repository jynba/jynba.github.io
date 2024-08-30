Vue3.0的几个亮点：

  :::tip 原文地址
  [vue3主要的亮点功能 | GitHub](https://github.com/jynba/jynba.github.io/issues/29)
  :::
  ○ Performance：性能优化
○ Tree-shaking support：支持摇树优化
○ Composition API：组合API
○ Fragment，Teleport，Suspense：新增的组件
○ Better TypeScript support：更好的TypeScript支持
○ Custom Renderer API：自定义渲染器

### 组合式API
1. 更好地支持typeScript（函数集中统一setup管理、便于类型推断、逻辑组织）
2. 可以按需导入和使用功能，只导入你实际需要的 Composition 函数，更容易进行静态分析，更好地支持treeshaking

### 更强的虚拟DOM渲染

> Vue 3 的虚拟 DOM 渲染性能更高效，具有更好的响应性能。

- 快速diff算法


### 响应式的改进

- 什么是响应式？

- 响应式原理：数据更新时，自动调用依赖该数据的函数

> 背景：vue2的响应式缺陷
> 1.监听数组变化下存在性能问题 
> 2.Object.defineProperty只能劫持对象的属性，并且针对新增的data状态，无法劫持到，只能通过vue的扩展方法$set进行处理

- Vue3的改进

- proxy是ES6新增的特性，proxy作为一个代理对象去代理目标对象，修改Proxy对象进行的绝大部分操作，包括get set in new 都可以在第二个参数handler中配置拦截。 其中也包括了**新增**

1. 使用effect函数做dom的更新操作

2. 使用track函数收集依赖于某个变量的所有effect函数，放在dep的Set集合中（在proxy的get拦截触发时）

4. 执行trigger通知dep里所有的effect执行。  （在proxy的set拦截触发时）

- mutiObj(weakMap) -> obj(MAP) -> prop：dep(Set) -> effect

> weakMap key为对象，当不再存在对键的引用时，键值对将自动被垃圾回收

![image](https://github.com/jynba/jynba.github.io/assets/75623303/260912c2-f73c-4b24-ba8e-4367029abdaf)
[图片来源](https://www.bilibili.com/video/BV1dS4y1y7vd?p=10&vd_source=c876f3bd0c62aa63208a51b6cfb2d8b9)

### 更好的支持treeshaking

- Vue 3 改进了静态分析和模板编译，提供了更小的包体积；且组合式API更适合treeShaking；通过import 和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用

> treeshaking依赖于` ES 中的静态编译，通过 AST 将用不到的函数进行移除，从而减小打包体积


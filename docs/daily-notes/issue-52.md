### 破除误区，明确概念： 

  :::tip 原文地址
  [Vue 与 虚拟DOM 的相爱相杀 | GitHub](https://github.com/jynba/jynba.github.io/issues/52)
  :::
  1. 虚拟DOM并不比真实DOM快 ，而是在数据小幅更新而想要重置innerHTML整个页面时，能够做到必要DOM更新，操作更少的DOM，因此消耗更少。
● innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关
● Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的

2. 虚拟DOM应用上的优势：
● 为函数式的 UI 编程方式打开了大门（相对应的命令式编程 jquery）
● 跨端（此前）

参考youyuxi本人对虚拟DOM的解答（16年版本的，那时候Vue还是数据绑定的形式，后续Vue也用了虚拟DOM）
[网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713/answer/53544875)

文中包含对 Knockout/Vue/Avalon/React 的性能比较 （早期）
● innerHTML:  render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
● Virtual Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)
● 脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
● 依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)


** 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
** 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
** 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

### Vue需不需要虚拟DOM？
**虚拟DOM前置知识**
> 参考[速读《Vue.js 设计与实现》](https://juejin.cn/post/7197980894363156540)、[Vapor mode研究计划：又回到 vue1.0 版本无虚拟DOM的细粒度绑定，是进步还是倒退？](https://juejin.cn/post/7348464590160707636)

![image](https://github.com/jynba/jynba.github.io/assets/75623303/d79a4f57-1254-4cdd-b418-ad52611f0934)
![image](https://github.com/jynba/jynba.github.io/assets/75623303/4b7bfdcf-3808-40b2-8392-1556bd420468)
**注意在vue2/3中 vdom是complies的产物，依赖收集的粒度是在组件**

![image](https://github.com/jynba/jynba.github.io/assets/75623303/370132c3-1fc2-4d88-8f38-8b7ccc3eb276)


* **跨端实现**
**前置知识：**
●🚀 React编译之后是Jsx函数返回的虚拟DOM
●🚀 Vue编译之后是render函数返回的虚拟DOM
●🚀 SolidJS编译之后返回的真实DOM字符串
●🚀 Svelte编译之后返回的是真实DOM片段

具体参考[没了虚拟 DOM 也能跨平台？](https://jishuzhan.net/article/1721784141877350401)
* 跨端的问题主要是其他平台没有innerHTML。  
引用原文：DOM 平台有 innerHTML 这个神器，所以会用字符串的形式去直接生成 DOM，而由于别的平台没有 innerHTML 这种神器，所以也不能够采用字符串，取而代之的是 createElement、setProp 等 API，这些 API 的实现可以取决于你想要跨的平台。
Vue 现在的跨平台 API：crateRenderer 

* 而在 Vue Vapor Mode 中 youyuxi 参考Solid （不是Svelte）

**在编译时(compiler)转为真实DOM，而不是在运行时(runtime)（此前是编译时返回的是虚拟DOM）**

[尤雨溪为什么要推出Vapor Mode](https://juejin.cn/post/7238153003282513957)
* 它可以在给定相同的Vue SFC前提下，与当前基于虚拟DOM的输出相比，Vapor Mode将其编译成性能更高、使用更少内存且需要更少运行时支持代码的JavaScript输出

* 这是可实现的，文中也讲到了几个观点：
1. 未来版本中的Vue会趋向精简化，至少在运行时精简 （减少维护心智）
2. 目前 Vapor Mode 是只支持 Composition API（youyuxi本人很想把 Options API 给干掉，这样可以大大减少他的维护成本，Vue3是兼容国内开发者搞的Options API）
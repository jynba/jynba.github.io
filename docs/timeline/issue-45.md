> 我们知道vue3的template是可以具有多个根元素的组件，原因如下：在Vue 3中，引入了基于标记片段（Fragment）的编译机制。标记片段是一种特殊的数据结构，可以容纳多个子节点，并没有实际的DOM元素。在处理具有多个根元素的组件模板时，Vue 3的编译器会将模板中的每个根级标签（包括自定义组件）都编译为一个单独的标记片段。然后，这些标记片段将作为一个数组，一起创建实际的渲染函数。这样，每个根级标签都能够保留自己的作用域和响应式数据，并且它们可以并行地进行更新。这种基于标记片段的编译机制让Vue 3能够更加灵活地处理组件模板，实现组件模板中的多个根元素。这样，开发者可以在组件模板中直接使用多个根元素，而不需要额外的包裹层级。[参考链接](https://blog.csdn.net/weixin_64974855/article/details/131578093)

  :::tip 原文地址
  [Vue3中的template中可含多个节点，但 transition 包裹时除外 | GitHub](https://github.com/jynba/jynba.github.io/issues/45)
  :::
  
### 发现问题

-  Vue3中的template中可含多个节点 但transition包裹时除外

```js
<template>
  <section>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </section>
</template>
```
![image](https://github.com/jynba/jynba.github.io/assets/75623303/077636dd-0131-4bfc-a242-30109c7e0a44)

### 问题分析

- Transition 中的组件不能呈现动画的非元素根节点。 也就是说，Transition包裹的必须是一个单根的组件。

### 问题解决

- 使用div包裹使得其只有一个根入口即可
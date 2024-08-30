## cjs (commonjs)

  :::tip 原文地址
  [前端打包时的cjs、es、umd文件的区别 | GitHub](https://github.com/jynba/jynba.github.io/issues/11)
  :::
  * commonjs 是 Node 中的模块规范，通过 require 及 exports 进行导入导出 (进一步延伸的话，module.exports 属于 commonjs2)

* 同时，webpack 也对 cjs 模块得以解析，因此 cjs 模块可以运行在 node 环境及 webpack 环境下的，但不能在浏览器中直接使用。但如果你写前端项目在 webpack 中，也可以理解为它在浏览器和 Node 都支持。

## esm (es module)
* esm 是 tc39 对于 ESMAScript 的模块话规范，正因是语言层规范，因此在 Node 及 浏览器中均会支持。

* esm 为静态导入，正因如此，可在编译期进行 Tree Shaking，减少 js 体积。如果需要动态导入，tc39 为动态加载模块定义了 API: import(module) 。可将以下代码粘贴到控制台执行
```
const ms = await import("https://cdn.skypack.dev/ms@latest");
ms.default(1000);
```
esm 是未来的趋势，目前一些 CDN 厂商，前端构建工具均致力于 cjs 模块向 esm 的转化，比如 skypack、 snowpack、vite 等。

### 主要区别

1. cjs浏览器不支持，esm浏览器支持
2. cjs 模块输出的是一个值的拷贝，esm 输出的是值的引用
3. cjs 模块是运行时加载，esm 是编译时加载

## umd
* 一种兼容 cjs 与 amd 的模块，既可以在 node/webpack 环境中被 require 引用，也可以在浏览器中直接用 CDN 被 script.src 引入。


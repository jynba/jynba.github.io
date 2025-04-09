> 在Vite中我经常能看到import.meta，他到底是啥东西呢？是Vite特有的吗？他有哪些方法，又有什么作用呢？

  :::tip 原文地址
  [import.meta是什么？vite中有哪些import.meta特性? | GitHub](https://github.com/jynba/jynba.github.io/issues/74)
  :::
  
参考文档：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import.meta)

### import.meta是什么?
import.meta 是一个宿主环境创建的可扩展的 [null 原型对象](https://github.com/jynba/jynba.github.io/issues/72) (详情见上一篇文章)，其所有属性均可写、可配置、可枚举(没有prototype )。

* `url`
到此模块的完整 URL，包括查询参数和片段标识符（在 ? 和 # 之后）。在浏览器中，它是可获取此脚本的 URL（对外部脚本）或者是包含此脚本的文档的 URL（对内联脚本）。在 Node.js 中，它是文件路径（包括 `file://` 协议部分）。

* `resolve`
将一个模块的标识符解析为相对于当前模块的 URL。

* 简而言之：`import.meta`必须在模块中使用，使用场景：
1. 在 HTML 中的 `<script>` 标签上添加 `type="module"` 属性(浏览器虽然是V8引擎也有ESM，但需要使用 `<script type="module"> `来识别模块)
2. 在`NodeJS`中
3. 在`Vite`中

### Vite中有哪些import.meta特性，有什么作用?

* 在 Vite 中，`import.meta` 除了支持标准的`import.meta.url` 之外，还扩展了很多特性

`import.meta.env`：访问环境变量。

`import.meta.hot`：支持热模块替换（`HMR`）。

`import.meta.resolve`：解析模块路径（`Node.js` 环境中可用）。

`import.meta.url`：获取当前模块的 `URL`(ESM自带)。

`import.meta.glob`：批量动态导入模块。

`import.meta.globEager`：同步批量导入模块。(已经弃用，使用` import.meta.glob('*', { eager: true }) `来代替)
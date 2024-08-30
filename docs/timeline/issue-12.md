## TreeShaking是什么？

  :::tip 原文地址
  [TreeShaking是什么及其原理 | GitHub](https://github.com/jynba/jynba.github.io/issues/12)
  :::
  * Tree Shaking 指基于 ES Module 进行静态分析，通过 AST 将用不到的函数进行移除，从而减小打包体积。
* 当使用语法 import * 时，Tree Shaking 依然生效。
可在 https://rollupjs.org/repl/ 中演示
项目优化：为了减小生产环境体积，我们可以使用一些支持 ES 的 package，比如使用 lodash-es 替代 lodash
可以在  https://npm.devtool.tech  中查看某个库是否支持 Tree Shaking

## AST是什么？
AST 是 Abstract Syntax Tree 的简称，是前端工程化绕不过的一个名词。它涉及到工程化诸多环节的应用，比如:

- 如何将 Typescript 转化为 Javascript (typescript)
- 如何将 SASS/LESS 转化为 CSS (sass/less)
- 如何将 ES6+ 转化为 ES5 (babel)
- 如何将 Javascript 代码进行格式化 (eslint/prettier)
- 如何识别 React 项目中的 JSX (babel)
- GraphQL、MDX、Vue SFC 等等

而在语言转换的过程中，实质上就是对其 AST 的操作，核心步骤就是 AST 三步走

1. Code -> AST (Parse)
2. AST -> AST (Transform)
3. AST -> Code (Generate)

在 AST Explorer（ https://astexplorer.net/ ） 中，列举了诸多语言的解析器(Parser)，及转化器(Transformer)

#### 词法分析 (Lexical Analysis)
词法分析用以将代码转化为 Token 流，维护一个关于 Token 的数组
词法分析后的 Token 流也有诸多应用，如:

- 代码检查，如 eslint 判断是否以分号结尾，判断是否含有分号的 token
- 语法高亮，如 highlight/prism 使之代码高亮
- 模板语法，如 ejs 等模板也离不开

#### 语法分析 (Syntactic Analysis)
语法分析将 Token 流转化为结构化的 AST，方便操作


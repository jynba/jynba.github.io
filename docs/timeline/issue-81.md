> 当你使用第三方包，却发现包中存在一个需要改动的地方影响自己项目的使用，如何不直接修改 node_modules 里的第三方包，而是在自己的项目代码中修复/绕过问题？

  :::tip 原文地址
  [使用patch-package给npm包打补丁 | GitHub](https://github.com/jynba/jynba.github.io/issues/81)
  :::
  
### 解决方法
* 用 [patch-package](https://www.npmjs.com/package/patch-package) 工具修复 node_modules/@xxx/xxxx.js 的详细步骤。这样你不用每次手动改 node_modules，升级依赖后也能自动修复。
* postinstall 是 npm 或 yarn 安装脚本的一部分，它在依赖安装完成后自动执行。通过在 package.json 中添加 postinstall 脚本，我们可以在依赖安装完成后自动执行一些自定义操作

### 操作步骤
```js
// 步骤一：安装 patch-package
npm install patch-package postinstall-postinstall --save-dev

// 步骤二：修改 node_modules 里的对应的文件

// 步骤三：生成 patch (此处我修复的是figma-export库)
npx patch-package @figma-export/cli 
// 这会在你的项目根目录下生成 patches/@figma-export+cli*.patch 文件; .patch文件就是git diff记录描述，原理：patch-package会将当前node_modules下的源码与原始源码进行git diff，并在项目根目录下生成一个patch补丁文件。

// 步骤四：自动应用 patch
// 在 package.json 里加上：
"scripts": {
  "postinstall": "patch-package"
}
// 这样每次 npm install 后都会自动应用补丁。
```

### 总结
* 只需手动改一次 node_modules，然后生成 patch。
* 以后只要有 patch 文件在，npm install 后会自动修复，无需重复手动操作。
* 这种方式不会污染你的源代码仓库，只会多一个 patches/ 目录和一条脚本。


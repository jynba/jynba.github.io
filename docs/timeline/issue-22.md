### git-cz

  :::tip 原文地址
  [前端工程化之代码提交规范（husky、commitizen、cz、lint-staged）配置 | GitHub](https://github.com/jynba/jynba.github.io/issues/22)
  :::
  
```sh
cz
```

- **首先安装 commitizen（不论是方式一或二）** ：`pnpm install -g commitizen`

#### 方式一

- 全局安装

1. 下载

`pnpm install -g cz-conventional-changelog`

2. 创建 ~/.czrc 文件，写入如何内容

`{ "path": "cz-conventional-changelog" }`

3. 这时就可以全局使用 git cz 命令来代替 git commit 命令了

- 项目局部使用

1. 下载 commitizen

`pnpm install --save-dev commitizen`

2. 配置，打开项目的 package.json 文件，配置如下。

```js
{
   "scripts": {
      "commit": "git-cz",
   },
   "config": {
      "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
      }
   }
}
```

3. 这时就可以使用 npm run commit 脚本了

#### 方式二（自定义配置 git commit 注释规范）

- 配置 cz-customizable 作为提交插件
  `pnpm install cz-customizable -D`

* 配置 commitizen,在根目录 package.json 中添加

```js
"scripts" : {
   ...
   "commit": "./node_modules/cz-customizable/standalone.js"
 }
 "config": {
   "commitizen": {
     "path": "node_modules/cz-customizable"
   }
 }
```

- 新建.cz-config.js ，配置想要的代码提交注释规范
  如：

```js
module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat: 新功能',
    },
    {
      value: 'fix',
      name: 'fix: 修复bug',
    },
    {
      value: 'init',
      name: 'init: 初始化',
    },
    {
      value: ':pencil2: docs',
      name: 'docs: 文档变更',
    },
    {
      value: 'style',
      name: 'style: 代码的样式美化',
    },
    {
      value: 'refactor',
      name: 'refactor: 重构',
    },
    {
      value: 'perf',
      name: 'perf: 性能优化',
    },
    {
      value: 'test',
      name: 'test: 测试',
    },
    {
      value: 'revert',
      name: 'revert: 回退',
    },
    {
      value: 'build',
      name: 'build: 打包',
    },
    {
      value: 'chore',
      name: 'chore: 构建/工程依赖/工具',
    },
    {
      value: 'ci',
      name: 'ci: CI related changes',
    },
  ],
  messages: {
    type: '请选择提交类型(必填)',
    customScope: '请输入文件修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    breaking: '列出任何BREAKING CHANGES(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确定提交此说明吗？',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'], // 当提交类型为feat、fix时才有破坏性修改选项
  subjectLimit: 72,
}
```

### husky 配置

> hook 检查提交的注释是否符合规范(commitlint)，将暂存区的代码(lint-staged)运行 lint

- .husky 中

**commit-msg 文件**

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

**pre-commit 文件**

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

> 首次提交时 husky 可能会报错，可通过`git commit --no-verify --allow-empty -m "initial commit"`

[参考](https://juejin.cn/post/7038143752036155428)

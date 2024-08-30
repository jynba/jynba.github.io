## 如何使用GeneralReadMe自动同步issue到readme

  :::tip 原文地址
  [如何使用GeneralReadMe自动同步issue到readme | GitHub](https://github.com/jynba/jynba.github.io/issues/8)
  :::
  1. `https://github.com/settings/tokens`设置一个token，用于push之后由git bot自动为你同步更新readme.md
2. 与github action类似，编写yml脚本，`.github/workflow/generate_readme`文件如下
```
name: Generate Readme

on:
  workflow_dispatch:
  issues:
    types: [opened]

jobs:
  bot:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Set node version to 18
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Run Script
        run: pnpm install && pnpm generate && pnpm prettier

      - name: Push
        uses: github-actions-x/commit@v2.9
        with:
          github-token: ${{ secrets.G_T }}
          push-branch: main
          commit-message: 'Update README.md by Github Actions'
          name: github-actions[bot]
          email: 41898282+github-actions[bot]@users.noreply.github.com
```
编写脚本用于汇总issue到readme，详情可见`Scripts/genaralReadme.js`，其中用到了`octonode`库，可查询github仓库文件信息。

* 首次执行需要在Actions中GeneralReadme手动点击run workflow执行，后续可issue更新可自动执行！
这样，即可实现在issues上记录笔记，然后自动同步到readme文件中，甚至可以同步到博客中！
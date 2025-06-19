### git worktree是什么？

  :::tip 原文地址
  [git worktree是什么？如何用它减少绝大部分的git stash的使用 | GitHub](https://github.com/jynba/jynba.github.io/issues/78)
  :::
  git worktree（工作树）是 Git 的一个功能，它允许你从同一个 Git 仓库中同时检出多个工作目录。主要作用包括：

1. 同时处理多个分支：无需频繁切换分支即可在不同分支上工作

2. 并行开发：可以在不同的工作树中同时进行不同的开发任务

3. 长期运行分支：为长期运行的分支（如预览分支）保持独立的工作区

4. 构建隔离：在不同工作树中并行构建不同版本的项目

5. 避免 stash：减少使用 git stash 来保存临时更改的需要； 使用它切换分支时无需stash本地暂存区内容；而是创建新的工作区切换

### git worktree用法
* 实际应用场景示例
场景：你正在 master 分支上修复一个紧急 bug，同时需要开发一个新功能。

```bash
# 在主工作区修复 bug...

# 为新功能创建工作树
git worktree add feature-xyz (直接创建应该目录文件为feature-xyz，且切分支到feature-xyz)
cd feature-xyz
# 开发新功能...

# 完成后移除工作树
cd ..
git worktree remove ./feature-xyz

# 继续在主工作区修复 bug
```
* 对比下面 git stash 的操作
```bash
# 正在feature分支工作，需要紧急修复master分支
git stash
git checkout master
# 修复问题...
git checkout feature
git stash pop
```
###  总结
* git worktree 更适合长期的多任务开发场景；而 git stash 则更适合临时性的上下文切换
如果不希望git stash 和 git checkout 的操作时，可以考虑用 git worktree
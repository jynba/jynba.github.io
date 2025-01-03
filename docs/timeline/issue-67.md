> git stash除了最常用的  `git stash /  git stash pop`以及 `git stash list` 之外还有以下一些比较实用的命令：

  :::tip 原文地址
  [git stash的一些实用命令 | GitHub](https://github.com/jynba/jynba.github.io/issues/67)
  :::
  
### git stash的一些实用命令

```md
1. `git stash save -u` "xx需求 只开发了一半"`
添加备注； 效果如下：
stash@{2}: On test-master: xx需求 只开发了一半

2. `git stash drop 1`
删除序号为1的stash记录

3. `gtit stash show 1`
展示序号为1的stash记录的改动文件

4. `git stash clear`
清空所有的stash记录
```
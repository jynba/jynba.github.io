### 如何更新git关联远程的分支情况 ### 

  :::tip 原文地址
  [当你远程仓库已经没有分支了，而你本地还显示对应的远程分支时怎么刷新？ | GitHub](https://github.com/jynba/jynba.github.io/issues/5)
  :::
  #### 先查看目前关联的分支的情况
> 使用`git ls-remote --heads origin`查看当前远程关联的分支情况

> 若里面已经没有已删除的分支，则使用`git fetch --all`获取最新

#### 清除本地已删除的远程分支的引用
> 再使用`git remote prune origin`清除本地已删除的远程分支的引用

最后再`git branch --all`，发现已经没有了，大功告成！
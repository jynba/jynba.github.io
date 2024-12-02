### 背景

  :::tip 原文地址
  [【git】当你想对某次commit补充内容，但是不想再次新增commit提交 | GitHub](https://github.com/jynba/jynba.github.io/issues/65)
  :::
  在工作中经常会遇到某次commit的内容有缺漏，这个时候你需要再次进行修改并提交，这样就会导致开发中对相同的需求有多次commit，到进行后期合并分支之类的操作时看起来很费劲，因此我想做到的时，在开发某个需求的时候，相同需求只需要一次提交，这个时候就可以用上以下方法。

### 应用场景
* 场景一：(当你想要补充commit的提交刚好是上一次提交时)
```js
git log //查看上一次提交的前一个commit节点hash值，复制下来
git reset --soft  (上一次提交的前一个hash)  //将提交节点回退，修改进入暂存区
git add .
git commit 重新提交
//若是已经提交到远程，则需要git push -f
```
* 场景二：(当你想要补充commit的提交后已经有很多其他的提交)
```js
git log //查看你需要补充的提交的前一个commit节点hash值，复制下来
git rebase -i  (对应hash)
//将pick修改为edit  (若是希望删除某次提交可以改为drop)
git add .
git  commit --amend //追加提交
git rebase --continue // 重置head
//若是已经提交到远程，则需要git push -f
```

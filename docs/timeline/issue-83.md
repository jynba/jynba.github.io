> 今天看到一个项目，是鼠标悬停到链接即可在popup中浏览链接网页的内容；我想看下内容的样式是否是markdown；但是鼠标移开后样式就消失了，使用了 :hover之后也无法使其展示，一番研究发现是 js 动态控制的。

  :::tip 原文地址
  [JS动态生成的元素如何查看样式 | GitHub](https://github.com/jynba/jynba.github.io/issues/83)
  :::
  
通过询问万能的gpt得知，可以通过断点的方式来暂停页面运行，以此来查看hover样式；尝试了下，css/js控制的都可以用以下方法

### 具体操作
在 DevTools 里冻结页面（Pause script execution）
1. 打开 DevTools → **Sources** 面板。

2. 找到顶部工具栏上的 暂停按钮（Pause script execution, **F8**）。

3. 把鼠标移到能触发 popup 的地方（让它出现）。

4. 立刻按两次 **F8** 暂停脚本执行。

5. 此时页面被“冻结”，popup 不会消失，你可以切到 Elements 面板直接查看和编辑它的样式

<img width="1920" height="911" alt="Image" src="https://github.com/user-attachments/assets/907efbe7-6184-416c-9c06-0dc8f7b9c3f1" />
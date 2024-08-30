### flex: 1 实际上是flex:1 1 0% （ flex-grow: 1; flex-shrink: 1; flex-basis: 0%）

  :::tip 原文地址
  [flex：1意味着什么 | GitHub](https://github.com/jynba/jynba.github.io/issues/31)
  :::
  
1. flex-grow
`flex-grow` 属性：用来设置弹性盒子的放大比例，默认值为 0。当需要将弹性盒子内的空白区域按照一定比例分配到各个项目上时，可以设置 flex-grow 属性。它的取值为一个非负整数，表示项目的放大比例，如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。如果其中一个项目的 flex-grow 属性为 2，剩余项目的 flex-grow 属性都为 1，则前者的项目占据的空间将是后者的两倍。

2. flex-shrink
`flex-shrink` 属性：用来设置弹性盒子的缩小比例，默认值为 1。当弹性盒子内部空间不足以放置所有项目时，可以设置 flex-shrink 属性，来决定项目的缩小比例。它的取值为一个非负整数或者 none，表示项目的缩小比例，如果所有项目的 flex-shrink 属性都为 1，则它们将等分缺少的空间。如果其中一个项目的 flex-shrink 属性为 0，剩余项目的 flex-shrink 属性都为 1，则前者的项目不会被缩小。

3. flex-basis
`flex-basis` 属性：用来设置弹性盒子的基准值，默认值为 auto。当需要指定弹性盒子项的初始大小时，可以设置 flex-basis 属性。它的取值可以是一个长度值（比如 100px），或者是一个百分比（比如 50%），或者是 auto。在计算弹性盒子的剩余空间时，会将 flex-basis 属性的值加入到计算中。如果所有弹性盒子项的 flex-basis 属性都为 auto，则它们的大小将由内容自动决定。

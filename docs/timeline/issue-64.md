>> 最近做了一个表格左右滚动查看列的需求，发现在IOS中滚动的时候会出现一种非常Q弹的效果，查了一下发现，原来在IOS系统中存在回弹机制，也叫橡皮筋效果，即在往边界滑动的时候，可以划出边界，然后回弹回来，那么如何在微信小程序中禁用该效果呢？

  :::tip 原文地址
  [微信小程序中IOS的回弹机制导致页面滑动 | GitHub](https://github.com/jynba/jynba.github.io/issues/64)
  :::
  
### 最终解决方案
在[微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html) `中针对 `scroll-view`存在两个属性，`enhanced`和`bounces`

enhanced | boolean | false | 否 | 启用 scroll-view 增强特性，启用后可通过 ScrollViewContext 操作 scroll-view
bounces | boolean | true | 否 | iOS 下 scroll-view 边界弹性控制 (同时开启 enhanced 属性后生效)

可以进行如下设置：
```js
<scroll-view scroll-y="true" bindscrolltolower="nextPage" enhanced="true" bounces="false"> 
```

* 但在实际开发时我发现这样还是无法解决问题，通过查找资料我发现，需要控制 当`scroll-view`存在数据的时候才渲染，这样才能控制

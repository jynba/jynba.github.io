## 微信小程序不需要账号密码登录，只需要实现打开小程序自动登录；此时的wx.login要放在哪里？

  :::tip 原文地址
  [微信小程序只需要实现打开小程序自动登录；此时的wx.login要放在哪个生命周期？ | GitHub](https://github.com/jynba/jynba.github.io/issues/46)
  :::
  ### 需求：
登录只需要在打开小程序登录一次，且项目中小程序有两个渠道进入，一个是通过搜索进入小程序首页，一个是通过扫码进入套餐页面。
### 问题：
最初的想法是把登录放在onLauch一劳永逸，因为onLauch是最早执行的生命周期，后面发现会有问题**(问题1)**：vue中的onLauch和页面的onLoad异步 ，导致登录如果放onLauch会请求返回结果可能会在页面的onLoad之后，导致页面获取不到openId。
* 有一个简单且笨拙的**解决方法**：将登录放在涉及到小程序进入的onLoad页面就可以了hhhh，但是如果你的代码中onShow也涉及到执行请求，此时又有个onLoad和onShow请求异步的问题 **(问题2)**，onShow中执行的函数请求可能在登录之前完成，导致获取不到openId。
* **最终解决方法**：通过设置有个isFirst的变量，使得第一次进入时onLoad和onShow只执行onLoad不执行onShow，再将onShow中涉及到的函数请求放在onLoad中，这样就可以控制函数请求在登录之后

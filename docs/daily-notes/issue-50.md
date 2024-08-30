> 微信小程序中版本更新不会自动清空旧版本的缓存数据，有时候一些判断逻辑如果使用到了缓存，这就导致在更新后有可能没法及时用上新功能，因此在更新版本时候需要把旧版本的缓存数据清空。

  :::tip 原文地址
  [微信小程序版本更新后，旧缓存导致的线上问题 | GitHub](https://github.com/jynba/jynba.github.io/issues/50)
  :::
  
### 问题：
1. 如何知道版本更新？  答：getAccountInfoSync方法可得到各个dev、trial、release版本的版本号，因此每次需要现缓存现版本版本号
2. 在哪个时机(生命周期)清空缓存？ 答：使用场景应该是在热启动时就判断版本更新，因此在app.vue中的onshow
3. 用什么方法清空缓存？ 答：知道版本更新即可使用clearStorageSync清空就缓存了
### 解决方法：
方法一（不推荐）： 在版本更新的时候,处理清除缓存操作 （利用小程序的 uni.getUpdateManager ）
[参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.getUpdateManager.html)
* 不一定可用，因为静默更新时不触发getUpdateManager；且有时候重启后默认自动清除了缓存

方法二：本地存储版本号, 然后更新后得到最新的版本号,两个版本号不等,然后处理逻辑  **（已使用）**
注：在APP.vue中的onShow生命周期执行，热启动也需要检测版本更新
```js
  // 更新正式环境版本时同步清空小程序缓存
  const pre_version = uni.getStorageSync('version') || '';
  const accountInfo = uni.getAccountInfoSync();
  const cur_version = accountInfo.miniProgram.version;
  if (accountInfo.miniProgram.envVersion === 'release' && pre_version !== cur_version) {
    uni.clearStorageSync();
    uni.setStorageSync("version", cur_version);
  }
```


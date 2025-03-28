> 最近有一个需求是，对于未关注公众号的用户，展示自定义样式的引导关注公众号组件，对于已经关注过的用户，则不展示； 这里面涉及到几个问题：1. 如何使用引导关注公众号的组件？  2. 引导关注公众号组件如何自定义样式？3. 怎么判断用户有没有关注过公众号？

  :::tip 原文地址
  [如何引导关注公众号？冷启动热启动场景、自定义样式？ | GitHub](https://github.com/jynba/jynba.github.io/issues/71)
  :::
  
### 在什么场景下official-account 组件可以展示？
[official-account文档](https://developers.weixin.qq.com/miniprogram/dev/component/official-account.html)、[小程序运行机制](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/operating-mechanism.html)
#### 什么时候冷启动？什么是热启动？
从用户认知的角度看，广义的小程序启动可以分为两种情况，一种是冷启动，一种是热启动。

* 冷启动：如果用户首次打开，或小程序销毁后被用户再次打开，此时小程序需要重新加载启动，即冷启动。
* 热启动：如果用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时小程序并未被销毁，只是从后台状态进入前台状态，这个过程就是热启动。
从小程序生命周期的角度来看，我们一般讲的「启动」专指冷启动，热启动一般被称为后台切前台。

* 从代码层面看，冷启动就是`APP.vue`中的`onLauch`，热启动就是`APP.vue`中的`onShow`
#### official-account 组件在什么场景下可以展示
![Image](https://github.com/user-attachments/assets/f8b91231-6791-49cc-9a8c-502e97284414)

代码示例（未封装代码）：
```js
const coldCode = [1011, 1017, 1025, 1047, 1124];
const hotCode = [1001, 1038, 1041, 1089, 1090, 1104, 1131, 1187];
const isCode = ref(false);
onLaunch(async (e) => {
  console.log('App Launch', e);
  const scene = e?.scene as number;
  if (coldCode.includes(scene)) {
    isCode.value = true;
  } else {
    isCode.value = false;
  }
});
onShow((e) => {
  console.log('App Show', e);
  const scene = e?.scene as number;
  // 注意是符合冷启动场景下的热启动才可展示
  if (isCode.value && (hotCode.includes(scene) || coldCode.includes(scene))) {
    uni.setStorageSync('SHOWOFFICIAL', true);
  } else {
    uni.setStorageSync('SHOWOFFICIAL', false);
  }
});
```

### official-account组件如何自定义样式
* 关键点在于：外层样式包裹住`official-account`，`overflow: hidden;`，设置`opacity: 0;`隐藏它
效果如下，点击可正常调用关注公众号：
![Image](https://github.com/user-attachments/assets/5971f9d4-05cc-45a9-a425-31c7612f0a31)
```vue
<view class="btn">
  关注<official-account class="official-account"></official-account>
</view>
```
```css
      .btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120rpx;
        height: 52rpx;
        line-height: 52rpx;
        padding: 0;
        background: linear-gradient(87deg, #B1F4F9 -2%, #039AF7 81%);
        border-radius: 60rpx;
        overflow: hidden;
        text-align: center;
        color: #fff;
        border: 2rpx solid #FFFFFF;
        font-size: 30rpx;
        font-weight: bold;
        line-height: 30rpx;
        text-align: center;
     
        .official-account {
          position: absolute;
          z-index: 999;
          right: -14px;
          top: -40px;
          opacity: 0;
        }
      }
```

### 怎么判断用户有没有关注过公众号？

上述自定义样式存在一个弊端，official-account组件的查看或者关注无法获取，好在我的需求是未关注才展示official-account，关注了即使还是展示关注也不太影响用户体验。

那么话说回来，进入页面的时候怎么判断是否给用户展示关注公众号？

* 前端无法监听用户是否点击确认关注公众号的时机，只能主动查询后端（[调用公众号接口](https://developers.weixin.qq.com/doc/offiaccount/User_Management/Getting_a_User_List.html)）判断用户是否关注公众号；因此，在不轮询后端的状态下无法确认用户关注公众号的时机；
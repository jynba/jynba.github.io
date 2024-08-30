### 前置知识：

  :::tip 原文地址
  [前端设置强制引导关注公众号 | GitHub](https://github.com/jynba/jynba.github.io/issues/49)
  :::
  1.  在微信小程序中要引导关注公众号有一个组件：official-account组件，该组件只能在特定场景下可以使用，最普遍的使用场景：通过微信扫一扫扫码(非相册)进入小程序才可以使用；详细可见微信开放文档，此外将无法使用该组件。
2. 具体场景：在使用中还区分热启动和冷启动，简单理解：冷启动即第一次打开小程序时，而热启动是从后台切换到小程序。实际使用中需要符合（1）冷启动后的热启动（2）冷启动
3. 对于不符合场景的，可选择使用二维码引导关注公众号

### 代码如下：
```js
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { ref } from 'vue';

const coldCode = [1011, 1017, 1025, 1047, 1124] //冷启动
const hotCode = [1001, 1038, 1041, 1089, 1090, 1104, 1131, 1187] //热启动
const isCode = ref(false)
onLaunch(async (e) => {
  console.log('App Launch', e);
  const scene = e?.scene as number;
  if (coldCode.includes(scene)) {
    isCode.value = true
  } else {
    isCode.value = false
  }
});
onShow((e) => {
  console.log('App Show', e);
  const scene = e?.scene as number;
  if (isCode.value && (hotCode.includes(scene) || coldCode.includes(scene))) {
    uni.setStorageSync('SHOWOFFICIAL', true);//SHOWOFFICIAL表示是否可以使用微信自带的关注公众号组件
  } else {
    uni.setStorageSync('SHOWOFFICIAL', false);
  }
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="scss"></style>

```

### 实际操作：
* 强制引导关注公众号可在返回时判断是否关注，否则继续跳转关注
如何知道用户是否点击组件关注了公众号并执行某些操作？ 答案是无法做到！！！ 
**解决方案**：可通过轮询的方式来访问服务器获取用户是否关注公众号
代码如下：
```js
const startAsk = () => {
  console.log('startAsk');
  // 轮询请求await infoStore.getUserInfo(); 当res.subscribed为true时，中止轮询，跳转
  timer = setInterval(async () => {
    const res = await infoStore.getUserInfo();
    if (res.subscribed) {
      clearInterval(timer);
      uni.navigateBack();
    }
  }, 1000);
}
// 注意要关闭定时器！！
onHide(() => {
  clearInterval(timer);
})
```

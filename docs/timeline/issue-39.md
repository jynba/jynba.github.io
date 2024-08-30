> 在微信小程序原生中的[textarea标签](https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html)有一个属性叫disable-default-padding，它能够消除IOS系统中出现时内边距的样式问题，而在uni-app的uni-easyinput组件中却没有该属性，因此当使用uni-easyinput组件的type=textarea时，样式在IOS中会出现不统一

  :::tip 原文地址
  [uni-app中的uni-easyinput添加当type为textarea时的disable-default-padding属性 | GitHub](https://github.com/jynba/jynba.github.io/issues/39)
  :::
  ![image](https://github.com/jynba/jynba.github.io/assets/75623303/e6c3cd19-0b77-4f94-8b54-22179a9302a8)
## 封装uni-easyinput修复在IOS系统下样式问题
![image](https://github.com/jynba/jynba.github.io/assets/75623303/e88ebb5a-5e2f-468e-950a-7eb9e55daf4b)
通过uni-easyinput的源码我们可用看出它封装了原生textarea标签，但是 在uni-easyinput的文档中却没有暴露该属性，于是我只能自己动手丰衣足食了
![image](https://github.com/jynba/jynba.github.io/assets/75623303/bb605516-07df-4628-98b8-a0a17d8f800e)

- 通过暴露出disableDefaultPadding属性供外界配置，设置了默认值为true，默认就不会出现该问题了
```js
  disableDefaultPadding: {
  type: Boolean,
  default: true
  },
```

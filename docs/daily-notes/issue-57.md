> **背景**： 在微信小程序与PC端开发相比，常常会痛苦于正式版不能看到完整的接口数据，这也导致前端常常背上一些不该背的锅(别问我为什么怎么懂QAQ)，有人可能会说，可以用体验版打开调试后再打开正式版，但是一般情况下正式版会去除打印，不会显示，此外，对于一些偶发性的接口错误，没办法精准地复现和定位。这就需要今天的主角——**实时日志**

  :::tip 原文地址
  [微信小程序we分析中的实时日志 | GitHub](https://github.com/jynba/jynba.github.io/issues/57)
  :::
  ### 什么是实时日志
![image](https://github.com/user-attachments/assets/47c4d966-2b02-4eb3-8220-d9b35f406db9)
一张图看出它的作用，即可以看到代码中在关键节点上报的日志（一般是在接口拦截成功和失败时上报，此外还可在一些下单、支付等重要场景）；记录日志后可以通过时间、openid、关键标识等过滤，查看到详细的实时日志信息
### 实时日志怎么用
* 添加wx.getRealtimeLogManager，可使用addFilterMsg添加标识，`.info` `.error`对日志类型进行上报
```js
// utils/log/index.ts
// 兼容低版本，没有日志方法返回null
const logFun = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
export const wxLogger = () => {
  const loggerInfo = (msg: unknown, filter = 'info') => {
    if (logFun) {
      logFun.addFilterMsg(filter);
      const logMsg = subLogSize(msg);
      logFun.info(logMsg);
    }
  };

  const loggerError = (msg: unknown, filter = 'error') => {
    if (logFun) {
      logFun.addFilterMsg(filter);
      const logMsg = subLogSize(msg);
      logFun.error(logMsg);
    }
  };

  // 日志字符串超过5kb在小程序日志后台不显示,当超过5000时，自动截取
  const subLogSize = (msg: unknown) => {
    const tempStr = JSON.stringify(msg);
    if (tempStr.length > 5000) {
      return tempStr.substring(0, 4500);
    }
    return tempStr;
  };

  return {
    loggerInfo,
    loggerError
  };
};

//request页面
loggerInfo({ ...data, ...config }, LogFilterEnum.ResponseSuccess);
loggerError(response, LogFilterEnum.ResponseError);
```

### 注意
* 对于还在正式版使用的小程序，实时日志会记录体验版的日志，而在发布正式版之后，会自动记录正式版而不记录体验版日志
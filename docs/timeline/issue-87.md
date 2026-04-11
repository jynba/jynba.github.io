# 🛠️ 一次与 disable-devtool 的“对抗”记录

  :::tip 原文地址
  [🚀 一行代码搞定禁用web开发者工具：disable-devtool | GitHub](https://github.com/jynba/jynba.github.io/issues/87)
  :::
  
最近在调试一个网页时，遇到了比较“狠”的前端反调试机制。  
不仅禁止 F12、右键，还会在调试时**直接关闭页面或强制跳转 404**。

这篇文章记录我意外了解到这个 npm 库 [disable-devtool](https://github.com/theajack/disable-devtool) ，从“完全打不开 DevTools”到“定位并干掉跳转逻辑”的完整过程。

---

## 🚨 一、问题现象

一开始的情况是这样的：

- 打开 DevTools → 页面直接崩掉 / 白屏  
- 点击 Resume（继续执行） → 页面直接关闭  
- 禁用断点后 → 自动跳转：https://theajack.github.io/disable-devtool/404.html


👉 很明显，这是一个典型的**反调试保护**

---

## 🧠 二、初步判断：使用了 disable-devtool

这个库的特点：

- 检测 DevTools 是否打开
- 检测 debugger 停顿
- 检测窗口尺寸变化
- 触发：
  - 页面跳转
  - window.close()
  - 自动关闭页面


## 🧨 三、不断尝试

### ❌ 禁用断点

ctrl+F8
结果：
👉 自动关闭页面 ❌


### ❌ 设置控制台绕过 close()

window.close = () => {};
结果：
👉 页面直接跳转 404 ❌

## 🔍 四、关键突破：定位跳转代码
在 DevTools → Sources 中全局搜索：
disable-devtool/404

最终定位到核心代码：
```javascript
setTimeout(function() {
  window.location.href = f.timeOutUrl || "https://theajack.github.io/disable-devtool/404.html?h=".concat(encodeURIComponent(location.host))
}, 500)
```

🧱 四、最终稳定方案
在 Console 一次性执行：
```
// 防止页面关闭
window.close = () => {};
// 禁止跳转
window.open = () => {};
location.assign = () => {};
location.replace = () => {};
// 禁止延迟跳转
window.setTimeout = () => {};
```
👉 基本可以“免疫”这类反调试

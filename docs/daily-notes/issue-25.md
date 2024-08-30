目前浏览器大多是 60Hz（60帧/s），每一帧耗时也就是在 16.6ms 左右。那么在这一帧的（16.6ms） 过程中浏览器又干了些什么呢？

  :::tip 原文地址
  [浏览器一帧都会干些什么？ | GitHub](https://github.com/jynba/jynba.github.io/issues/25)
  :::
  
![test2](https://github.com/jynba/jynba.github.io/assets/75623303/d4e11f22-5504-4685-87be-e810b70f095a)

一帧16.6ms
【1】接受输入事件
【2】执行事件回调
【3】开始一帧
【4】执行 RAF (RequestAnimationFrame)
【5】页面布局，样式计算
【6】绘制渲染
【7】执行 RIC (RequestIdelCallback)

第七步的 RIC 事件不是每一帧结束都会执行，只有在一帧的 16.6ms 中做完了前面 6 件事儿且还有剩余时间，才会执行。如果一帧执行结束后还有时间执行 RIC 事件，那么下一帧需要在事件执行结束才能继续渲染，所以 RIC 执行不要超过 30ms，如果长时间不将控制权交还给浏览器，会影响下一帧的渲染，导致页面出现卡顿和事件响应不及时。
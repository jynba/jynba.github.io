> 今天在群里看到有人问这个问题，想起来自己之前也经常会遇到这个问题：console.log打印对象，结果发现对象展开的内容是和默认展示的不一样

  :::tip 原文地址
  [为什么console.log打印的对象(数组)和展开的内容不对应？ | GitHub](https://github.com/jynba/jynba.github.io/issues/40)
  :::
  
-  **问题：**

![image](https://github.com/jynba/jynba.github.io/assets/75623303/045f1b5e-5b05-4b83-82d8-a69793feb888)
由上图可以发现，在我们打印后再去对打印的对象进行修改，此时打印的东西**展开**后也会随之更改
这是为什么呢？

- **原因：**
console.log默认显示的内容如果是对象的话，只是显示对象的要用地址，在展开是会循着地址找到对象，若是我们console.log后又修改了对象，我们看到的东西也会变成修改后的内容

- **解决方案：**
可以通过 JSON.stringify将对象用字段串的形式打印出来


  :::tip 原文地址
  [服务器上配置校验文件，最简单方便的方法（nginx配置返回content） | GitHub](https://github.com/jynba/jynba.github.io/issues/76)
  :::
  ### 服务器上配置校验文件

* 小程序需要新增业务域名、普通二维码跳转等时，经常会提示需要在域名上添加校验文件，有一种无需上传校验文件的方式，因为校验文件通常是一串字符串，我们可以直接返回Content的方式，直接配置代理
下图中我是在[nginx proxy manager](https://github.com/jynba/jynba.github.io/issues/62)中配置，极其方便。（**另外，亲测可知：校验完删除了也不会影响已经通过的域名**）
![Image](https://github.com/user-attachments/assets/aefb3819-bad0-425c-a148-55d08b192891)

```bash
location = /xxxx.txt {
    add_header Content-Type text/plain;
    return 200 "d72xxxxxxxxxxxxx42";
}
```
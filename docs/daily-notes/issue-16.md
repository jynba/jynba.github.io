### proxy_pass的用法 

  :::tip 原文地址
  [nginx 反向代理和负载均衡 | GitHub](https://github.com/jynba/jynba.github.io/issues/16)
  :::
  > 案例1代理到哔哩哔哩
```
location / {
   root   html;
   index  index.html index.htm;
   proxy_pass http://bilibili.com;
}
```
这样访问/就会被转到哔哩哔哩

### nginx解决history模式线上路径问题

> Vue是属于单页应用（single-page application）
> 而SPA是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，前面我们也看到了，不管我们应用有多少页面，构建物都只会产出一个index.html

history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。
浏览器在刷新的时候，会按照路径发送真实的资源请求，如果这个路径是前端通过 history API 设置的 URL，那么在服务端往往不存在这个资源，于是就返回 404 了。
因此在线上部署基于 history API 的单页面应用的时候，一定要后端配合支持才行，否则会出现大量的 404。

解决方案
` try_files $uri $uri/ /index.html;`
如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配

[参考](https://juejin.cn/post/6861586972696444942)

nginx中常见的变量：

$uri 当前请求的 URI，但不含“？”后的参数
$args 当前请求的参数，即“？”后的宇符串
$arg_xxx 当前请求里的某个参数，“arg ”后是参数的名字
$http_xxx 当前请求里的 xxx 头部对应的值
$sent_http_xxx 返回给客户端的响应头部对应的值
$remote_addr 客户端IP 地址。
$http_cookie 获取cookie值
$cookie_xxx 当前请求的cookie xxx对应的值
$request_uri 浏览器发起的不作任何修改的请求的url中的path 如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111
$uri 指当前的请求URI，不包括任何参数，反映任何内部重定向或index模块所做的修改
$request_method 请求方法

### 反向代理
nginx 配置文件
```
location /api/ {
    proxy_pass http://localhost:9000/;
}
```
截取到/api/ 将会转发到 http://localhost:9000/

- proxy_set_header

该指令可以更改Nginx服务器接收到的客户端请求的请求头信息，然后将新的请求头发送给代理的服务器

- proxy_set_header X-Real-IP $remote_addr;

- proxy_set_header X-Real-Port $remote_port;

- proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

三个header分别表示：
X-Real-IP 客户端或上一级代理ip

X-Real-Port 客户端或上一级端口

X-Forwarded-For 包含了客户端和各级代理ip的完整ip链路
其中X-Real-IP是必需的，后两项选填。当只存在一级nginx代理的时候X-Real-IP和X-Forwarded-For是一致的，而当存在多级代理的时候，X-Forwarded-For 就变成了如下形式 

$remote_addr是前一节点的IP，并不一定是用户的真实IP。
[参考](https://blog.csdn.net/qq1195566313/article/details/124486764)

### 负载均衡
* upstream
upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。
```
    upstream  node {
        server 127.0.0.1:9001;
        server 127.0.0.1:9002;
        server 127.0.0.1:9003;
    }
```
```
  location / {
      proxy_pass http://node;
  }
```

1. 默认状态是按照轮询的方式去做负载的

使用express 启动三个服务 分别是9001 9002 9003
```
const express = require('express')
var num = 1
const app = express()
 
app.get('/list',(req,res)=>{
    res.json({
        code:200,
        message:"Nginx 负载均衡9001"
    })
    console.log("Nginx 负载均衡9001",num)
   num++
})
//------------------------------9001
app.listen(9001,()=>{
    console.log('9001 success')
})
 
//-----------------------------------
const express = require('express')
var num = 1
const app = express()
 
app.get('/list',(req,res)=>{
    res.json({
        code:200,
        message:"Nginx 负载均衡9002"
    })
    console.log("Nginx 负载均衡9002",num)
    num++
})
//------------------------------9002
app.listen(9002,()=>{
    console.log('9002 success')
})
 
//--------------------------------
 
const express = require('express')
var num = 1
const app = express()
 
app.get('/list',(req,res)=>{
    
    res.json({
        code:200,
        message:"Nginx 负载均衡9003"
    })
    console.log("Nginx 负载均衡9003",num)
    num++
})
//------------------------------9003
app.listen(9003,()=>{
    console.log('9003 success')
})
```

2. 权重weight

    upstream  node {
        server 127.0.0.1:9001 weight=3;
        server 127.0.0.1:9002 weight=2;
        server 127.0.0.1:9003 weight=1;
    }
权重越大服务器承载的并发就越高

压测100 更多的并发打到了9001
3. fail_timeout backup
fail_timeout是故障等待超时时间

backup是备用服务器参数，可以为一个upstream设置一个backup的server，在生产server全部都出问题之后，可以自动切换到备用server上，为回复服务争取时间
```
    upstream  node {
 
        server 127.0.0.1:9001 fail_timeout=60;
 
        server 127.0.0.1:9002 fail_timeout=20;
 
        server 127.0.0.1:9003 backup;
 
    }
```
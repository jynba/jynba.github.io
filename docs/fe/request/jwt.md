### 背景

>  背景：HTTP是无状态的协议，什么是无状态呢？就是对于事务处理是没有记忆能力的，每次客户端和服务端会话完成时，服务端不会保存任何会话信息。那这就意味着每次请求都是独立的，服务器不知道客户端的历史请求记录，它没法分辨这一次的请求和上一次的请求的发送者是同一个人吗？

因此在这种无状态下，为了让服务器与浏览器进行会话的跟踪，就必须主动维护一个状态，告知服务端前后两个请求是否来自同一请求者。Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性。

* session的流程：

1、用户第一次请求服务器时，服务器会为这个请求开辟一块内存空间，用来创建session对象。

2、同时会生成一个sessionId，它是session对象的唯一标识，会在响应头中设置 Set-Cookie：JSESSIONID=xxx，然后发送给客户端

3.客户端收到服务器返回的sessionID后，就会把该信息存到Cookie中

4、接下来客户端再次向同个网站发起请求，比如登录之后点了购物车，那么请求头就会带上该Cookie信息，其中就包含了sessionid。

5、然后服务端读取请求头中的Cookie信息，就获取sessionId，因为sessionId是session对象的唯一标识，如果能根据sessionID找到对应的session信息，那么就说明用户已经登录过了，可以执行后面的操作。



* 简单了解cookie和session：

cookie是一种存储方式，session是一种应用方案。

通过这个简单的流程，我们知道Cookie是存储在客户端的，它是在服务器发送到用户浏览器并保存在本地的一小块数据，它会在下次向同一服务器请求时被携带发送给服务器。

session是存储在服务端的，是记录服务器和客户端会话状态的机制。sessionId会被存储到客户端的cookie中

sessionId是连接Cookie和session的桥梁



* session机制存在的缺点：

如服务端是集群的，有多台服务器，第一次请求是A服务器处理的，所以Session对象是在A服务器中。那第二次请求时，由于负载均衡，A服务器比较忙，所以请求由B服务器处理，但是B服务器并没有那个session对象，那他就匹配不了sessionid了，这时候session就失效了。



### **什么是JWT？**（Json Web Token，Json 令牌）

原理：登陆时，服务器收到客户端传来的用户名和密码，认证后，生成一个JSON对象，发回给用户。用户怎么存？

1）可以储存在 Cookie 里面，

2）也可以储存在 localStorage。不会自动在请求中携带令牌，需要通过代码实现。不过这样会受到XSS攻击。另外如果用户不主动清除JWT令牌，它将永远存储到localStorage。

前两种方法可以实现免密登录，记住密码等功能，

3）也可以存储在sessionStorage，关闭页面或浏览器会被清除。

Cookie和localStorage的区别：

​	1）存储大小：Cookie存储信息最多4KB，localStorage可至5MB

​	2）生命周期：Cookie可以设置过期时间，在过期前都有效；localStorage可以一直存在，直到被手动清除或被网站清理。

​	3）如何发送：Cookie会通过HTTP请求的Header自动发送给服务器，后者必须通过代码才能发送给服务器

​	4）安全性：cookie容易遭受跨站点脚本攻击，而本地存储安全性相对较高。

​	5）域名限制：cookie和本地存储都遵循同源策略，但注意由于cookie的Domain 标识指定了哪些主机可以接受 Cookie。如果不指定，默认为当前主机(不包含子域名）。如果指定了Domain，则一般包含子域名。而localstorage需要在a.baidu.com里嵌入一个src为b.baidu.com的iframe，，此时这个iframe里可以调用a.baidu.com的localstorage。用postMessage方法实现页面与iframe之间的通信。

参考资料：

[cookie和本地存储的深度理解](https://juejin.cn/post/7233765235554877495)

[前端localstorage+cookie 解决同主域名跨域传值](https://juejin.cn/post/6844904187273150471)

[localStorage跨域存储，实战篇](https://juejin.cn/post/6844904112165748743)



>  在三种方式之中，Cookie 提供了一堆安全选项，例如`SameSite`、`HttpOnly`等。

>  疑问：在session-cookie机制中，由于放在cookie里传给服务端，可能造成csrf攻击。但如果把cookie的samesite属性设置为strict，这样可以避免csrf攻击吗？

用户以后每次请求，都要带上这个JSON对象。怎么带？

1)放在HTTP请求头中的Authorization，即`Authorization: Bearer <token>`

2)POST请求可以放在请求体中

3)放在 Cookie 里面自动发送，但是这样不能跨域，而且可能造成CSRF攻击，如何避免=>设置Cookie的SameSite属性为Strict，跨站时就不会发送Cookie。即只有当前网页的 URL 与请求目标一致，才会带上 Cookie。

服务器完全只靠这个对象认定用户身份。（服务器无状态化，扩展性比较好）

为了防止用户篡改数据，服务器在生成这个JSON对象时，会加上签名。



### **JWT结构**

Header（头部）.Payload（负载）.Signature（签名）

三部分用.隔开

Header：

是一个JSON对象，提供JWT的元数据，**含签名的算法**

```javascript
{
  "alg": "HS256",//签名的算法
  "typ": "JWT"//token的类型
}
```

**将Header使用Base64URL算法转成字符串**

Payload：

是一个JSON对象，**用来存放实际需要传递的数据**

有七个**官方字段**可选，如**过期时间exp**、生效时间nbf、签发时间iat等

可定义私有片段

注：JWT默认不加密，因为只是使用Base64URL算法转成字符串，任何人都可以读到，不要把秘密数据放在Payload

**将Payload使用Base64URL算法转成字符串**

Signature：

**指定一个密钥secret（只有服务器知道），不能泄露给用户。**

使用Header里面的签名算法，按下面的公式产生签名，防止篡改数据。

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

Base64URL与Base64的区别：

由于JWT作为一个token，有时会放到URL里拼接。但是Base64有三个字符，在URL中有特殊含义，`=`，`+`，`/`。Base64URL中，`=`省略，`+`变`-`，`/`变`_`。



JWT的特点：

1）JWT默认不加密，不加密情况下，不能把秘密写入JWT的payload中。

2）JWT也可以加密，生成原始Token后，再用服务器的密钥加密一次。

3）JWT含认证信息，为了减少盗用，JWT有效期应该设置比较短；使用HTTPS协议传输。



优点：

1）节省服务器空间，因为不需要维护登陆表（在缓存或在数据库），也就是很多session对象。

2）当有多台服务器时，不需要考虑在服务器间共享session，只要服务器们都有相同的密钥secret，就可以解析JWT合不合法。

3）采用json格式，简单明白。

4）支持各种各样的客户端，可以不用cookie（一些移动端不支持cookie）

缺点：

1）一旦JWT签发了，到期之前都始终有效，因为服务器不保存session状态，无法在使用过程中废除某个token或者修改权限。

2）时间换空间，每次请求都要把数据带来带去，而且服务端需要用secret校验签名（把header和payload用secret计算后，与signature比较是否相等），需要增加点处理时间。



使用：`单点登录`是当今广泛使用 JWT 的一项功能，因为它的开销很小。



参考资料：

[JSON Web Token 入门教程](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

[美团前端安全系列之二：如何防止CSRF攻击？](https://juejin.cn/post/6844903689702866952?searchId=2023091520074862B9BFB5FD060CF8E82D)





前端的token可以存在vuex，localStorage，cookie推荐localStorage，cookie，可以实现免密登录，记住密码等功能，后端的话存在Redis里面，每次请求的时候吧token放在请求头里，后端接收到token之后在Redis里进行查询（为什么不存在mysql里面，因为Redis是基于内存存储的，存储的是k-v格式的数据，操作数据比mysql快，而且还能设置token的过期时间，有了token就不用频繁的去执行sql语句去判断用户角色了）

为什么现在都用token而不用session了，因为通常session是存储在内存中的，每个用户通过认证之后都会将session数据保存在服务器的内存中，而当用户量增大时，服务器的压力增大，再一个session是基于cookie进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。然后现在项目基本都是微服务，如果搭建了多个服务器，虽然每个服务器都执行的是同样的业务逻辑，但是session数据是保存在内存中的（不是共享的），用户第一次访问的是服务器1，当用户再次请求时可能访问的是另外一台服务器2，服务器2获取不到session信息，就判定用户没有登陆过。
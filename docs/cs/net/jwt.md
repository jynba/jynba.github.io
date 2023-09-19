# 什么是 JWT?

JSON Web Token (JWT)是一个开放标准(RFC 7519)，它定义了一种紧凑的、自包含的方式，用于作为 JSON 对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。

### 什么时候你应该用 JSON Web Token?

下列场景中使用 JSON Web Token 是很有用的：

- Authorization (授权) : 这是使用 JWT 的最常见场景。一旦用户登录，后续每个请求都将包含 JWT，允许用户访问该令牌允许的路由、服务和资源。**单点登录**是现在广泛使用的 JWT 的一个特性，因为它的开销很小，并且可以轻松地跨域使用。(参考学校管理系统)
- Information Exchange (信息交换) : 对于安全的在各方之间传输信息而言，JSON Web Tokens 无疑是一种很好的方式。因为 JWT 可以被签名，例如，用公钥/私钥对，你可以确定发送人就是它们所说的那个人。另外，由于签名是使用头和有效负载计算的，您还可以验证内容没有被篡改。

### JSON Web Token 的结构是什么样的

JSON Web Token 由三部分组成，它们之间用圆点(.)连接。这三部分分别是：

- Header
  - Header header 典型的由两部分组成：token 的类型（“JWT”）和算法名称（比如：HMAC SHA256 或者 RSA 等等）。
- Payload
  - JWT 的第二部分是 payload，它包含声明（要求）。声明是关于实体(通常是用户)和其他数据的声明。声明有三种类型: registered, public 和 private。
- Signature
  - 签名是用于验证消息在传递过程中有没有被更改，并且，对于使用私钥签名的 token，它还可以验证 JWT 的发送方是否为它所称的发送方。

### JSON Web Tokens 是如何工作的

如果 token 是在授权头（Authorization header）中发送的，那么跨源资源共享(CORS)将不会成为问题，因为它不使用 cookie

### 基于 Token 的身份认证 与 基于服务器的身份认证

HTTP 协议是无状态的，也就是说，如果我们已经认证了一个用户，那么他下一次请求的时候，服务器不知道我是谁，我们必须再次认证

- 传统的做法是将已经认证过的用户信息存储在服务器上，比如 Session。用户下次请求的时候带着 Session ID，然后服务器以此检查用户是否认证过

  这种基于服务器的身份认证方式存在一些问题：

  - Sessions : 每次用户认证通过以后，服务器需要创建一条记录保存用户信息，通常是在内存中，随着认证通过的用户越来越多，服务器的在这里的开销就会越来越大。
  - Scalability : 由于 Session 是在内存中的，这就带来一些扩展性的问题。
  - CORS : 当我们想要扩展我们的应用，让我们的数据被多个移动设备使用时，我们必须考虑跨资源共享问题。当使用 AJAX 调用从另一个域名下获取资源时，我们可能会遇到禁止请求的问题。
  - CSRF : 用户很容易受到 CSRF 攻击

- Session 是在服务器端的，而 JWT 是在客户端的。

  基于 Token 的身份认证是如何工作的 基于 Token 的身份认证是无状态的，服务器或者 Session 中不会存储任何用户信息。

  没有会话信息意味着应用程序可以根据需要扩展和添加更多的机器，而不必担心用户登录的位置。

  虽然这一实现可能会有所不同，但其主要流程如下：

  -用户携带用户名和密码请求访问 -服务器校验用户凭据 -应用提供一个 token 给客户端 -客户端存储 token，并且在随后的每一次请求中都带着它 -服务器校验 token 并返回数据

- 用 Token 的好处 - 无状态和可扩展性：Tokens 存储在客户端。完全无状态，可扩展。我们的负载均衡器可以将用户传递到任意服务器，因为在任何地方都没有状态或会话信息。 - 安全：Token 不是 Cookie
  - 有助于防止 CSRF 攻击。即使在你的实现中将 token 存储到客户端的 Cookie 中，这个 Cookie 也只是一种存储机制，而非身份认证机制。
  - token 在一段时间以后会过期，这个时候用户需要重新登录。

### JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是**放在 HTTP 请求的头信息`Authorization`字段里面**。

- JWT 的**最大缺点**是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

## cookie 和 token 的区别

**Cookie：**

1. **存储位置：** Cookie 是存储在客户端浏览器中的小文本文件。每当浏览器发送请求到同一域名下的服务器时，它会自动将相应的 Cookie 信息附加到请求头中。
2. **大小限制：** 单个 Cookie 的大小通常有限制，通常在几 KB 到几十 KB 之间，不同浏览器可能有不同的限制。
3. **跨域限制：** Cookie 默认情况下只能在设置它的域名下使用，跨域请求不会自动携带 Cookie。
4. **安全性：** Cookie 可以设置为 HttpOnly，防止被 JavaScript 访问，提高安全性。设置 SameSite 来防止 CSRF 攻击

**Token：**

1. **存储位置：** Token 是存储在客户端（通常是内存中）的令牌，通常以字符串形式传递在请求的头部中，或者通过查询参数等方式传递给服务器。
2. **大小限制：** Token 的大小没有明确限制，但过大的 Token 可能会导致网络传输效率下降。
3. **跨域限制：** Token 可以在跨域请求中手动传递，通常通过设置请求头的方式传递。
4. **安全性：** Token 可以采用加密算法来保证安全性，但它可能需要开发者自己来实现。Token 也可以设置过期时间，有时会自动刷新，增加安全性。

## 具体实现

前端代码：

```

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div>
        <div>
            <span>账号</span> <input id="name" type="text">
        </div>
        <div>
            <span>密码</span> <input id="password" type="password">
        </div>
        <button id="btn">登录</button>
    </div>

    <script>
        const btn = document.querySelector('#btn')
        const name = document.querySelector('#name')
        const password = document.querySelector('#password')

        btn.onclick = () => {
            fetch('http://localhost:3000/api/login', {
                body: JSON.stringify({
                    name: name.value,
                    password: password.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            }).then(res => res.json()).then(res => {
                localStorage.setItem('token', res.token)
                location.href = './list.html'
            })
        }
    </script>
</body>

</html>


<!-- 具体调用接口 -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List</title>
</head>

<body>
    <script>
        console.log(localStorage.getItem('token'))
        fetch('http://localhost:3000/api/list', {
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json()).then(res => {
            console.log(res)
        })
    </script>
</body>

</html>
```

后端代码：

```
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const app = express();
const secretKey = 'jynba' //加盐

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

let user = { name: 'admin', password: '123456', id: 1 } //模拟用户信息

app.post('/api/login', (req, res) => {
    console.log(req.body)
    if (req.body.name == user.name && req.body.password == user.password) {
        res.json({
            message: '登录成功',
            code: 200,
            token: jwt.sign({ id: user.id }, secretKey, { expiresIn: 60 * 60 * 24 }) //生成token
        })
    } else {
        res.json({
            message: '登录失败',
            code: 400
        })
    }
})


app.get('/api/list', (req, res) => {
    console.log(req.headers.authorization)
    jwt.verify(req.headers.authorization as string, secretKey, (err, data) => { //验证token
        if (err) {
            res.json({
                message: 'token失效',
                code: 403
            })
        } else {
            res.json({
                message: '获取列表成功',
                code: 200,
                data: [
                    { name: '张三', age: 18 },
                    { name: '李四', age: 20 },
                ]
            })
        }
    })
})

app.listen(3000, () => {
    console.log('server is running 3000');
})
```

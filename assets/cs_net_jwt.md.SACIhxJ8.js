import{_ as n,c as s,o as a,a5 as p}from"./chunks/framework.CByBVyi2.js";const g=JSON.parse('{"title":"什么是 JWT?","description":"","frontmatter":{},"headers":[],"relativePath":"cs/net/jwt.md","filePath":"cs/net/jwt.md","lastUpdated":1735866062000}'),e={name:"cs/net/jwt.md"},l=p(`<h1 id="什么是-jwt" tabindex="-1">什么是 JWT? <a class="header-anchor" href="#什么是-jwt" aria-label="Permalink to &quot;什么是 JWT?&quot;">​</a></h1><p>JSON Web Token (JWT)是一个开放标准(RFC 7519)，它定义了一种紧凑的、自包含的方式，用于作为 JSON 对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。</p><h3 id="什么时候你应该用-json-web-token" tabindex="-1">什么时候你应该用 JSON Web Token? <a class="header-anchor" href="#什么时候你应该用-json-web-token" aria-label="Permalink to &quot;什么时候你应该用 JSON Web Token?&quot;">​</a></h3><p>下列场景中使用 JSON Web Token 是很有用的：</p><ul><li>Authorization (授权) : 这是使用 JWT 的最常见场景。一旦用户登录，后续每个请求都将包含 JWT，允许用户访问该令牌允许的路由、服务和资源。<strong>单点登录</strong>是现在广泛使用的 JWT 的一个特性，因为它的开销很小，并且可以轻松地跨域使用。(参考学校管理系统)</li><li>Information Exchange (信息交换) : 对于安全的在各方之间传输信息而言，JSON Web Tokens 无疑是一种很好的方式。因为 JWT 可以被签名，例如，用公钥/私钥对，你可以确定发送人就是它们所说的那个人。另外，由于签名是使用头和有效负载计算的，您还可以验证内容没有被篡改。</li></ul><h3 id="json-web-token-的结构是什么样的" tabindex="-1">JSON Web Token 的结构是什么样的 <a class="header-anchor" href="#json-web-token-的结构是什么样的" aria-label="Permalink to &quot;JSON Web Token 的结构是什么样的&quot;">​</a></h3><p>JSON Web Token 由三部分组成，它们之间用圆点(.)连接。这三部分分别是：</p><ul><li>Header <ul><li>Header header 典型的由两部分组成：token 的类型（“JWT”）和算法名称（比如：HMAC SHA256 或者 RSA 等等）。</li></ul></li><li>Payload <ul><li>JWT 的第二部分是 payload，它包含声明（要求）。声明是关于实体(通常是用户)和其他数据的声明。声明有三种类型: registered, public 和 private。</li></ul></li><li>Signature <ul><li>签名是用于验证消息在传递过程中有没有被更改，并且，对于使用私钥签名的 token，它还可以验证 JWT 的发送方是否为它所称的发送方。</li></ul></li></ul><h3 id="json-web-tokens-是如何工作的" tabindex="-1">JSON Web Tokens 是如何工作的 <a class="header-anchor" href="#json-web-tokens-是如何工作的" aria-label="Permalink to &quot;JSON Web Tokens 是如何工作的&quot;">​</a></h3><p>如果 token 是在授权头（Authorization header）中发送的，那么跨源资源共享(CORS)将不会成为问题，因为它不使用 cookie</p><h3 id="基于-token-的身份认证-与-基于服务器的身份认证" tabindex="-1">基于 Token 的身份认证 与 基于服务器的身份认证 <a class="header-anchor" href="#基于-token-的身份认证-与-基于服务器的身份认证" aria-label="Permalink to &quot;基于 Token 的身份认证 与 基于服务器的身份认证&quot;">​</a></h3><p>HTTP 协议是无状态的，也就是说，如果我们已经认证了一个用户，那么他下一次请求的时候，服务器不知道我是谁，我们必须再次认证</p><ul><li><p>传统的做法是将已经认证过的用户信息存储在服务器上，比如 Session。用户下次请求的时候带着 Session ID，然后服务器以此检查用户是否认证过</p><p>这种基于服务器的身份认证方式存在一些问题：</p><ul><li>Sessions : 每次用户认证通过以后，服务器需要创建一条记录保存用户信息，通常是在内存中，随着认证通过的用户越来越多，服务器的在这里的开销就会越来越大。</li><li>Scalability : 由于 Session 是在内存中的，这就带来一些扩展性的问题。</li><li>CORS : 当我们想要扩展我们的应用，让我们的数据被多个移动设备使用时，我们必须考虑跨资源共享问题。当使用 AJAX 调用从另一个域名下获取资源时，我们可能会遇到禁止请求的问题。</li><li>CSRF : 用户很容易受到 CSRF 攻击</li></ul></li><li><p>Session 是在服务器端的，而 JWT 是在客户端的。</p><p>基于 Token 的身份认证是如何工作的 基于 Token 的身份认证是无状态的，服务器或者 Session 中不会存储任何用户信息。</p><p>没有会话信息意味着应用程序可以根据需要扩展和添加更多的机器，而不必担心用户登录的位置。</p><p>虽然这一实现可能会有所不同，但其主要流程如下：</p><p>-用户携带用户名和密码请求访问 -服务器校验用户凭据 -应用提供一个 token 给客户端 -客户端存储 token，并且在随后的每一次请求中都带着它 -服务器校验 token 并返回数据</p></li><li><p>用 Token 的好处 - 无状态和可扩展性：Tokens 存储在客户端。完全无状态，可扩展。我们的负载均衡器可以将用户传递到任意服务器，因为在任何地方都没有状态或会话信息。 - 安全：Token 不是 Cookie</p><ul><li>有助于防止 CSRF 攻击。即使在你的实现中将 token 存储到客户端的 Cookie 中，这个 Cookie 也只是一种存储机制，而非身份认证机制。</li><li>token 在一段时间以后会过期，这个时候用户需要重新登录。</li></ul></li></ul><h3 id="jwt-的使用方式" tabindex="-1">JWT 的使用方式 <a class="header-anchor" href="#jwt-的使用方式" aria-label="Permalink to &quot;JWT 的使用方式&quot;">​</a></h3><p>客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。</p><p>此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是<strong>放在 HTTP 请求的头信息<code>Authorization</code>字段里面</strong>。</p><ul><li>JWT 的<strong>最大缺点</strong>是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。</li></ul><h2 id="cookie-和-token-的区别" tabindex="-1">cookie 和 token 的区别 <a class="header-anchor" href="#cookie-和-token-的区别" aria-label="Permalink to &quot;cookie 和 token 的区别&quot;">​</a></h2><p><strong>Cookie：</strong></p><ol><li><strong>存储位置：</strong> Cookie 是存储在客户端浏览器中的小文本文件。每当浏览器发送请求到同一域名下的服务器时，它会自动将相应的 Cookie 信息附加到请求头中。</li><li><strong>大小限制：</strong> 单个 Cookie 的大小通常有限制，通常在几 KB 到几十 KB 之间，不同浏览器可能有不同的限制。</li><li><strong>跨域限制：</strong> Cookie 默认情况下只能在设置它的域名下使用，跨域请求不会自动携带 Cookie。</li><li><strong>安全性：</strong> Cookie 可以设置为 HttpOnly，防止被 JavaScript 访问，提高安全性。设置 SameSite 来防止 CSRF 攻击</li></ol><p><strong>Token：</strong></p><ol><li><strong>存储位置：</strong> Token 是存储在客户端（通常是内存中）的令牌，通常以字符串形式传递在请求的头部中，或者通过查询参数等方式传递给服务器。</li><li><strong>大小限制：</strong> Token 的大小没有明确限制，但过大的 Token 可能会导致网络传输效率下降。</li><li><strong>跨域限制：</strong> Token 可以在跨域请求中手动传递，通常通过设置请求头的方式传递。</li><li><strong>安全性：</strong> Token 可以采用加密算法来保证安全性，但它可能需要开发者自己来实现。Token 也可以设置过期时间，有时会自动刷新，增加安全性。</li></ol><h2 id="具体实现" tabindex="-1">具体实现 <a class="header-anchor" href="#具体实现" aria-label="Permalink to &quot;具体实现&quot;">​</a></h2><p>前端代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>            &lt;span&gt;账号&lt;/span&gt; &lt;input id=&quot;name&quot; type=&quot;text&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>            &lt;span&gt;密码&lt;/span&gt; &lt;input id=&quot;password&quot; type=&quot;password&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;button id=&quot;btn&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        const btn = document.querySelector(&#39;#btn&#39;)</span></span>
<span class="line"><span>        const name = document.querySelector(&#39;#name&#39;)</span></span>
<span class="line"><span>        const password = document.querySelector(&#39;#password&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        btn.onclick = () =&gt; {</span></span>
<span class="line"><span>            fetch(&#39;http://localhost:3000/api/login&#39;, {</span></span>
<span class="line"><span>                body: JSON.stringify({</span></span>
<span class="line"><span>                    name: name.value,</span></span>
<span class="line"><span>                    password: password.value</span></span>
<span class="line"><span>                }),</span></span>
<span class="line"><span>                headers: {</span></span>
<span class="line"><span>                    &#39;Content-Type&#39;: &#39;application/json&#39;</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                method: &#39;POST&#39;,</span></span>
<span class="line"><span>            }).then(res =&gt; res.json()).then(res =&gt; {</span></span>
<span class="line"><span>                localStorage.setItem(&#39;token&#39;, res.token)</span></span>
<span class="line"><span>                location.href = &#39;./list.html&#39;</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 具体调用接口 --&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;List&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        console.log(localStorage.getItem(&#39;token&#39;))</span></span>
<span class="line"><span>        fetch(&#39;http://localhost:3000/api/list&#39;, {</span></span>
<span class="line"><span>            headers: {</span></span>
<span class="line"><span>                &#39;Authorization&#39;:\`Bearer \${localStorage.getItem(&#39;token&#39;)}\`</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }).then(res =&gt; res.json()).then(res =&gt; {</span></span>
<span class="line"><span>            console.log(res)</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><p>后端代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import express from &#39;express&#39;;</span></span>
<span class="line"><span>import jwt from &#39;jsonwebtoken&#39;;</span></span>
<span class="line"><span>import cors from &#39;cors&#39;;</span></span>
<span class="line"><span>const app = express();</span></span>
<span class="line"><span>const secretKey = &#39;jynba&#39; //加盐</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.use(express.urlencoded({ extended: false }));</span></span>
<span class="line"><span>app.use(express.json());</span></span>
<span class="line"><span>app.use(cors())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let user = { name: &#39;admin&#39;, password: &#39;123456&#39;, id: 1 } //模拟用户信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.post(&#39;/api/login&#39;, (req, res) =&gt; {</span></span>
<span class="line"><span>    console.log(req.body)</span></span>
<span class="line"><span>    if (req.body.name == user.name &amp;&amp; req.body.password == user.password) {</span></span>
<span class="line"><span>        res.json({</span></span>
<span class="line"><span>            message: &#39;登录成功&#39;,</span></span>
<span class="line"><span>            code: 200,</span></span>
<span class="line"><span>            token: jwt.sign({ id: user.id }, secretKey, { expiresIn: 60 * 60 * 24 }) //生成token</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        res.json({</span></span>
<span class="line"><span>            message: &#39;登录失败&#39;,</span></span>
<span class="line"><span>            code: 400</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.get(&#39;/api/list&#39;, (req, res) =&gt; {</span></span>
<span class="line"><span>    console.log(req.headers.authorization)</span></span>
<span class="line"><span>    jwt.verify(req.headers.authorization as string, secretKey, (err, data) =&gt; { //验证token</span></span>
<span class="line"><span>        if (err) {</span></span>
<span class="line"><span>            res.json({</span></span>
<span class="line"><span>                message: &#39;token失效&#39;,</span></span>
<span class="line"><span>                code: 403</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            res.json({</span></span>
<span class="line"><span>                message: &#39;获取列表成功&#39;,</span></span>
<span class="line"><span>                code: 200,</span></span>
<span class="line"><span>                data: [</span></span>
<span class="line"><span>                    { name: &#39;张三&#39;, age: 18 },</span></span>
<span class="line"><span>                    { name: &#39;李四&#39;, age: 20 },</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.listen(3000, () =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;server is running 3000&#39;);</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div>`,27),i=[l];function r(t,c,o,b,u,m){return a(),s("div",null,i)}const h=n(e,[["render",r]]);export{g as __pageData,h as default};

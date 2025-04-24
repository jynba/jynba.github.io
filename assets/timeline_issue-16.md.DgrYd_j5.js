import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.CByBVyi2.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-16.md","filePath":"timeline/issue-16.md","lastUpdated":1745467319000}'),e={name:"timeline/issue-16.md"},l=p(`<h3 id="proxy-pass的用法" tabindex="-1">proxy_pass的用法 <a class="header-anchor" href="#proxy-pass的用法" aria-label="Permalink to &quot;proxy_pass的用法&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/16" target="_blank" rel="noreferrer">nginx 反向代理和负载均衡 | GitHub</a></p></div><blockquote><p>案例1代理到哔哩哔哩</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>location / {</span></span>
<span class="line"><span>   root   html;</span></span>
<span class="line"><span>   index  index.html index.htm;</span></span>
<span class="line"><span>   proxy_pass http://bilibili.com;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这样访问/就会被转到哔哩哔哩</p><h3 id="nginx解决history模式线上路径问题" tabindex="-1">nginx解决history模式线上路径问题 <a class="header-anchor" href="#nginx解决history模式线上路径问题" aria-label="Permalink to &quot;nginx解决history模式线上路径问题&quot;">​</a></h3><blockquote><p>Vue是属于单页应用（single-page application） 而SPA是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，前面我们也看到了，不管我们应用有多少页面，构建物都只会产出一个index.html</p></blockquote><p>history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。 浏览器在刷新的时候，会按照路径发送真实的资源请求，如果这个路径是前端通过 history API 设置的 URL，那么在服务端往往不存在这个资源，于是就返回 404 了。 因此在线上部署基于 history API 的单页面应用的时候，一定要后端配合支持才行，否则会出现大量的 404。</p><p>解决方案 <code> try_files $uri $uri/ /index.html;</code> 如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配</p><p><a href="https://juejin.cn/post/6861586972696444942" target="_blank" rel="noreferrer">参考</a></p><p>nginx中常见的变量：</p><p>$uri 当前请求的 URI，但不含“？”后的参数 $args 当前请求的参数，即“？”后的宇符串 $arg_xxx 当前请求里的某个参数，“arg ”后是参数的名字 $http_xxx 当前请求里的 xxx 头部对应的值 $sent_http_xxx 返回给客户端的响应头部对应的值 $remote_addr 客户端IP 地址。 $http_cookie 获取cookie值 $cookie_xxx 当前请求的cookie xxx对应的值 $request_uri 浏览器发起的不作任何修改的请求的url中的path 如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111 $uri 指当前的请求URI，不包括任何参数，反映任何内部重定向或index模块所做的修改 $request_method 请求方法</p><h3 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h3><p>nginx 配置文件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>location /api/ {</span></span>
<span class="line"><span>    proxy_pass http://localhost:9000/;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>截取到/api/ 将会转发到 <code>http://localhost:9000/</code></p><ul><li>proxy_set_header</li></ul><p>该指令可以更改Nginx服务器接收到的客户端请求的请求头信息，然后将新的请求头发送给代理的服务器</p><ul><li><p>proxy_set_header X-Real-IP $remote_addr;</p></li><li><p>proxy_set_header X-Real-Port $remote_port;</p></li><li><p>proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</p></li></ul><p>三个header分别表示： X-Real-IP 客户端或上一级代理ip</p><p>X-Real-Port 客户端或上一级端口</p><p>X-Forwarded-For 包含了客户端和各级代理ip的完整ip链路 其中X-Real-IP是必需的，后两项选填。当只存在一级nginx代理的时候X-Real-IP和X-Forwarded-For是一致的，而当存在多级代理的时候，X-Forwarded-For 就变成了如下形式</p><p>$remote_addr是前一节点的IP，并不一定是用户的真实IP。 <a href="https://blog.csdn.net/qq1195566313/article/details/124486764" target="_blank" rel="noreferrer">参考</a></p><h3 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h3><ul><li>upstream upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    upstream  node {</span></span>
<span class="line"><span>        server 127.0.0.1:9001;</span></span>
<span class="line"><span>        server 127.0.0.1:9002;</span></span>
<span class="line"><span>        server 127.0.0.1:9003;</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  location / {</span></span>
<span class="line"><span>      proxy_pass http://node;</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol><li>默认状态是按照轮询的方式去做负载的</li></ol><p>使用express 启动三个服务 分别是9001 9002 9003</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const express = require(&#39;express&#39;)</span></span>
<span class="line"><span>var num = 1</span></span>
<span class="line"><span>const app = express()</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>app.get(&#39;/list&#39;,(req,res)=&gt;{</span></span>
<span class="line"><span>    res.json({</span></span>
<span class="line"><span>        code:200,</span></span>
<span class="line"><span>        message:&quot;Nginx 负载均衡9001&quot;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    console.log(&quot;Nginx 负载均衡9001&quot;,num)</span></span>
<span class="line"><span>   num++</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>//------------------------------9001</span></span>
<span class="line"><span>app.listen(9001,()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;9001 success&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>//-----------------------------------</span></span>
<span class="line"><span>const express = require(&#39;express&#39;)</span></span>
<span class="line"><span>var num = 1</span></span>
<span class="line"><span>const app = express()</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>app.get(&#39;/list&#39;,(req,res)=&gt;{</span></span>
<span class="line"><span>    res.json({</span></span>
<span class="line"><span>        code:200,</span></span>
<span class="line"><span>        message:&quot;Nginx 负载均衡9002&quot;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    console.log(&quot;Nginx 负载均衡9002&quot;,num)</span></span>
<span class="line"><span>    num++</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>//------------------------------9002</span></span>
<span class="line"><span>app.listen(9002,()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;9002 success&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>//--------------------------------</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>const express = require(&#39;express&#39;)</span></span>
<span class="line"><span>var num = 1</span></span>
<span class="line"><span>const app = express()</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>app.get(&#39;/list&#39;,(req,res)=&gt;{</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    res.json({</span></span>
<span class="line"><span>        code:200,</span></span>
<span class="line"><span>        message:&quot;Nginx 负载均衡9003&quot;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    console.log(&quot;Nginx 负载均衡9003&quot;,num)</span></span>
<span class="line"><span>    num++</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>//------------------------------9003</span></span>
<span class="line"><span>app.listen(9003,()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;9003 success&#39;)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><ol start="2"><li><p>权重weight</p><p>upstream node { server 127.0.0.1:9001 weight=3; server 127.0.0.1:9002 weight=2; server 127.0.0.1:9003 weight=1; } 权重越大服务器承载的并发就越高</p></li></ol><p>压测100 更多的并发打到了9001 3. fail_timeout backup fail_timeout是故障等待超时时间</p><p>backup是备用服务器参数，可以为一个upstream设置一个backup的server，在生产server全部都出问题之后，可以自动切换到备用server上，为回复服务争取时间</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    upstream  node {</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        server 127.0.0.1:9001 fail_timeout=60;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        server 127.0.0.1:9002 fail_timeout=20;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        server 127.0.0.1:9003 backup;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,34),i=[l];function r(c,t,o,b,u,m){return a(),n("div",null,i)}const g=s(e,[["render",r]]);export{h as __pageData,g as default};

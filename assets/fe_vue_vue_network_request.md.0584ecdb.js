import{_ as s,o as a,c as n,O as l}from"./chunks/framework.ed8d50c3.js";const u=JSON.parse('{"title":"Vue 网络请求","description":"","frontmatter":{},"headers":[],"relativePath":"fe/vue/vue_network_request.md","lastUpdated":1695788522000}'),p={name:"fe/vue/vue_network_request.md"},e=l(`<h1 id="vue-网络请求" tabindex="-1">Vue 网络请求 <a class="header-anchor" href="#vue-网络请求" aria-label="Permalink to &quot;Vue 网络请求&quot;">​</a></h1><h2 id="vue-脚手架配置代理" tabindex="-1">Vue 脚手架配置代理 <a class="header-anchor" href="#vue-脚手架配置代理" aria-label="Permalink to &quot;Vue 脚手架配置代理&quot;">​</a></h2><h3 id="配置单个代理" tabindex="-1">配置单个代理 <a class="header-anchor" href="#配置单个代理" aria-label="Permalink to &quot;配置单个代理&quot;">​</a></h3><p>在 <code>vue.config.js</code> 中添加如下配置：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">devServer</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">proxy</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:5000</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>优点：配置简单，请求资源时直接发给前端（8080）即可。</li><li>缺点：不能配置多个代理，不能灵活的控制请求是否走代理。</li><li>工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）</li></ul><h3 id="配置多个代理" tabindex="-1">配置多个代理 <a class="header-anchor" href="#配置多个代理" aria-label="Permalink to &quot;配置多个代理&quot;">​</a></h3><p>编写 <code>vue.config.js</code> 配置具体代理规则：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">devServer</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">proxy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">/api1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 匹配所有以 &#39;/api1&#39;开头的请求路径</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:5000</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 代理目标的基础路径</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">changeOrigin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 把路径的 /api1 替换为空串</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">pathRewrite</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">^/api1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">/api2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 匹配所有以 &#39;/api2&#39;开头的请求路径</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:5001</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">changeOrigin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">pathRewrite</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">^/api2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">changeOrigin 设置为 true 时，服务器收到的请求头中的 host：localhost:5000</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">changeOrigin 设置为 false 时，服务器收到的请求头中的 host：localhost:8080</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">changeOrigin 默认为 true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><ul><li>优点：可以配置多个代理，且可以灵活的控制请求是否走代理。</li><li>缺点：配置略微繁琐，请求资源时必须加前缀</li></ul><h2 id="vue-2-x-全局配置-axios" tabindex="-1">vue 2.x 全局配置 axios <a class="header-anchor" href="#vue-2-x-全局配置-axios" aria-label="Permalink to &quot;vue 2.x 全局配置 axios&quot;">​</a></h2><p>实际项目开发中，几乎每个组件中都会使用 <code>axios</code> 发起数据请求。此时会遇到如下两个问题：</p><ul><li>每个组件中都需要导入 <code>axios</code>（代码臃肿）</li><li>每次发请求都需要填写完整的请求路径（不利于后期的维护）</li></ul><p>在 <code>main.js</code> 文件中进行配置：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 配置请求根路径</span></span>
<span class="line"><span style="color:#A6ACCD;">axios</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">defaults</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">baseURL </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://api.com</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 把 axios 挂载到 Vue 原型上</span></span>
<span class="line"><span style="color:#FFCB6B;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$http </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> aixos</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>优点：每个组件可以通过 <code>this.$http.get</code> 直接发起请求，无需再导入 <code>axios</code> ；若根路径发生改变，只需修改 <code>axios.defaults.baseURL</code> ，有利于代码维护。</p><p>缺点：无法实现 <code>API</code> 的复用。即多个组件需要对同一个接口发起请求，那么每个组件都需要重复书写 <code>this.$http.get(&#39;/users&#39;)</code> 类似的代码，造成冗余。（视频上的说法，个人认为真正的缺点是如果存在多个根路径，这种方式无法解决，所以才会有下面的改进方式。）</p><p>改进：对于每一个根路径，独立封装一个 <code>request.js</code> 模块，组件导入所需根路径对应的 <code>axios</code> 进行使用。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> axios </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">axios</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 创建 axios 实例</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> request </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">baseURL</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://api.taobao.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> request</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,19),o=[e];function t(c,r,i,D,y,F){return a(),n("div",null,o)}const A=s(p,[["render",t]]);export{u as __pageData,A as default};
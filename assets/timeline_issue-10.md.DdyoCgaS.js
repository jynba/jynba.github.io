import{_ as n,c as s,o as a,a5 as e}from"./chunks/framework.CByBVyi2.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-10.md","filePath":"timeline/issue-10.md","lastUpdated":1725011436000}'),l={name:"timeline/issue-10.md"},p=e(`<blockquote><p>AbortController：从 v0.22.0 开始，Axios 支持以 fetch API 方式—— AbortController 取消请求。</p></blockquote><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/10" target="_blank" rel="noreferrer">如何中断已发出去的请求？AbortController/CancelToken.source | GitHub</a></p></div><blockquote><p>CancelToken：此 API 从 v0.22.0 开始已被弃用，不应在新项目中使用。</p></blockquote><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h2><ol><li>页面切换频繁，当上一个请求返回时间比下一个请求返回时间长，可能会导致页面错乱</li><li>页面切换时，尚未返回的请求则中止，性能优化。</li><li>普通防抖当请求响应时间大于设定的防抖的时间时，还是会出错。（tip：也可通过后端返回counter，重复点击时counter++，匹配最后一次的counter是否一直来解决）</li></ol><h2 id="具体实现" tabindex="-1">具体实现 <a class="header-anchor" href="#具体实现" aria-label="Permalink to &quot;具体实现&quot;">​</a></h2><ul><li>CancelToken.source()方法，将source.token传给axios的config中的cancelToken，通过调用source.cancel(&quot;cancel~&quot;)来中止请求</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// method 1 </span></span>
<span class="line"><span>const CancelToken = axios.CancelToken;</span></span>
<span class="line"><span>const source = CancelToken.source();</span></span>
<span class="line"><span>axios.post(&#39;/user/12345&#39;, {</span></span>
<span class="line"><span>  name: &#39;new name&#39;</span></span>
<span class="line"><span>}, {</span></span>
<span class="line"><span>  cancelToken: source.token</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>source.cancel(&#39;Operation canceled by the user.&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li>通过CancelToken构造器中的executor函数，参数为一个改变 this.promise 状态的回调函数，将他赋值给外部变量，再调用即可实现中止请求</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// method 2</span></span>
<span class="line"><span>const CancelToken = axios.CancelToken;</span></span>
<span class="line"><span>let cancel;</span></span>
<span class="line"><span>axios.get(&#39;/user/12345&#39;, {</span></span>
<span class="line"><span>  cancelToken: new CancelToken(function executor(c) {</span></span>
<span class="line"><span>    cancel = c;</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cancel();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li>AbortController类作为abort事件控制器，其中有signal属性，将其作为config的参数，直接调用AbortController类实例中的abort方法实现中止请求</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// method 3</span></span>
<span class="line"><span>const controller = new AbortController();</span></span>
<span class="line"><span>axios.get(&#39;/foo/bar&#39;, {</span></span>
<span class="line"><span>   signal: controller.signal</span></span>
<span class="line"><span>}).then(function(response) {</span></span>
<span class="line"><span>   //...</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>controller.abort();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,12),i=[p];function c(r,o,t,b,u,d){return a(),s("div",null,i)}const k=n(l,[["render",c]]);export{h as __pageData,k as default};

import{_ as s,c as i,o as a,a5 as e}from"./chunks/framework.CByBVyi2.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-17.md","filePath":"timeline/issue-17.md","lastUpdated":1725006636000}'),n={name:"timeline/issue-17.md"},t=e(`<blockquote><p>今天在<a href="https://blog.csdn.net/wtuynqy/article/details/129025722" target="_blank" rel="noreferrer">Cesium中加载大规模数据稳定流畅之性能优化思路</a>文章看到这个<code>WebAssembly</code>，等好奇就搜了一下，</p></blockquote><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/17" target="_blank" rel="noreferrer">什么是WebAssembly(wasm)？ | GitHub</a></p></div><blockquote><p>文章这样写的：使用 WebAssembly 技术：将计算任务交给 WebAssembly，可以提高计算性能，从而提高加载和渲染性能。可以使用 Cesium 提供的 WebAssembly 功能或其他第三方工具进行 WebAssembly 开发。</p></blockquote><h3 id="什么是webassembly" tabindex="-1">什么是WebAssembly？ <a class="header-anchor" href="#什么是webassembly" aria-label="Permalink to &quot;什么是WebAssembly？&quot;">​</a></h3><p>WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C / C ++等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。 简单讲就是：将C/C++放到web上运行，与js共存</p><p>值得一提的是，Figma就是用wasm；</p><blockquote><p>为什么wasm适合计算复杂的问题，为什么性能好？ 因为wasm是使用C/C++等CPU密集型语言运行，在计算效率上是远远优于IO密集型(Nodejs，浏览器)，因此在前端高性能计算领域（如多功能视频播放器，音频转码工具，网页游戏，加解密）都有非常广泛的应用前景</p></blockquote><h3 id="如何使用webassembly" tabindex="-1">如何使用webAssembly? <a class="header-anchor" href="#如何使用webassembly" aria-label="Permalink to &quot;如何使用webAssembly?&quot;">​</a></h3><p>直接从流式底层源传输 .wasm 模块，然后对其进行编译和实例化，并通过 ResultObject 实现 promise。由于 instantiateStreaming() 函数接受对 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Response" target="_blank" rel="noreferrer">Response</a> 对象的 promise，因此你可以直接向其传递 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/fetch" target="_blank" rel="noreferrer">fetch()</a> 调用，然后它将把返回的 response 传递给随后的函数。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> importObject </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { imports: { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">imported_func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arg) } };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">WebAssembly.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">instantiateStreaming</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;simple.wasm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), importObject).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">obj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj.instance.exports.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exported_func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>或者</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchAndInstantiate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">importObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(url).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">response</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    response.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">arrayBuffer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">bytes</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    WebAssembly.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">instantiate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bytes, importObject)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">results</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    results.instance</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><a href="https://zhuanlan.zhihu.com/p/417035181" target="_blank" rel="noreferrer">参考</a></p><ul><li>在线将C++转微wasm：<a href="https://mbebenita.github.io/WasmExplorer/" target="_blank" rel="noreferrer">https://mbebenita.github.io/WasmExplorer/</a></li></ul>`,14),l=[t];function p(h,r,k,E,d,b){return a(),i("div",null,l)}const g=s(n,[["render",p]]);export{c as __pageData,g as default};

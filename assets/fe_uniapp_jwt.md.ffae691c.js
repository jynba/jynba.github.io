import{_ as s,o as a,c as n,O as l}from"./chunks/framework.ed8d50c3.js";const d=JSON.parse('{"title":"uniapp 入坑之旅","description":"","frontmatter":{},"headers":[],"relativePath":"fe/uniapp/jwt.md","lastUpdated":1710918081000}'),p={name:"fe/uniapp/jwt.md"},o=l(`<h1 id="uniapp-入坑之旅" tabindex="-1">uniapp 入坑之旅 <a class="header-anchor" href="#uniapp-入坑之旅" aria-label="Permalink to &quot;uniapp 入坑之旅&quot;">​</a></h1><h3 id="uniapp-的优势" tabindex="-1">uniapp 的优势 <a class="header-anchor" href="#uniapp-的优势" aria-label="Permalink to &quot;uniapp 的优势&quot;">​</a></h3><ul><li>使用 Vue 开发跨平台应用，一套代码兼容小程序、h5、app；<strong>支持转换</strong></li><li>语法上使用 vue，兼容 view(类似于微信小程序) div(web)的语法</li><li>可以搭配 vite、sass 等，和正常 vue 开发区别不大</li></ul><h3 id="开发细节" tabindex="-1">开发细节 <a class="header-anchor" href="#开发细节" aria-label="Permalink to &quot;开发细节&quot;">​</a></h3><ul><li>使用组件库，配置 easycom 之后无需导入即可使用 配置 page.json 文件</li></ul><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">easycom</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">autoscan</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">custom</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">^uni-(.*)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">^b-(.*)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/components/basic/b-$1/b-$1.vue</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,6),e=[o];function t(r,c,i,u,D,F){return a(),n("div",null,e)}const C=s(p,[["render",t]]);export{d as __pageData,C as default};

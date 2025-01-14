import{_ as s,c as i,o as a,a5 as t}from"./chunks/framework.CByBVyi2.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-45.md","filePath":"timeline/issue-45.md","lastUpdated":1736820051000}'),n={name:"timeline/issue-45.md"},e=t(`<blockquote><p>我们知道vue3的template是可以具有多个根元素的组件，原因如下：在Vue 3中，引入了基于标记片段（Fragment）的编译机制。标记片段是一种特殊的数据结构，可以容纳多个子节点，并没有实际的DOM元素。在处理具有多个根元素的组件模板时，Vue 3的编译器会将模板中的每个根级标签（包括自定义组件）都编译为一个单独的标记片段。然后，这些标记片段将作为一个数组，一起创建实际的渲染函数。这样，每个根级标签都能够保留自己的作用域和响应式数据，并且它们可以并行地进行更新。这种基于标记片段的编译机制让Vue 3能够更加灵活地处理组件模板，实现组件模板中的多个根元素。这样，开发者可以在组件模板中直接使用多个根元素，而不需要额外的包裹层级。<a href="https://blog.csdn.net/weixin_64974855/article/details/131578093" target="_blank" rel="noreferrer">参考链接</a></p></blockquote><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/45" target="_blank" rel="noreferrer">Vue3中的template中可含多个节点，但 transition 包裹时除外 | GitHub</a></p></div><h3 id="发现问题" tabindex="-1">发现问题 <a class="header-anchor" href="#发现问题" aria-label="Permalink to &quot;发现问题&quot;">​</a></h3><ul><li>Vue3中的template中可含多个节点 但transition包裹时除外</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">section</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">router-view</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-slot</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{ Component }&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">transition</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;fade&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;out-in&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">component</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> :is=&quot;Component&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> :key=&quot;$route.path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">router-view</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">section</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="https://github.com/jynba/jynba.github.io/assets/75623303/077636dd-0131-4bfc-a242-30109c7e0a44" alt="image"></p><h3 id="问题分析" tabindex="-1">问题分析 <a class="header-anchor" href="#问题分析" aria-label="Permalink to &quot;问题分析&quot;">​</a></h3><ul><li>Transition 中的组件不能呈现动画的非元素根节点。 也就是说，Transition包裹的必须是一个单根的组件。</li></ul><h3 id="问题解决" tabindex="-1">问题解决 <a class="header-anchor" href="#问题解决" aria-label="Permalink to &quot;问题解决&quot;">​</a></h3><ul><li>使用div包裹使得其只有一个根入口即可</li></ul>`,10),l=[e];function h(p,k,r,o,d,E){return a(),i("div",null,l)}const g=s(n,[["render",h]]);export{u as __pageData,g as default};
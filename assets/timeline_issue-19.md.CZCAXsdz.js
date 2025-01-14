import{_ as s,c as i,o as a,a5 as n}from"./chunks/framework.CByBVyi2.js";const u=JSON.parse('{"title":"什么是Symbol.toPrimitive？","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-19.md","filePath":"timeline/issue-19.md","lastUpdated":1736820051000}'),t={name:"timeline/issue-19.md"},e=n(`<h1 id="什么是symbol-toprimitive" tabindex="-1">什么是Symbol.toPrimitive？ <a class="header-anchor" href="#什么是symbol-toprimitive" aria-label="Permalink to &quot;什么是Symbol.toPrimitive？&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/19" target="_blank" rel="noreferrer">什么是Symbol.toPrimitive？ | GitHub</a></p></div><blockquote><p>Symbol.toPrimitive 允许我们将对象描述为原始值转换</p></blockquote><ul><li>如果没有 Symbol.toPrimitive，那么 JavaScript 将尝试寻找 toString 和 valueOf 方法</li><li>string优先调用toString，其他优先调用valueOf； 这两个方法必须返回一个原始值。如果 toString 或 valueOf 返回了一个对象，那么返回值会被忽略</li><li>默认情况下，普通对象具有 toString 和 valueOf 方法： toString 方法返回一个字符串 &quot;[object Object]&quot;。 valueOf 方法返回对象自身</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;John&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [object Object]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">valueOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>注意：</strong> 没有限制 toString() 是否返回字符串，或 Symbol.toPrimitive 方法是否为 &quot;number&quot; <code>hint</code> 返回数字。 唯一强制性的事情是：这些方法必须返回一个原始值，而不是对象。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [Symbol.toPrimitive](hint) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">              alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`hint: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">              return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hint </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;string&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`{name: &quot;\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&quot;}\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.money;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //等价于</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">              return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`{name: &quot;\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&quot;}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">valueOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.money;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>转换算法是：</p><p>调用 <code>obj[Symbol.toPrimitive](hint)</code> 如果这个方法存在， 否则，如果 hint 是 &quot;string&quot;</p><p>尝试调用 <code>obj.toString()</code> 或 <code>obj.valueOf()</code>，无论哪个存在。 否则，如果 hint 是 &quot;number&quot; 或者 &quot;default&quot;</p><p>尝试调用 <code>obj.valueOf()</code> 或 <code>obj.toString()</code>，无论哪个存在。</p>`,12),l=[e];function p(h,r,k,o,d,E){return a(),i("div",null,l)}const g=s(t,[["render",p]]);export{u as __pageData,g as default};
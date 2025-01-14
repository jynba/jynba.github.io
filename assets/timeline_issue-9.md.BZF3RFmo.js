import{_ as s,c as a,o as e,a5 as n}from"./chunks/framework.CByBVyi2.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-9.md","filePath":"timeline/issue-9.md","lastUpdated":1736820051000}'),t={name:"timeline/issue-9.md"},i=n(`<blockquote><p>复习一下正则表达式</p></blockquote><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/9" target="_blank" rel="noreferrer">如何使用JS将驼峰转为横杠写法？(fooBarTest变为foo-bar-test) | GitHub</a></p></div><ul><li><code>&#39;/[a-z]/&#39;.test(x)</code>可判断x是否为小写，返回true/false</li><li><code>&#39;abc&#39;.replace(&#39;/[a-z]/g&#39;,(item)=&gt;item)</code> g表示全局匹配，因此会将全局的小写字母替换为item</li></ul><h2 id="最终答案" tabindex="-1">最终答案 <a class="header-anchor" href="#最终答案" aria-label="Permalink to &quot;最终答案&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function tuoTo(targetString) {</span></span>
<span class="line"><span>    return targetString.replace(/([A-Z])/g,function(match) {</span></span>
<span class="line"><span>        return &#39;-&#39; + match.toLowerCase()    </span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(tuoTo(&#39;qiLin&#39;))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,5),l=[i];function p(r,o,c,u,d,b){return e(),a("div",null,l)}const h=s(t,[["render",p]]);export{_ as __pageData,h as default};
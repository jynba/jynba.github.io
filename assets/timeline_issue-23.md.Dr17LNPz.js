import{_ as e,c as a,o as t,a5 as i}from"./chunks/framework.CByBVyi2.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-23.md","filePath":"timeline/issue-23.md","lastUpdated":1725006636000}'),s={name:"timeline/issue-23.md"},r=i('<h2 id="什么是骨架屏" tabindex="-1">什么是骨架屏？ <a class="header-anchor" href="#什么是骨架屏" aria-label="Permalink to &quot;什么是骨架屏？&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/23" target="_blank" rel="noreferrer">微信小程序中骨架屏怎么用？骨架屏有什么好处？ | GitHub</a></p></div><ul><li>骨架屏是一种在页面加载内容之前，以占位符或虚拟元素形式展示的页面加载动画或效果。其主要目的是为了提供更好的用户体验，让用户在等待页面内容加载时不至于感到空白和焦虑。</li></ul><p><strong>注意：骨架屏并不能缩短首屏时间，相反还会增加首屏时间，但是会给用户反馈，体验更好</strong></p><h2 id="首屏时间和白屏时间有什么区别" tabindex="-1">首屏时间和白屏时间有什么区别？ <a class="header-anchor" href="#首屏时间和白屏时间有什么区别" aria-label="Permalink to &quot;首屏时间和白屏时间有什么区别？&quot;">​</a></h2><p>白屏时间是用户在页面加载过程中看到空白屏幕的时间，而首屏时间是用户在页面加载过程中看到重要内容的时间。 首屏时间是白屏时间的子集。它不仅包括白屏时间，还包括页面的一部分内容开始呈现在屏幕上的时间。</p><h2 id="微信小程序一键生成骨架屏" tabindex="-1">微信小程序一键生成骨架屏 <a class="header-anchor" href="#微信小程序一键生成骨架屏" aria-label="Permalink to &quot;微信小程序一键生成骨架屏&quot;">​</a></h2><p>在微信小程序中可以方便地为页面添加骨架屏</p><ul><li>直接在页面下方有一个生成骨架屏的按钮 <img src="https://github.com/jynba/jynba.github.io/assets/75623303/5d16899d-a957-4875-b84c-872dd683f7cd" alt="image"></li><li>生成配置文件，按生成的文件导入wxss、wxml，js中的loading:true，onReady中设置加载状态为false</li><li>至此即可完成骨架屏加载 <a href="https://developers.weixin.qq.com/community/business/doc/000086539b40682ccddd8b71551c0d" target="_blank" rel="noreferrer">官方视频</a></li></ul>',9),o=[r];function l(n,c,d,h,u,_){return t(),a("div",null,o)}const b=e(s,[["render",l]]);export{m as __pageData,b as default};

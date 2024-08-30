import{_ as e,c as r,o as a,a5 as t}from"./chunks/framework.CByBVyi2.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/issue-56.md","filePath":"timeline/issue-56.md","lastUpdated":1725006636000}'),o={name:"timeline/issue-56.md"},i=t('<h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/jynba/jynba.github.io/issues/56" target="_blank" rel="noreferrer">一个浏览器缓存问题让我研究了两天！！！（PWA） | GitHub</a></p></div><h4 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h4><p>最近在搭建移动端组件库，其中文档我是用vitepress写，移动端的预览我是用iframe嵌套h5页面(目前移动端组件库基操)，而在某一次部署更新的时候，我发现h5页面突然间404了，当我访问 <code>motui.cvcvcvcv.com/ui/</code>时，并没有像往常一样帮我跳转到<code>motui.cvcvcvcv.com/ui/#/xxxxx</code>，奇了怪了，我查看了network，发现每次调用/ui/页面的时候，随之会调用 index.html页面，我觉得这应该是问题的关键。</p><h4 id="岔路" tabindex="-1">岔路 <a class="header-anchor" href="#岔路" aria-label="Permalink to &quot;岔路&quot;">​</a></h4><p>于是我走了岔路，我以为是需要进行nginx代理一下，并且搜了一下，发现确实是有这种nginx没代理出现404的情况，于是我开始了不断的一次又一次的尝试... 在这个过程中，我分清楚了 <code>root</code>、<code>alias</code>、<code>try_files</code>的区别，了解了openresty是啥东西(其实还不是很了解)，对nginx proxy manager了解多了一点(这个是我管理多个网站docker部署代理的工具)。 正如前面所说，这个是岔路，根本不是nginx导致的（子目录下的页面访问，并不需要配置nginx！），因此我重新调整了方向。</p><h4 id="转机" tabindex="-1">转机 <a class="header-anchor" href="#转机" aria-label="Permalink to &quot;转机&quot;">​</a></h4><p>偶然间，我尝试着去除缓存强制刷新/ui页面，发现它又正常了，但是当我下一次刷新时又404了，我才发现浏览器刷新是由多种刷新方式的，打开f12后右键刷新按钮会由三个选项。 <img src="https://github.com/jynba/jynba.github.io/assets/75623303/62f15b2d-0367-4c5b-89ce-066c9dc097bb" alt="image"> 当我使用硬性加载时，页面正常，正常重新加载时页面404，问题终于有了突破性进展，原来是浏览器缓存导致的！我反应过来应该是我配置了vitepress的pwa导致的。</p><h4 id="问题解决" tabindex="-1">问题解决 <a class="header-anchor" href="#问题解决" aria-label="Permalink to &quot;问题解决&quot;">​</a></h4><p>于是我去看了下pwa，在研究vitepress中pwa插件源码的时候发现了这个<a href="https://github.com/vite-pwa/vitepress/issues/22" target="_blank" rel="noreferrer">issue</a><img src="https://github.com/jynba/jynba.github.io/assets/75623303/556d8114-929a-4e23-a862-94d27300cf7d" alt="image"> 这个情况tm不是和我的一模一样吗？！这个issue的问题应该是设置了pwa但是没有启动sw文件，但是我在网站<code>motui.cvcvcvcv.com</code>中是启动了的，后面我想了下，应该是因为我的 <code>motui.cvcvcvcv.com/ui/</code>前缀和这里冲突了，导致它也受到了service worker的影响，才会一直不断的重定向到index.html，并且报错。</p><p>而在本地运行的时候，vitepress文档的端口9999和h5页面的端口5173并不相同，services worker好像并没有作用到他那，因此没啥问题。 <img src="https://github.com/jynba/jynba.github.io/assets/75623303/f8c7b72c-6692-4f7e-ba50-d0a7887972f3" alt="image"></p><p>于是我去除了vitepress中的service worker，一切又恢复了正常！终于！！</p><h2 id="知识点插播" tabindex="-1">知识点插播 <a class="header-anchor" href="#知识点插播" aria-label="Permalink to &quot;知识点插播&quot;">​</a></h2><h3 id="浏览器正常重新加载与硬性重新加载-参考" tabindex="-1">浏览器正常重新加载与硬性重新加载 <a href="https://www.cnblogs.com/hh9515/p/10998414.html" target="_blank" rel="noreferrer">参考</a> <a class="header-anchor" href="#浏览器正常重新加载与硬性重新加载-参考" aria-label="Permalink to &quot;浏览器正常重新加载与硬性重新加载 [参考](https://www.cnblogs.com/hh9515/p/10998414.html)&quot;">​</a></h3><ul><li><p>正常重新加载 等同于F5 ，浏览器发送请求时会带上缓存相关请求头</p></li><li><p>硬性重新加载：等同于直接按SHIFT+F5，(浏览器在发送请求时会带上禁止缓存的相关请求头) 或者在devtools的network面板中勾选Disable cache并刷新（devtools面板开启状态）。这种情况下当遇到需要加载的资源时，不会使用缓存的资源，而是重新发起请求。</p></li><li><p>清空缓存并硬性重新加载：顾名思义，将该页面的缓存清空并进行硬性重新加载，有人可能会问，既然是硬性重新加载，清不清缓存好像没有意义。其实不然，页面加载后，还可能通过JS加载内容，只是普通的硬性重新加载的话这部分的内容仍然是从缓存中加载的，清空缓存则可以保证页面内容是完全重新加载的</p></li></ul><h3 id="vitepress-pwa-功能-与-services-worker-介绍" tabindex="-1">VitePress PWA 功能 与 Services Worker 介绍 <a class="header-anchor" href="#vitepress-pwa-功能-与-services-worker-介绍" aria-label="Permalink to &quot;VitePress PWA 功能 与 Services Worker 介绍&quot;">​</a></h3><h4 id="pwa" tabindex="-1">PWA <a class="header-anchor" href="#pwa" aria-label="Permalink to &quot;PWA&quot;">​</a></h4><ul><li>PWA主要用于浏览器的离线缓存，将浏览器加载的文件存储到了浏览器的缓存中，方便下次离线状态下访问，VitePress 开启 PWA 功能可以看这个教程：<a href="https://www.skillgroup.cn/framework/vitepress/pwa.html" target="_blank" rel="noreferrer">VitePress 如何开启 PWA 功能</a></li></ul><h4 id="servicesworker" tabindex="-1">ServicesWorker <a class="header-anchor" href="#servicesworker" aria-label="Permalink to &quot;ServicesWorker&quot;">​</a></h4><h4 id="_1-什么是-web-worker" tabindex="-1">1. 什么是 Web Worker？ <a class="header-anchor" href="#_1-什么是-web-worker" aria-label="Permalink to &quot;1\\. 什么是 Web Worker？&quot;">​</a></h4><p>Web Worker 是浏览器内置的线程，用于执行非阻塞事件循环的 JavaScript 代码。由于 JavaScript 是单线程语言，一次只能处理一个任务。复杂任务的出现可能导致主线程被阻塞，严重影响用户体验。Web Worker 的作用是允许主线程创建 worker 线程，使它们可以同时运行。Worker 线程主要负责处理复杂的计算任务，然后将结果返回给主线程。简而言之，worker 线程执行复杂计算，同时保持页面（主线程）的流畅性，不会造成阻塞。</p><h4 id="_2-类型" tabindex="-1">2. 类型 <a class="header-anchor" href="#_2-类型" aria-label="Permalink to &quot;2\\. 类型&quot;">​</a></h4><p>Web Worker 有三种主要类型：</p><ol><li><a href="https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%253A%252F%252Fdeveloper.mozilla.org%252Fen-US%252Fdocs%252FWeb%252FAPI%252FWeb_Workers_API%252FUsing_web_workers&amp;source=article&amp;objectId=2343805" target="_blank" rel="noreferrer">Dedicated Workers</a>【专用 Worker】由主线程实例化，只能与主线程通信。</li><li><a href="https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%253A%252F%252Fdeveloper.mozilla.org%252Fen-US%252Fdocs%252FWeb%252FAPI%252FSharedWorker&amp;source=article&amp;objectId=2343805" target="_blank" rel="noreferrer">Shared Workers</a>【共享 Worker】可以被同源的所有线程访问。</li><li><a href="https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%253A%252F%252Fdeveloper.mozilla.org%252Fen-US%252Fdocs%252FWeb%252FAPI%252FServiceWorker_API&amp;source=article&amp;objectId=2343805" target="_blank" rel="noreferrer">Service Workers</a>【服务 Worker】能够控制其关联的网页，拦截和修改导航、资源请求，并缓存资源，使您能够在某些情况下灵活控制应用程序的行为。</li></ol><h3 id="_3-限制" tabindex="-1">3. 限制 <a class="header-anchor" href="#_3-限制" aria-label="Permalink to &quot;3\\. 限制&quot;">​</a></h3><h4 id="_1-同源限制" tabindex="-1">1. 同源限制 <a class="header-anchor" href="#_1-同源限制" aria-label="Permalink to &quot;1\\. 同源限制&quot;">​</a></h4><p>分配给 Worker 线程运行的脚本文件必须与主线程的脚本文件同源，通常都应该放在同一项目下。</p><h4 id="_2-dom-限制" tabindex="-1">2. DOM 限制 <a class="header-anchor" href="#_2-dom-限制" aria-label="Permalink to &quot;2\\. DOM 限制&quot;">​</a></h4><p>Web Workers 无法访问某些关键的 JavaScript 特性，包括：</p><p>1 DOM（因为这可能导致线程不安全）</p><p>2 window 对象</p><p>3 document 对象</p><p>4 parent 对象</p><h4 id="_3-文件限制" tabindex="-1">3. 文件限制 <a class="header-anchor" href="#_3-文件限制" aria-label="Permalink to &quot;3\\. 文件限制&quot;">​</a></h4><p>出于安全考虑，worker 线程无法读取本地文件。它们加载的脚本必须来自网络，并且必须与主线程的脚本同源。</p><h3 id="什是service-worker" tabindex="-1">什是Service Worker？ <a class="header-anchor" href="#什是service-worker" aria-label="Permalink to &quot;什是Service Worker？&quot;">​</a></h3><p>Service Worker（服务工作线程）是一种在浏览器背后运行的脚本，用于提供强大的离线和缓存功能，以改善 Web 应用程序的性能和可靠性。它是渐进式网络应用程序（Progressive Web App，PWA）的关键组成部分，可以让 Web 应用程序更像本地应用程序，即使在离线状态下也能正常工作。Service Worker 是 Web 开发中的一个强大工具，它使开发人员能够更好地控制和管理 Web 页面的资源缓存、网络请求和响应，从而提供更快速、更稳定的用户体验。</p><p><img src="https://developer.qcloudimg.com/http-save/yehe-10668329/3c03505b303cc9a03f4bbd51e6a63a10.webp" alt="image.png"></p><p>image.png</p><h3 id="service-worker-的功能和优点" tabindex="-1">Service Worker 的功能和优点 <a class="header-anchor" href="#service-worker-的功能和优点" aria-label="Permalink to &quot;Service Worker 的功能和优点&quot;">​</a></h3><p>Service Worker 提供了许多重要功能和优点，其中包括：</p><h4 id="_1-离线支持" tabindex="-1">1. 离线支持 <a class="header-anchor" href="#_1-离线支持" aria-label="Permalink to &quot;1\\. 离线支持&quot;">​</a></h4><p>Service Worker 可以缓存 Web 应用程序的资源，使其在断网或低网络质量环境下仍能够加载和运行。这意味着用户可以随时访问应用程序，无需依赖网络连接。</p><h4 id="_2-更快的加载速度" tabindex="-1">2. 更快的加载速度 <a class="header-anchor" href="#_2-更快的加载速度" aria-label="Permalink to &quot;2\\. 更快的加载速度&quot;">​</a></h4><p>通过将资源缓存在本地，Service Worker 可以显著提高 Web 页面的加载速度。它可以从缓存中获取资源，而无需每次都从服务器重新下载。</p><h4 id="_3-支持后台同步" tabindex="-1">3. 支持后台同步 <a class="header-anchor" href="#_3-支持后台同步" aria-label="Permalink to &quot;3\\. 支持后台同步&quot;">​</a></h4><p>Service Worker 允许在后台执行任务，例如数据同步或推送通知。这使得应用程序可以在不干扰用户的情况下执行一些重要的操作。</p><h4 id="_4-增强的安全性" tabindex="-1">4. 增强的安全性 <a class="header-anchor" href="#_4-增强的安全性" aria-label="Permalink to &quot;4\\. 增强的安全性&quot;">​</a></h4><p>Service Worker 受同源策略的限制，因此它可以提供更安全的资源缓存和请求处理。它还可以用于拦截和处理恶意请求。</p><h4 id="_5-支持推送通知" tabindex="-1">5. 支持推送通知 <a class="header-anchor" href="#_5-支持推送通知" aria-label="Permalink to &quot;5\\. 支持推送通知&quot;">​</a></h4><p>Service Worker 具有推送通知功能，可以通过浏览器向用户发送实时通知，提高用户参与度和留存率。</p><p>参考文章：<a href="https://cloud.tencent.com/developer/article/2343805" target="_blank" rel="noreferrer">在项目中使用Service Worker 与 PWA</a></p>',52),s=[i];function c(l,h,n,p,d,b){return a(),r("div",null,s)}const m=e(o,[["render",c]]);export{k as __pageData,m as default};

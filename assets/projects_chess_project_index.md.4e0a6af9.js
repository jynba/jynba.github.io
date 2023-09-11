import{_ as a,o as e,c as t,O as r}from"./chunks/framework.ed8d50c3.js";const m=JSON.parse('{"title":"GO定向越野—微信小程序","description":"","frontmatter":{},"headers":[],"relativePath":"projects/chess_project/index.md","lastUpdated":1694398683000}'),l={name:"projects/chess_project/index.md"},o=r('<h1 id="go定向越野—微信小程序" tabindex="-1">GO定向越野—微信小程序 <a class="header-anchor" href="#go定向越野—微信小程序" aria-label="Permalink to &quot;GO定向越野—微信小程序&quot;">​</a></h1><p>欢迎来到 GO定向越野—小程序 开源项目的文档！本项目旨在为校内和公司团建活动提供简便、富有体验的户外定向越野服务。</p><p>采用微信小程序云开发技术，结合腾讯位置服务 API 和 MQTT 协议通讯，为组织者和参与者提供开展定向运动的平台。该平台支持个性化定制的打卡点，实时共享位置信息，动态更新榜单数据，以及活跃的社区打卡体验等功能。</p><h2 id="主要工作" tabindex="-1">主要工作 <a class="header-anchor" href="#主要工作" aria-label="Permalink to &quot;主要工作&quot;">​</a></h2><h3 id="_1-mqtt-通讯" tabindex="-1">1. MQTT 通讯 <a class="header-anchor" href="#_1-mqtt-通讯" aria-label="Permalink to &quot;1. MQTT 通讯&quot;">​</a></h3><ul><li>通过EMQX平台接入 MQTT 协议实现通讯，使得活动中支持团队成员数十人同时共享位置。</li><li>相比微信的共享位置功能，该项目在通讯方面无需添加好友，只需使用相同的频道即可互相通讯。</li><li>异常处理：通过捕获异常并处理，实现断线重连机制，同时通过心跳包监测连接状态。</li><li>防抖限制：对于重连请求做防抖限制，避免在短时间内多次连接，从而保证通讯稳定。</li></ul><h3 id="_2-安全通讯" tabindex="-1">2. 安全通讯 <a class="header-anchor" href="#_2-安全通讯" aria-label="Permalink to &quot;2. 安全通讯&quot;">​</a></h3><ul><li>引入 CryptoJS 工具包，采用 AES 算法对通讯进行加密传输，保障通讯安全性。</li></ul><h3 id="_3-优化用户体验" tabindex="-1">3. 优化用户体验 <a class="header-anchor" href="#_3-优化用户体验" aria-label="Permalink to &quot;3. 优化用户体验&quot;">​</a></h3><ul><li>添加防抖功能，防止频繁点击和通讯过程中的多次请求影响页面性能。</li><li>通过此优化，提高了小程序的整体性能，为用户提供更好的体验。</li></ul><h3 id="_4-资源管理与优化" tabindex="-1">4. 资源管理与优化 <a class="header-anchor" href="#_4-资源管理与优化" aria-label="Permalink to &quot;4. 资源管理与优化&quot;">​</a></h3><ul><li>通过分包加载技术，压缩图片等方式解决小程序大小超过 2MB 的限制，保证应用正常运行。</li></ul><h2 id="如何开始" tabindex="-1">如何开始 <a class="header-anchor" href="#如何开始" aria-label="Permalink to &quot;如何开始&quot;">​</a></h2><ol><li>克隆本仓库：<code>git clone https://github.com/jynba/dxyy_project.git</code></li><li>进入项目目录：<code>cd dxyy_project</code></li></ol><h2 id="使用说明" tabindex="-1">使用说明 <a class="header-anchor" href="#使用说明" aria-label="Permalink to &quot;使用说明&quot;">​</a></h2><p>作品演示视频 链接：<a href="https://pan.baidu.com/s/10vNRj9PqyQaLLDJPc3kXEQ?pwd=utwv" target="_blank" rel="noreferrer">https://pan.baidu.com/s/10vNRj9PqyQaLLDJPc3kXEQ?pwd=utwv</a></p><ol><li>打开微信小程序。</li><li>登录你的账号，或者创建一个新账号。</li><li>体验 GO定向越野—小程序 提供的定向越野活动功能，享受个性化的户外体验。</li></ol><p><img src="https://raw.githubusercontent.com/jynba/dxyy_project/master/readme/qrcode.jpg" alt="qrcode"></p><h2 id="贡献与许可" tabindex="-1">贡献与许可 <a class="header-anchor" href="#贡献与许可" aria-label="Permalink to &quot;贡献与许可&quot;">​</a></h2><p>欢迎贡献！如果你有改进或新功能的想法，请提交 pull request。</p><p>本项目基于 <a href="https://gpt.stm32-mqtt.top/LICENSE" target="_blank" rel="noreferrer">MIT 许可证</a> 进行开源。</p>',21),i=[o];function c(h,d,n,s,p,_){return e(),t("div",null,i)}const b=a(l,[["render",c]]);export{m as __pageData,b as default};

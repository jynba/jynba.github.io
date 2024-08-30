import{_ as n,c as s,o as a,a5 as e}from"./chunks/framework.CByBVyi2.js";const h=JSON.parse('{"title":"Nginx 相关","description":"","frontmatter":{},"headers":[],"relativePath":"cs/net/nginx.md","filePath":"cs/net/nginx.md","lastUpdated":1725006636000}'),p={name:"cs/net/nginx.md"},l=e(`<h1 id="nginx-相关" tabindex="-1">Nginx 相关 <a class="header-anchor" href="#nginx-相关" aria-label="Permalink to &quot;Nginx 相关&quot;">​</a></h1><h2 id="如何理解正向代理和反向代理" tabindex="-1">如何理解正向代理和反向代理 <a class="header-anchor" href="#如何理解正向代理和反向代理" aria-label="Permalink to &quot;如何理解正向代理和反向代理&quot;">​</a></h2><ol><li><p>正向代理 客户端发送请求到代理服务器,由<strong>代理服务器为客户端发送请求到网络资源服务器</strong>,将响应返回客户端</p><p>因此,客户端需要知道代理服务器的地址,并且<strong>需要客户端主动设置代理服务器</strong></p><p>其中, 正向代理</p><ul><li><strong>可以向网络资源服务器 隐藏客户端真实的 ip 地址</strong>;</li><li><strong>可以缓存客户端请求的响应,以便下次请求时快速返回结果</strong></li></ul><p>举例:VPN</p></li><li><p>反向代理 客户端发送请求,代理服务器接收客户端的请求,<strong>按照一定的规则(SSL 指定端口)转发</strong>到对应的网络资源服务器上,将响应返回客户端.</p><p>因此<strong>反向代理不需要由客户端设置</strong></p><p>其中, 反向代理</p><ul><li><strong>可以向客户端 隐藏网络资源服务器真实的 ip 和端口</strong>;</li><li><strong>可以通过负载均衡分配请求到多个后端服务器,避免单服务器压力过大,提高系统可靠性和处理能力</strong></li></ul></li></ol><h2 id="vpn-和代理的区别" tabindex="-1">VPN 和代理的区别 <a class="header-anchor" href="#vpn-和代理的区别" aria-label="Permalink to &quot;VPN 和代理的区别&quot;">​</a></h2><p>虚拟专用网络(VPN)是一种媒介，当用户连接互联网时，该媒介会<strong>加密</strong>后再传输数据。虚拟专用网络通常用于保护敏感数据以及匿名浏览互联网。</p><p>与代理服务器相比，最大的不同就是 VPN 将所有的用户请求都<strong>加密</strong>了。虚拟专用网络会将你的原始 IP 地址转换为新的 IP 地址，从而在隐藏你的真实 IP 地址时确保更高的匿名级别。它将允许访问基于地理位置限制的内容。</p><p><a href="https://blog.csdn.net/cbuy888/article/details/82625112" target="_blank" rel="noreferrer">反向代理重定向</a><a href="https://zhuanlan.zhihu.com/p/451825018" target="_blank" rel="noreferrer">代理</a></p><h2 id="使用-nginx-proxy-manager" tabindex="-1">使用 nginx proxy manager <a class="header-anchor" href="#使用-nginx-proxy-manager" aria-label="Permalink to &quot;使用 nginx proxy manager&quot;">​</a></h2><ul><li>可视化创建多个二级域名</li><li>...</li></ul><ol><li><p>下载 docker</p><p>过程可自己查,推荐 curl 获取 sh 文件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>curl -fsSL https://get.docker.com -o get-docker.sh</span></span>
<span class="line"><span>sudo sh get-docker.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>若出现apt报错,可以查看sources,删除无关下载源</span></span>
<span class="line"><span>//sudo vi /etc/apt/sources.list</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p>下载 docker-compose</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt install docker-compose -y</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>在<a href="https://nginxproxymanager.com/setup/#running-the-app" target="_blank" rel="noreferrer">官网</a>找到 docker-compose.yml 复制粘贴</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>version: &#39;3.8&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>app:</span></span>
<span class="line"><span>    image: &#39;jc21/nginx-proxy-manager:latest&#39;</span></span>
<span class="line"><span>    restart: unless-stopped</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>    # These ports are in format &lt;host-port&gt;:&lt;container-port&gt;</span></span>
<span class="line"><span>    - &#39;80:80&#39; # Public HTTP Port</span></span>
<span class="line"><span>    - &#39;443:443&#39; # Public HTTPS Port</span></span>
<span class="line"><span>    - &#39;81:81&#39; # Admin Web Port</span></span>
<span class="line"><span>    # Add any other Stream port you want to expose</span></span>
<span class="line"><span>    # - &#39;21:21&#39; # FTP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Uncomment the next line if you uncomment anything in the section</span></span>
<span class="line"><span>    # environment:</span></span>
<span class="line"><span>    # Uncomment this if you want to change the location of</span></span>
<span class="line"><span>    # the SQLite DB file within the container</span></span>
<span class="line"><span>    # DB_SQLITE_FILE: &quot;/data/database.sqlite&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Uncomment this if IPv6 is not enabled on your host</span></span>
<span class="line"><span>    # DISABLE_IPV6: &#39;true&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>    - ./data:/data</span></span>
<span class="line"><span>    - ./letsencrypt:/etc/letsencrypt</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div></li></ol><ul><li>注意有版本问题,3.8 改成 3 即可</li><li>其中 <code>jc21/nginx-proxy-manager:latest</code> 为英文版本,可以换成 <code>chishin/nginx-proxy-manager-zh</code> 为中文版本,其它不变</li></ul><ol start="4"><li>运行 docker-compose up -d</li></ol><ul><li>注意其中 443 端口可能被占用,需要先清空: <code>sudo fuser -k 443/tcp</code></li></ul><ol start="5"><li>到浏览器查看是否成功部署 ip:81</li></ol><ul><li>查看 ip 命令 <code>curl ifconfig.me</code> 记得开放 81 端口</li></ul><ol start="6"><li><p>按照官网账号密码登录</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>admin@example.com</span></span>
<span class="line"><span>changeme</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>修改密码 邮箱</p></li><li><p>配置反向代理</p><p>client --&gt;[80 443 81] nginx 代理--&gt; server</p></li></ol><p>nginx 将客户端访问端口反向代理到 server 暴露的端口</p><ol start="8"><li>配置二级域名</li></ol><ul><li><p>在仪表盘新增代理服务</p><ul><li><p>配置二级域名 (记得在云服务器上配置 dns 解析)</p></li><li><p>阻止常见漏洞可以 ✔</p></li><li><p>证书最好不要在上面设置,不然不方便管理,每一个二级域名都需要手动设置</p></li><li><p>申请 SSL 证书</p><ul><li>域名写:主域名(不是二级域名)和*.域名(最好都写!!!);</li><li>使用 DNS 认证 ✔</li><li><strong>腾讯云是在 DNSPod 申请 id,key</strong></li></ul></li><li><p>坑!! 提交后报错 Internal Error,An unexpected error occurred: ModuleNotFoundError: No module named &#39;zope&#39; 需要进入 docker,然后下载 zope</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker exec -it &lt;container&gt; /bin/bash</span></span>
<span class="line"><span>pip install zope</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul></li></ul><h3 id="使用-nginx-反向代理-内网-docker0-ip" tabindex="-1">使用 nginx 反向代理 内网 docker0 ip <a class="header-anchor" href="#使用-nginx-反向代理-内网-docker0-ip" aria-label="Permalink to &quot;使用 nginx 反向代理 内网 docker0 ip&quot;">​</a></h3><ul><li><code>docker run -d -p 8099:80 --name nginx1 nginx</code>新开一个容器拉取 nginx 镜像</li></ul><ul><li><code>ip addr show docker0</code>查看 docker ip 172.17.0.1 ???不行,待解决 <a href="https://blog.csdn.net/ithaibiantingsong/article/details/81386307" target="_blank" rel="noreferrer">docker 容器的网络配置</a></li></ul><h3 id="配置-docker-内的-nginx-文件" tabindex="-1">配置 docker 内的 nginx 文件 <a class="header-anchor" href="#配置-docker-内的-nginx-文件" aria-label="Permalink to &quot;配置 docker 内的 nginx 文件&quot;">​</a></h3><p><a href="https://blog.csdn.net/hnw13938056090/article/details/105782931" target="_blank" rel="noreferrer">详情</a><a href="https://blog.csdn.net/weixin_41887155/article/details/107251383" target="_blank" rel="noreferrer">优质参考</a></p><ol><li>进入 nginx 对应 docker</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 清空/etc/apt/sources.list文件</span></span>
<span class="line"><span> echo &gt; /etc/apt/sources.list</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo -e &quot;deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib \\ndeb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib \\ndeb http://mirrors.aliyun.com/debian-security stretch/updates main \\ndeb-src http://mirrors.aliyun.com/debian-security stretch/updates main \\ndeb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib \\ndeb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib \\ndeb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib \\ndeb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib&quot; &gt; /etc/apt/sources.list</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get install vim</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>nginx 项目在 docker 里面存放的目录:</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>日志目录 : /var/log/nginx</span></span>
<span class="line"><span>配置目录 : /etc/nginx/conf.d</span></span>
<span class="line"><span>主配置文件 : /etc/nginx/nginx.conf</span></span>
<span class="line"><span>项目目录 : /usr/share/nginx/html nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>记住对应位置,方便在本地挂载文件到 docker 内 在宿主机创建对应的目录和文件 挂载 注意有一步骤尤其重要: 拷贝容器中 nginx 所有配置文件到本地 docker cp 容器名:/容器目录/文件名 /宿主机目录/文件名</li></ol><p>eg:<code>docker cp 45744:/etc/nginx /data/nginx/conf</code><a href="https://blog.csdn.net/qq_33469537/article/details/126586160" target="_blank" rel="noreferrer">参考</a></p><ul><li><a href="https://blog.csdn.net/sxzlc/article/details/107676425" target="_blank" rel="noreferrer">docker 各种命令</a></li></ul><ol start="3"><li>替换对应 html 即可显示</li></ol>`,32),i=[l];function r(t,c,o,d,b,u){return a(),s("div",null,i)}const g=n(p,[["render",r]]);export{h as __pageData,g as default};

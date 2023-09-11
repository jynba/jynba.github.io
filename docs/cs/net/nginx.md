# Nginx 相关

## 如何理解正向代理和反向代理

1. 正向代理
   客户端发送请求到代理服务器,由**代理服务器为客户端发送请求到网络资源服务器**,将响应返回客户端

   因此,客户端需要知道代理服务器的地址,并且**需要客户端主动设置代理服务器**

   其中, 正向代理

   - **可以向网络资源服务器 隐藏客户端真实的 ip 地址**;
   - **可以缓存客户端请求的响应,以便下次请求时快速返回结果**

   举例:VPN

2. 反向代理
   客户端发送请求,代理服务器接收客户端的请求,**按照一定的规则(SSL 指定端口)转发**到对应的网络资源服务器上,将响应返回客户端.

   因此**反向代理不需要由客户端设置**

   其中, 反向代理

   - **可以向客户端 隐藏网络资源服务器真实的 ip 和端口**;
   - **可以通过负载均衡分配请求到多个后端服务器,避免单服务器压力过大,提高系统可靠性和处理能力**

## VPN 和代理的区别

虚拟专用网络(VPN)是一种媒介，当用户连接互联网时，该媒介会**加密**后再传输数据。虚拟专用网络通常用于保护敏感数据以及匿名浏览互联网。

与代理服务器相比，最大的不同就是 VPN 将所有的用户请求都**加密**了。虚拟专用网络会将你的原始 IP 地址转换为新的 IP 地址，从而在隐藏你的真实 IP 地址时确保更高的匿名级别。它将允许访问基于地理位置限制的内容。

[反向代理重定向](https://blog.csdn.net/cbuy888/article/details/82625112)
[代理](https://zhuanlan.zhihu.com/p/451825018)

## 使用 nginx proxy manager

- 可视化创建多个二级域名
- ...

1. 下载 docker

   过程可自己查,推荐 curl 获取 sh 文件

   ```
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   若出现apt报错,可以查看sources,删除无关下载源
   //sudo vi /etc/apt/sources.list
   ```

2. 下载 docker-compose
   ```
   apt install docker-compose -y
   ```
3. 在[官网](https://nginxproxymanager.com/setup/#running-the-app)找到 docker-compose.yml
   复制粘贴

   ```
   version: '3.8'
   services:
   app:
       image: 'jc21/nginx-proxy-manager:latest'
       restart: unless-stopped
       ports:
       # These ports are in format <host-port>:<container-port>
       - '80:80' # Public HTTP Port
       - '443:443' # Public HTTPS Port
       - '81:81' # Admin Web Port
       # Add any other Stream port you want to expose
       # - '21:21' # FTP

       # Uncomment the next line if you uncomment anything in the section
       # environment:
       # Uncomment this if you want to change the location of
       # the SQLite DB file within the container
       # DB_SQLITE_FILE: "/data/database.sqlite"

       # Uncomment this if IPv6 is not enabled on your host
       # DISABLE_IPV6: 'true'

       volumes:
       - ./data:/data
       - ./letsencrypt:/etc/letsencrypt
   ```

- 注意有版本问题,3.8 改成 3 即可
- 其中 `jc21/nginx-proxy-manager:latest` 为英文版本,可以换成 `chishin/nginx-proxy-manager-zh` 为中文版本,其它不变

4. 运行 docker-compose up -d

- 注意其中 443 端口可能被占用,需要先清空:
  `sudo fuser -k 443/tcp`

5. 到浏览器查看是否成功部署 ip:81

- 查看 ip 命令 `curl ifconfig.me`
  记得开放 81 端口

6. 按照官网账号密码登录

   ```
   admin@example.com
   changeme
   ```

   修改密码 邮箱

7. 配置反向代理

   client -->[80 443 81] nginx 代理--> server

nginx 将客户端访问端口反向代理到 server 暴露的端口

8. 配置二级域名

- 在仪表盘新增代理服务

  - 配置二级域名 (记得在云服务器上配置 dns 解析)
  - 阻止常见漏洞可以 ✔

  - 证书最好不要在上面设置,不然不方便管理,每一个二级域名都需要手动设置
  - 申请 SSL 证书
    - 域名写:主域名(不是二级域名)和\*.域名(最好都写!!!);
    - 使用 DNS 认证 ✔
    - **腾讯云是在 DNSPod 申请 id,key**
  - 坑!! 提交后报错 Internal Error,An unexpected error occurred:
    ModuleNotFoundError: No module named 'zope'
    需要进入 docker,然后下载 zope

    ```
    docker exec -it <container> /bin/bash
    pip install zope
    ```

### 使用 nginx 反向代理 内网 docker0 ip

- `docker run -d -p 8099:80 --name nginx1 nginx`新开一个容器拉取 nginx 镜像

* `ip addr show docker0`查看 docker ip 172.17.0.1
  ???不行,待解决
  [docker 容器的网络配置](https://blog.csdn.net/ithaibiantingsong/article/details/81386307)

### 配置 docker 内的 nginx 文件

[详情](https://blog.csdn.net/hnw13938056090/article/details/105782931)
[优质参考](https://blog.csdn.net/weixin_41887155/article/details/107251383)

1. 进入 nginx 对应 docker

```
# 清空/etc/apt/sources.list文件
 echo > /etc/apt/sources.list


echo -e "deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib \ndeb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib \ndeb http://mirrors.aliyun.com/debian-security stretch/updates main \ndeb-src http://mirrors.aliyun.com/debian-security stretch/updates main \ndeb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib \ndeb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib \ndeb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib \ndeb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib" > /etc/apt/sources.list

apt-get update

apt-get install vim
```

- nginx 项目在 docker 里面存放的目录:

```
日志目录 : /var/log/nginx
配置目录 : /etc/nginx/conf.d
主配置文件 : /etc/nginx/nginx.conf
项目目录 : /usr/share/nginx/html nginx
```

2. 记住对应位置,方便在本地挂载文件到 docker 内
   在宿主机创建对应的目录和文件
   挂载
   注意有一步骤尤其重要:
   拷贝容器中 nginx 所有配置文件到本地
   docker cp 容器名:/容器目录/文件名 /宿主机目录/文件名

eg:`docker cp 45744:/etc/nginx /data/nginx/conf`
[参考](https://blog.csdn.net/qq_33469537/article/details/126586160)

- [docker 各种命令](https://blog.csdn.net/sxzlc/article/details/107676425)

3. 替换对应 html 即可显示

### 如何使用docker部署nginx网站

  :::tip 原文地址
  [如何使用docker部署nginx网站及docker的实用命令 | GitHub](https://github.com/jynba/jynba.github.io/issues/68)
  :::
  *  **具体操作**：
1. 首先，由于nginx中的文件目录结构比较分散，因此我们可以选中先运行一个nginx的test容器，拷贝其中的配置文件；
2. 映射对应端口号，运行nginx容器，挂载到前置准备的配置文件的路径；

代码如下：
```js
mkdir -p ./nginx/{logs,conf,html}
docker run -d --name nginx-test nginx
docker cp nginx-test:/etc/nginx/conf.d ./nginx/conf
docker cp nginx-test:/etc/nginx/nginx.conf ./nginx/conf/nginx.conf
docker cp nginx-test:/usr/share/nginx/html/index.html ./nginx/html/index.html
docker rm -f nginx-test

docker run -it -p 4567:80 --name nginx-handle \
-v ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v ./nginx/html:/usr/share/nginx/html \
-v ./nginx/logs:/var/log/nginx \
-d nginx
```

### docker的实用命令
![image](https://github.com/user-attachments/assets/fc9e5634-d28d-40d3-828b-02a46290d29c)

具体讲解某几个常用命令：
1. `docker inspect` 查看容器挂载信息
`grep -A num`查看匹配后 num行数据
`docker inspect b25868038373 | grep -A 4 "Binds"`

2. `docker pull` `docker images` `docker rmi` 操作镜像相关：拉取/展示/删除

3. `docker ps` `docker run` `docker exec` 操作容器相关：展示/启动容器/进入容器




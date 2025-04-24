> 本文主要讲小程序怎么直接连接mqtt进行通讯，包含以下内容：一、如何在docker上部署EMQX；二、如何小程序连接mqtt；三、如何配置域名反向代理websocket(使得小程序线上可以访问到)...

  :::tip 原文地址
  [小程序如何连接MQTT服务器(配置反向代理) | GitHub](https://github.com/jynba/jynba.github.io/issues/77)
  :::
  
### 🧩如何在docker上部署EMQX
参考文档：
[通过 Docker Compose 构建 EMQX 集群](https://docs.emqx.com/zh/emqx/latest/deploy/install-docker-ce.html#%E9%80%9A%E8%BF%87-docker-compose-%E6%9E%84%E5%BB%BA-emqx-%E9%9B%86%E7%BE%A4)

1. 在任意目录创建 docker-compose.yml 文件，内容如下：
```yaml
version: '3'

services:
  emqx1:
    image: emqx/emqx:5.8.6
    container_name: emqx1
    environment:
    - "EMQX_NODE_NAME=emqx@node1.emqx.io"
    - "EMQX_CLUSTER__DISCOVERY_STRATEGY=static"
    - "EMQX_CLUSTER__STATIC__SEEDS=[emqx@node1.emqx.io,emqx@node2.emqx.io]"
    healthcheck:
      test: ["CMD", "/opt/emqx/bin/emqx", "ctl", "status"]
      interval: 5s
      timeout: 25s
      retries: 5
    networks:
      emqx-bridge:
        aliases:
        - node1.emqx.io
    ports:
      - 1883:1883
      - 8083:8083
      - 8084:8084
      - 8883:8883
      - 18083:18083 
    # volumes:
    #   - $PWD/emqx1_data:/opt/emqx/data

  emqx2:
    image: emqx/emqx:5.8.6
    container_name: emqx2
    environment:
    - "EMQX_NODE_NAME=emqx@node2.emqx.io"
    - "EMQX_CLUSTER__DISCOVERY_STRATEGY=static"
    - "EMQX_CLUSTER__STATIC__SEEDS=[emqx@node1.emqx.io,emqx@node2.emqx.io]"
    healthcheck:
      test: ["CMD", "/opt/emqx/bin/emqx", "ctl", "status"]
      interval: 5s
      timeout: 25s
      retries: 5
    networks:
      emqx-bridge:
        aliases:
        - node2.emqx.io
    # volumes:
    #   - $PWD/emqx2_data:/opt/emqx/data

networks:
  emqx-bridge:
    driver: bridge
```

2. 执行 `docker-compose up -d`命令
3. 执行`docker ps`查看容器是否执行成功； 
4. 记得在云服务器上开放端口
5. 访问ip:18083是否能够看到Dashboard； 默认账号admin密码public

各个端口的用途：
* 8083：非加密的MQTT over WebSocket
* 8084：加密的MQTT over WebSocket（TLS）
* 18083：MQTT代理的管理控制台端口（如EMQX的Dashboard）
* 1883：适用于内网或安全性要求不高的环境

### 🧠小程序连接Mqtt
* 值得一提的是，在开发者工具中不校验域名可以用IP，实际上线需要用域名，因此需要服务器配置WebSocket反向代理
```ts
// 先pnpm i mqtt引入mqtt
import * as mqtt from 'mqtt/dist/mqtt.min.js';
// MQTT配置
const mqttConfig = {
  host: 'xxxxxx',//在开发者工具中不校验域名可以用ip，实际上线需要用域名，因此需要服务器配置websocket反向代理
  options: {
    protocolVersion: 4,
    keepalive: 10,
    clientId: uni.getStorageSync('clientId') || '',
    clean: true,
    password: 'xxxxx.',
    username: 'xxxxx',
    reconnectPeriod: 1000,
    connectTimeout: 30000,
    resubscribe: true
  }
};
  client = mqtt.connect('wxs://'.concat(mqttConfig.host, '/mqtt'), mqttConfig.options);
  client.on('connect', () => {
    console.log('成功连上MQTT服务器！');
  });
```

### 🗝️配置域名反向代理websocket
参考文档：
[微信小程序接入](https://docs.emqx.com/zh/emqx/latest/connect-emqx/wechat-miniprogram.html)

* 默认连接是ip+8083端口连接

![Image](https://github.com/user-attachments/assets/9125f8c5-d707-4791-a3b6-7a71986c670d)

* **注意代理的是8083端口**

```bash
    location /mqtt {
      proxy_pass http://ip:8083;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # client_max_body_size 35m;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";    
    }
```
![Image](https://github.com/user-attachments/assets/69ec758d-9db9-42d1-a968-ef37d35e52e3)

* 我这里是用子域名 mqtt.cvcvcvcv.com代理，将 `/mqtt `转发到`ip:8083`的端口； 所以注意是用443访问https，如果是http则是80；

![Image](https://github.com/user-attachments/assets/73c8b412-573e-4d8f-85c1-13ace3095e0f)


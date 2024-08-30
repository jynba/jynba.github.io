> 之前的域名和服务器过期了（后悔只买了一年），所以我不得不重新走一遍部署流程；还是使用我最爱的nginx proxy manager对我的子域名进行管理，我发现之前可以部署ssl证书的，突然不行了，我搜了一下发现是这个问题，之前可能也有遇到，但是我忘了。

  :::tip 原文地址
  [nginx proxy manger中部署ssl证书出现问题： 安装 zope包 | GitHub](https://github.com/jynba/jynba.github.io/issues/36)
  :::
  ![image](https://github.com/jynba/jynba.github.io/assets/75623303/93597679-b751-4805-ad48-212aec65bf03)

- 解决方法：
docker exec -it docker-id /bin/bash 
pip install zope

其他一劳永逸的方法：直接写进dockerfile，参考[https://www.xiaocaicai.com/2023/07/nginx-proxy-manager-%e5%ae%89%e8%a3%85-zope%e5%8c%85/]

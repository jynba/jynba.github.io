## 如何使用子域名CNAME到github page?

  :::tip 原文地址
  [如何使用子域名CNAME到github page? | GitHub](https://github.com/jynba/jynba.github.io/issues/7)
  :::
  
> 觉得github page后缀中的github.io太生草了，但是又觉得每次都要手动同步上传到服务器太麻烦，起初我是使用github Actions自动化脚本通过ssh和sftp帮我上传到服务器，但是每次上传腾讯云老提示我不安全，服务器账号异地登陆了！

> 其实我只是想通过域名访问，因此没必要那么麻烦，只需要配置CNAME，将域名指向github.io的域名即可_**若是重定向则是域名跳转，域名是会变的**_（CNAME是域名的指向(DNS层面)，301重定向是域名的跳转(http层面)）

* 在域名解析中添加xxx.github.io
*  在代理中添加xxx.github.io的ip地址，并设置ssl
*  在对应仓库的setting中设置custom domain，设置gh-page为博客主页面
* **注意：还要在项目中配置cname:xxx，或添加CNAME文件，我是在deploy.yml最后添加cname:xxx，里面记录你要CNAME的子域名，代表的是运行子域名访问github page（否则每次deploy之后，都会恢复成github.io）
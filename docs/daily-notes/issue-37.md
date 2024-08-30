> 忘了之前怎么自定义域名了，搜了一下，又会了hh，把博客设置在了blog.cvcvcvcv.com子域名下了。我发现我之前写过QAQ，[部署GithubPage到自定义域名](https://github.com/jynba/jynba.github.io/issues/7) 再记一下，免得下次又忘记了。[参考链接](https://zhuanlan.zhihu.com/p/142185293)

  :::tip 原文地址
  [如何为GitHubPage设置自定义域名？ | GitHub](https://github.com/jynba/jynba.github.io/issues/37)
  :::
  
- **步骤介绍**
1. 添加子域名的主机记录：记得要用CNAME！（不然待会也会提醒你用cname） 然后主机记录值用 xxx.github.io
![image](https://github.com/jynba/jynba.github.io/assets/75623303/d8b21d7e-7dce-4f90-bf18-341591bd7049)
2. 在setting页面设置github page的custom domain
3. **注意**：还要在项目中配置cname:xxx，或添加CNAME文件，我是在deploy.yml最后添加cname:xxx，里面记录你要CNAME的子域名，代表的是运行子域名访问github page（否则每次deploy之后，都会恢复成github.io）
![image](https://github.com/jynba/jynba.github.io/assets/75623303/0a611e4a-f0c0-4005-a322-7b78ac55ee65)

### Octokit，一个用于与 GitHub API 交互的工具

  :::tip 原文地址
  [Octokit，一个用于与 GitHub API 交互的工具 | GitHub](https://github.com/jynba/jynba.github.io/issues/60)
  :::
  [源码地址](https://github.com/octokit/octokit.js)

[文档地址](https://docs.github.com/zh/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28)

> 如果想使用 JavaScript 编写一个脚本来与 GitHub 的 REST API 进行交互，GitHub 建议使用 Octokit.js SDK。 Octokit.js 由 GitHub 维护。 SDK 实现了最佳做法，可让你更轻松地通过 JavaScript 与 REST API 进行交互。 Octokit.js 适用于所有新式浏览器、Node.js 和 Deno。 有关 Octokit.js 的详细信息，请参阅 [Octokit.js 自述文件](https://github.com/octokit/octokit.js/#readme)。

1. [无需身份验证即可实例化](https://docs.github.com/zh/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28#instantiating-without-authentication)
可以在不进行身份验证的情况下使用 REST API，但速率限制较低，并且无法使用某些终结点。 若要在不进行身份验证的情况下创建 Octokit 实例，则不需要 auth 参数。

2. 若要身份验证的情况下可以使用个人令牌；

3. 如果要在 GitHub Actions 工作流中使用 API，则 GitHub 建议使用内置 GITHUB_TOKEN 进行身份验证


[api文档](https://octokit.github.io/rest.js/v18/#issues-list-for-repo) 内含有很多方法，可操作 repository、pull request、users、comment、issue...，可以用它开发出有创意且实用的工具。

* **获取issues方法**
```js
  const { data } = await octokit.issues.listForRepo({
    owner,//用户
    repo,//仓库
    sort: 'created',
    state: 'all',
    per_page: 100
  })
```
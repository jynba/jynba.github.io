## 扫码普通二维码跳转携带参数进入小程序需要做哪些操作呢？

  :::tip 原文地址
  [扫码普通二维码跳转携带参数进入小程序 | GitHub](https://github.com/jynba/jynba.github.io/issues/48)
  :::
  1. 普通二维码在正常情况下是无法进入小程序的，需要配置后才可跳转小程序
**方法**：在微信公众平台-开发管理-扫普通链接二维码打开小程序中配置对应的域名和参数
2. 如何获取到普通二维码携带的参数呢？
**方法**：在onLoad中的参数会有一个q的属性，属性中会携带加密的url，需要使用decodeURIComponent解密后即可解析获取参数

```js
// 获取 url search 参数
export function getSearchParams<T>(url: string): T {
  if (!url) return {} as T;
  const searchParams: { [key: string]: string } = {};
  const search = url.split('?')[1];

  if (search) {
    const params = search.split('&');
    for (let i = 0; i < params.length; i++) {
      const param = params[i].split('=');
      const key = decodeURIComponent(param[0]);
      const value = decodeURIComponent(param[1]);
      searchParams[key] = value;
    }
  }
  return searchParams as T;
}

onLoad(e) {
	const query = decodeURIComponent(e.q) 
	console.log(query)
        const {xxx} = getSearchParams(query);
},
```
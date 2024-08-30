> AbortController：从 v0.22.0 开始，Axios 支持以 fetch API 方式—— AbortController 取消请求。

  :::tip 原文地址
  [如何中断已发出去的请求？AbortController/CancelToken.source | GitHub](https://github.com/jynba/jynba.github.io/issues/10)
  :::
  
> CancelToken：此 API 从 v0.22.0 开始已被弃用，不应在新项目中使用。

## 应用场景
1. 页面切换频繁，当上一个请求返回时间比下一个请求返回时间长，可能会导致页面错乱
2. 页面切换时，尚未返回的请求则中止，性能优化。
3. 普通防抖当请求响应时间大于设定的防抖的时间时，还是会出错。（tip：也可通过后端返回counter，重复点击时counter++，匹配最后一次的counter是否一直来解决）

## 具体实现
* CancelToken.source()方法，将source.token传给axios的config中的cancelToken，通过调用source.cancel("cancel~")来中止请求
```
// method 1 
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
});

source.cancel('Operation canceled by the user.');
```
* 通过CancelToken构造器中的executor函数，参数为一个改变 this.promise 状态的回调函数，将他赋值给外部变量，再调用即可实现中止请求
```
// method 2
const CancelToken = axios.CancelToken;
let cancel;
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

cancel();
```
* AbortController类作为abort事件控制器，其中有signal属性，将其作为config的参数，直接调用AbortController类实例中的abort方法实现中止请求
```
// method 3
const controller = new AbortController();
axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});

controller.abort();
```
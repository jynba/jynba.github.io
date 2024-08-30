## 请求配置JWT，无感刷新token

  :::tip 原文地址
  [请求配置JWT，无感刷新token | GitHub](https://github.com/jynba/jynba.github.io/issues/47)
  :::
  **jwt大白话**：登录时后端会返回一个token，前端需要把这个token带在此后的每个请求的请求头(Authorization: Bearer enxxxxxxxx)，当携带的token不合法时，后端就会返回403，前端接收后跳转重新请求登录。
其中：怎么样就算token不合法呢？token中会包含后端对时间base64加密，且后端设置了token过期时间，当前端传过去的token时间过期或者格式不对，也属于不合法。
这样一来在用户使用体验上会有一个问题，用户用着用着就需要重新登录，体验不好。因此，我们可以考虑使用无感刷新token来避免跳转登录。
**前提**：1. 前后端预定好token过期时间 （或后端返回过期时间）
* **方法一**：在请求发起前拦截每个请求，判断token的有效时间是否已经过期，若已过期，则将请求挂起，先刷新token后再继续请求。
* 缺点：需要返回时间，判断是否过期
* **方法二**：不在请求前拦截，而是拦截返回后的数据。先发起请求，接口返回过期后，先刷新token，再进行一次重试。
* 缺点：需要请求两次
### 代码实现：(方法1）
1. 在http请求中 拦截除了登录请求外的其他请求，在请求前先解码token，获取时间，判断时间是否过期，若过期则将请求挂起，注意要将此时的请求存进队列中，通过设置一个flag来判断是否正在刷新token，等待token刷新后在重新请求队列。
```js
  private async mergeDefaultHeader<U>(config: IRequestType<U>) {
    //过滤白名单
    if (!filterUrl(config.url)) {
      const token: string = uni.getStorageSync(TOKEN);
      if (token) {
        // 判断token是否过期
        const epired_in = JSON.parse(base64.decode(token.split('.')[1])).exp;
        const now = new Date().getTime();
        console.log(new Date(epired_in * 1000), new Date());

        if (epired_in * 1000 < now + TOKEN_EXPIRE) {
          this.refreshToken(config, () => {});
          return false; //将该请求挂起
        }
      }
      config.header.Authorization = `Bearer ${token}`;
      console.log('config.header.Authorization ', config.header.Authorization);
    }
    return Object.assign({}, this.header, config.header);
  }

  private refreshToken<T, U>(config: IRequestType<U>, resolve: any) {
    this.waitRequestQueue.push(() => {
      resolve(this.request(config));
    });
    if (!refreshing) {
      refreshing = true;
      login()
        .then(() => {
          // 重新请求队列
          this.waitRequestQueue.map((MT) => {
            MT();
          });
          this.waitRequestQueue = []; //清空队列
        })
        .finally(() => {
          //解除正在刷新
          refreshing = false;
        });
    }
  }
```
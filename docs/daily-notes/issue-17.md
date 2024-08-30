> 今天在[Cesium中加载大规模数据稳定流畅之性能优化思路](https://blog.csdn.net/wtuynqy/article/details/129025722)文章看到这个`WebAssembly`，等好奇就搜了一下，

  :::tip 原文地址
  [什么是WebAssembly(wasm)？ | GitHub](https://github.com/jynba/jynba.github.io/issues/17)
  :::
  > 文章这样写的：使用 WebAssembly 技术：将计算任务交给 WebAssembly，可以提高计算性能，从而提高加载和渲染性能。可以使用 Cesium 提供的 WebAssembly 功能或其他第三方工具进行 WebAssembly 开发。

### 什么是WebAssembly？
WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C / C ++等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。 简单讲就是：将C/C++放到web上运行，与js共存

值得一提的是，Figma就是用wasm；

> 为什么wasm适合计算复杂的问题，为什么性能好？ 因为wasm是使用C/C++等CPU密集型语言运行，在计算效率上是远远优于IO密集型(Nodejs，浏览器)，因此在前端高性能计算领域（如多功能视频播放器，音频转码工具，网页游戏，加解密）都有非常广泛的应用前景

### 如何使用webAssembly?
直接从流式底层源传输 .wasm 模块，然后对其进行编译和实例化，并通过 ResultObject 实现 promise。由于 instantiateStreaming() 函数接受对 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象的 promise，因此你可以直接向其传递 [fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 调用，然后它将把返回的 response 传递给随后的函数。

```js
var importObject = { imports: { imported_func: (arg) => console.log(arg) } };

WebAssembly.instantiateStreaming(fetch("simple.wasm"), importObject).then(
  (obj) => obj.instance.exports.exported_func(),
);
```
或者
```js
function fetchAndInstantiate(url, importObject) {
  return fetch(url).then(response =>
    response.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, importObject)
  ).then(results =>
    results.instance
  );
}
```
[参考](https://zhuanlan.zhihu.com/p/417035181)

* 在线将C++转微wasm：https://mbebenita.github.io/WasmExplorer/
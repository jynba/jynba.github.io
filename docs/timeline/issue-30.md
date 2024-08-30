> JavaScript 可以阻塞 DOM 的生成，也就是说当浏览器在解析 HTML 文档时，如果遇到 <script>，便会停下对 HTML 文档的解析，转而去处理脚本。如果脚本是内联的，浏览器会先去执行这段内联的脚本，如果是外链的，那么先会去加载脚本，然后执行。在处理完脚本之后，浏览器便继续解析 HTML 文档。

  :::tip 原文地址
  [DOMContentLoaded与Load详解 | GitHub](https://github.com/jynba/jynba.github.io/issues/30)
  :::
  
### load

> MDN的解释：load 应该仅用于检测一个完全加载的页面
> 当一个资源及其依赖资源已完成加载时，将触发load事件。

- 意思是页面的html、css、js、图片等资源都已经加载完之后才会触发 load 事件。
即是说
**当页面 DOM 结构中的 js、css、图片，以及 js 异步加载的 js、css 、图片都加载完成之后，才会触发 load 事件。**

### DOMContentLoaded

> MDN的解释：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

- 意思是HTML下载、解析完毕之后就触发。
即是说
**DOMContentLoaded 事件在 html文档加载完毕，并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发。**

![image](https://github.com/jynba/jynba.github.io/assets/75623303/691a6c79-06c1-4327-8642-25bae9fa0bad)

- 对于通过 async 和 defer 引用脚本，DOMContentLoaded触发时机存在差异：

（1）普通JS/sync（同步）
文档解析的过程中，如果遇到script脚本，就会停止页面的解析进行下载，当脚本都执行完毕后，才会继续解析页面。
![image](https://github.com/jynba/jynba.github.io/assets/75623303/e7ddff6c-7b6b-4dfa-aea1-b75ad4d7cd5d)

（2）async（异步）
async 脚本会在加载完毕后执行，下面两种情况都是有可能发生的：
①HTML 还没有被解析完的时候，async 脚本已经加载完了；那么 HTML 停止解析，去执行脚本，脚本执行完毕后继续 HTML 加载与解析，HTML 解析完了之后触发 DOMContentLoaded 事件。
![image](https://github.com/jynba/jynba.github.io/assets/75623303/50458362-02ed-45bc-b3fc-d6ae677ab36f)

②HTML 解析完了之后，async脚本才加载完，然后再执行脚本；那么在HTML解析完毕、async 脚本还没加载完的时候就触发 DOMContentLoaded 事件。
![image](https://github.com/jynba/jynba.github.io/assets/75623303/c8d2d839-1e7a-4b56-9306-ef9201ae1ad1)

（简而言之，HTML解析完再去执行DOMContentLoaded ，而若async在HTML解析完成前加载完，则照常执行async）
（3）defer
文档解析时遇到设置了 defer 的脚本，就会在后台进行下载，但是并不会阻止文档的渲染，当页面解析和渲染完毕后，会等到所有的 defer 脚本加载完毕并按照顺序执行完毕才会触发 DOMContentLoaded 事件，下面两种情况都是有可能发生的：
①HTML 还没有被解析完的时候，defer脚本已经加载完了，那么 等待HTML 解析完成后执行脚本，脚本执行完毕后触发 DOMContentLoaded 事件。
![image](https://github.com/jynba/jynba.github.io/assets/75623303/f7b77266-eddf-46d3-a2a6-ce920b5ce6b1)

②HTML 解析完了之后，defer脚本才加载完，然后再执行脚本，脚本执行完毕后触发 DOMContentLoaded 事件。
（简而言之，HTML解析完与否，都会等defer执行完再去执行DOMContentLoaded ）
![image](https://github.com/jynba/jynba.github.io/assets/75623303/05ab2d94-5ce1-47b4-b8e0-94000cf0ee49)

参考来源：https://juejin.cn/post/7214831158873751607
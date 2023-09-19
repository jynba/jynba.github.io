# 什么是微前端?

## 微前端特性

- **技术栈无关**   主框架不限制接入应用的技术栈，子应用可自主选择技术栈（vue，react，jq，ng 等）
- **独立开发/部署**  各个团队之间仓库独立，单独部署，互不依赖
- **增量升级**   当一个应用庞大之后，技术升级或重构相当麻烦，而微应用具备渐进式升级的特性
- **独立运行时**   微应用之间运行时互不依赖，有独立的状态管理

## 微前端方案

### iframe 方案

- 特点
  接入比较简单
  隔离非常稳完美

- 不足
  dom 割裂感严重，弹框只能在 iframe，而且有滚动条
  通讯非常麻烦，而且刷新 iframe url 状态丢失
  前进后退按钮无效

### qiankun 方案

qiankun 方案是基于 single-spa 的微前端方案。

- 特点
  html entry 的方式引入子应用，相比 js entry 极大的降低了应用改造的成本；
  完备的沙箱方案，js 沙箱做了 SnapshotSandbox、LegacySandbox、ProxySandbox 三套渐进增强方案，css 沙箱做了 strictStyleIsolation、experimentalStyleIsolation 两套适用不同场景的方案；
  做了静态资源预加载能力；

- 不足
  适配成本比较高，工程化、生命周期、静态资源路径、路由等都要做一系列的适配工作；
  css 沙箱采用严格隔离会有各种问题，js 沙箱在某些场景下执行性能下降严重；
  无法同时激活多个子应用，也不支持子应用保活；
  无法支持 vite 等 esmodule 脚本运行；

底层原理 js 沙箱使用的是 proxy 进行快照然后用用 with(window){} 包裹起来 with 内的 window 其实就是 proxy.window 我们声明变量 var name = '小满' 实际这个变量挂到了 proxy.window 并不是真正的 window
css 沙箱原理 第一个就是 shadowDom 隔离 第二个类似于 Vue 的 scoped [data-qiankun-426732]

### micro-app 方案

micro-app 是基于 webcomponent + qiankun sandbox 的微前端方案。

- 特点
  使用 webcomponet 加载子应用相比 single-spa 这种注册监听方案更加优雅；
  复用经过大量项目验证过 qiankun 的沙箱机制也使得框架更加可靠；
  组件式的 api 更加符合使用习惯，支持子应用保活；
  降低子应用改造的成本，提供静态资源预加载能力；

- 不足
  接入成本较 qiankun 有所降低，但是路由依然存在依赖； （虚拟路由已解决）
  多应用激活后无法保持各子应用的路由状态，刷新后全部丢失； （虚拟路由已解决）
  css 沙箱依然无法绝对的隔离，js 沙箱做全局变量查找缓存，性能有所优化；
  支持 vite 运行，但必须使用 plugin 改造子应用，且 js 代码没办法做沙箱隔离；
  对于不支持 webcompnent 的浏览器没有做降级处理；

### EMP 方案

EMP 方案是基于 webpack 5 module federation 的微前端方案。
特点

webpack 联邦编译可以保证所有子应用依赖解耦；
应用间去中心化的调用、共享模块；
模块远程 ts 支持；

- 不足
  对 webpack 强依赖，老旧项目不友好；
  没有有效的 css 沙箱和 js 沙箱，需要靠用户自觉；
  子应用保活、多应用激活无法实现；
  主、子应用的路由可能发生冲突；

底层原理 这个东西有点类似于拆包，也可以叫模块共享，例如 React 有个模块可以共享给 Vue 项目用 Vue2 的组件可以共享给 Vue3 用。

### 无界微前端 方案

预览 demo wujie-micro.github.io/demo-main-v…\*\*

- 特点
  接入简单只需要四五行代码
  不需要针对 vite 额外处理
  预加载(requestIdleCallback)
  应用保活机制
- 不足
  隔离 js 使用一个空的 iframe 进行隔离
  子应用 axios 需要自行适配
  iframe 沙箱的 src 设置了主应用的 host，初始化 iframe 的时候需要等待 iframe 的 location.orign 从'about:blank'初始化为主应用的 host，这个采用的计时器去等待的不是很悠亚。

### 无界传参

1.我们之前讲过无界的架构子应用的 js 是存放在 iframe 的，既然是 iframe 就可以通过 window 进行通讯，

主应用定义一个全局变量

```js
var a = 'jy'
```

子应用通过 window.parent.a 就可以访问到

```javascript
const send = () => {
  console.log(alert(window.parent.a))
}
```

2.通过 props 给子应用注入参数

```xml
<WujieVue :props="{name:'jy',age:18}"  url="http://127.0.0.1:5174/" name="vue3"></WujieVue> <!--子应用vue3-->
```

子应用可以通过[$wujie](https://link.juejin.cn?target=https%3A%2F%2Fwujie-micro.github.io%2Fdoc%2Fapi%2Fwujie.html%23wujie-props)来获取：

```js
window.$wujie.props
```

如果报错$wujie 可以添加声明文件

```ts
declare global {
  interface Window {
    $wujie: {
      props: Record<string, any>
    }
  }
}
```

3.event bus

主应用通过 bus 监听

```js
import { bus } from 'wujie'
bus.$on('vue3', (data: any) => {
  console.log(data)
})
```

子应用通过 emit 触发事件（反之也可以 主应用 emit 触发子应用 on 监听）

```js
window.$wujie.bus.$emit('vue3', { name: 'jy', age: 18 })
```

### 明确需求

  :::tip 原文地址
  [搭建移动端组件库，在对比了N个移动端组件库后，我终于有了选择 | GitHub](https://github.com/jynba/jynba.github.io/issues/55)
  :::
  我心目中的移动端组件库应该具备：
1. 支持npm下载，支持按需导入；
2. 支持vite、具有vitepress编写文档 （个人的vite 情节，不会用webpack [doge]）
3. TypeScript/Vue3 setup/Uni-App 兼容
4. 支持在线预览展示（便于开发者、使用者直观体验）
5. 更新时具有方便的脚本文件（尽量使用脚本操作，方便开发更新使用）
6. 代码耦合性低，支持一键配置（）

对比移动端组件库包括但不仅限于如下（此外还有一些web端组件库）：
[NutUI](https://link.juejin.cn/?target=https%3A%2F%2Fnutui.jd.com%2F%23%2F) - 京东研发的移动端 UI 组件库，支持 Vue3、Taro 多端适配，面向电商业务场景
[Vant](https://link.juejin.cn/?target=https%3A%2F%2Fvant-contrib.gitee.io%2Fvant%2F%23%2Fzh-CN%2Fhome) - 有赞研发的移动端 UI 组件库，支持 Vue3、微信小程序、支付宝小程序
[TDesign Mobile](https://link.juejin.cn/?target=https%3A%2F%2Ftdesign.tencent.com%2Fmobile-vue%2Fgetting-started) - 腾讯研发的移动端组件库，适合在 Vue3 技术栈项目中使用
[Ant Design Mobile](https://link.juejin.cn/?target=https%3A%2F%2Fmobile.ant.design%2Fzh) - 蚂蚁金服研发的移动端组件库，支持 React
参考文章：[主流移动端组件库的对比和分析](https://juejin.cn/post/7120411647742590990)

最后我发现京东的uniapp版本的[NutUI](https://nutui-uniapp.netlify.app/)是最最符合我需求的，于是我开始基于NutUI搭建自己的移动端组件库。

### 代码结构分析
```md
.
|-- CHANGELOG.md
|-- LICENSE
|-- README.md
|-- changelogithub.config.ts
|-- commitlint.config.cjs
|-- **docs**
|-- eslint.config.js
|-- **example**
|-- node_modules
|-- package.json
|-- **packages**
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
|-- scripts
`-- tsconfig.json
```
1. 注意到其中主要有三大部分，**docs、example、packages，分别是文档、在线预览的h5页面、源文件(要发npm包的)**
2. 使用**monorepo**进行管理，配置**pnpm-workspace**，对于相同的以来可以在最外部进行安装即可
3. 编写**scripts脚本**，内含：web-types.ts(基于components-helper生成组件提示)、uni.ts(同步汇总更新文档，生成xxx-uni.vue) publish.ts打包发布npm ...

### 文档组件在线预览
* 简而言之：通过使用 iframe 嵌入example代码，识别当前文档的路由来同步演示界面的路由
```js
import { computed, onMounted, watch } from 'vue'
import { useData, useRouter } from 'vitepress'

const { route, go } = useRouter()
const isComponentPage = computed(() => route.path.startsWith('/components'))

const iframeUrl = computed(() => {
  const path = route.path.replace('/components', '').split('.')[0]

  return import.meta.env.DEV
    ? `http://localhost:5173/ui/#/pages/demo${path}/index`
    : `/ui/#/pages/demo${path}/index`
})
```

#### touch-emulator模拟多点触摸
* Source：https://github.com/hammerjs/touchemulator



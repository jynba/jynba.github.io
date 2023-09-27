import type { DefaultTheme } from 'vitepress'
const fe: DefaultTheme.SidebarItem[] = [
  {
    text: 'HTML / CSS 语法',
    collapsed: true,
    items: [
      { text: 'HTML', link: '/fe/html/html' },
      { text: 'CSS', link: '/fe/css/css' },
      { text: 'Flex', link: '/fe/css/flex' },
      { text: 'Grid', link: '/fe/css/grid' },
      { text: 'Less', link: '/fe/css/less' },
    ],
  },
  {
    text: 'JavaScript',
    collapsed: true,
    items: [
      { text: 'JS 简介', link: '/fe/js/what_is_js' },
      { text: 'JS 数组', link: '/fe/js/array' },
      { text: 'Web Storage 浏览器本地存储', link: '/fe/js/webstorage' },
      { text: 'JS 模块化', link: '/fe/js/js_modules' },
    ],
  },
  {
    text: 'Vue',
    collapsed: true,
    items: [
      { text: 'Vue 核心基础', link: '/fe/vue/vue_core_basis' },
      { text: 'Vue 组件化编程', link: '/fe/vue/vue_component_coding' },
      { text: 'Vue 组件进阶', link: '/fe/vue/vue_component_advanced' },
      { text: 'Vue 脚手架', link: '/fe/vue/vue_cli' },
      { text: 'Vue 网络请求', link: '/fe/vue/vue_network_request' },
      { text: 'Vuex', link: '/fe/vue/vuex' },
      { text: 'Vue Router', link: '/fe/vue/vue_router' },
      { text: 'Vue3', link: '/fe/vue/vue3' },
    ],
  },
  {
    text: 'Other',
    collapsed: true,
    items: [
      { text: 'Git指令', link: '/fe/git/git' },
      { text: 'Webpack', link: '/fe/webpack/webpack_basis' },
      { text: 'Vscode', link: '/fe/ide/vscode' },
      { text: 'Vuepress', link: '/fe/vuepress/vuepress' },
      { text: 'Vitepress', link: '/fe/vuepress/vitepress' },
      { text: '前端编程题', link: '/fe/js/coding_problem' },
      { text: '微前端', link: '/fe/microFrontends/microFrontends' },
      { text:'无界_微前端框架',link:'/fe/microFrontends/wujie' },
      { text: 'requestIdleCallback和requestAnimationFrame', link: '/fe/microFrontends/rAF_rSC' },
    ],
  },
]

export default fe

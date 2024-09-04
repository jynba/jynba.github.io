import { head, nav, sidebar, algolia } from './configs'
import { defineConfig, PageData } from 'vitepress'
const links: { url: string; lastmod: PageData['lastUpdated'] }[] = []

export default defineConfig({
  title: 'GRIT',
  description: 'JY的前端小窝',
  outDir: '../dist',
  base: '/',
  lastUpdated: true, // 页面上展示最后更新的时间
  head,

  // 不显示html后缀
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    i18nRouting: false,
    logo: '/logo.ico', // 也是放在/public目录中
    nav,
    // 配置github地址
    socialLinks: [{ icon: 'github', link: 'https://github.com/jynba/' }],

    // 配置从导航栏进去后的侧边栏
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright ©jy | 备案号：<a href="https://beian.miit.gov.cn/">粤ICP备2024200418号-1</a>',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',
  },
  /* 生成站点地图 */
  sitemap: {
    hostname: 'https://jyblog.cvcvcvcv.com/',
  },
})

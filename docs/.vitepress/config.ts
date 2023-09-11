import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import { head, nav, sidebar, algolia } from './configs'
import { defineConfig, PageData } from 'vitepress'
const links: { url: string; lastmod: PageData['lastUpdated'] }[] = []

export default defineConfig({
  title: 'GRIT',
  description: 'JY的前端小窝',
  outDir: '../dist',
  base: process.env.APP_BASE_PATH || '/',
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/jynba/GRIT' }],

    // 配置从导航栏进去后的侧边栏
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2023-present jynba',
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
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://notes.fe-mm.com/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  },
})

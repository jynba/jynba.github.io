import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '资源导航',
    link: '/resources/navigation/nav',
  },
  {
    text: '时间轴',
    link: '/timeline/',
  },
  {
    text: '前端学习',
    items: [
      {
        text: '扎马步',
        items: [
          { text: 'HTML5 / CSS3', link: '/fe/html/html' },
          { text: 'JavaScript', link: '/fe/js/what_is_js' },
          { text: 'Vue3', link: '/fe/vue/vue_core_basis' },
          { text: 'Git', link: '/fe/git/git' },
          { text: 'Webpack', link: '/fe/webpack/webpack_basis' },
          { text: 'Vscode', link: '/fe/ide/vscode' },
          { text: '前端编程题', link: '/fe/js/coding_problem' },
          { text: '微前端', link: '/fe/microFrontends/microFrontends' },
        ],
      },
    ],
  },
  {
    text: '后端语言',
    items: [
      { text: 'Java', link: '/other/java/static' },
      { text: 'Nodejs', link: '/other/nodejs/node_basis' },
    ],
  },
  {
    text: '计算机基础',
    items: [{ text: '计算机网络', link: '/cs/net/HTTP_version' }],
  },
  {
    text: '设计模式',
    link: '/dm/strategy',
  },
  {
    text: '实战开发',
    items: [
      {
        text: '地图开发',
        items: [
          {
            text: '微信小程序Map',
            link: 'https://developers.weixin.qq.com/miniprogram/dev/component/map.html',
          },
          { text: 'Cesium 3D地球', link: 'https://cesium.com/' },
          {
            text: 'Echarts地图',
            link: 'https://echarts.apache.org/zh/index.html',
          },
        ],
      },
      {
        text: '项目',
        items: [
          { text: 'GO定向越野', link: '/projects/dxyy_project/index' },
          { text: 'AI中国象棋', link: '/projects/chess_project/index' },
          { text: '莞工地图', link: '/projects/ggdt_project/index' },
        ],
      },
    ],
  },
]

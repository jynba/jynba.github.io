import type { DefaultTheme } from 'vitepress'
const pr: DefaultTheme.SidebarItem[] = [
  {
    text: '项目实战',
    collapsed: true,
    items: [
      { text: 'GO定向越野', link: '/projects/dxyy_project/' },
      { text: 'AI中国象棋', link: '/projects/chess_project/' },
      { text: '莞工地图', link: '/projects/ggdt_project/' },
    ],
  },
]

export default pr

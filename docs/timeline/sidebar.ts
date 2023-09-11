import type { DefaultTheme } from 'vitepress';
const timeline: DefaultTheme.SidebarItem[] = [
	{
		text: '时间轴',
		collapsed: true,
		items: [
			{ text: '我的随笔', link: '/timeline/shuibi' },
			{ text: '杂谈文章', link: '/timeline/weekly2023' },
		],
	},
];

export default timeline;

import type { DefaultTheme } from 'vitepress';
const dm: DefaultTheme.SidebarItem[] = [
	{
		text: '设计模式',
		collapsed: true,
		items: [
			{ text: '如何用策略模式优化多个if-else？', link: '/dm/strategy' },
			{ text: '观察者模式vs发布订阅模式', link: '/dm/pu_ob' },
		],
	},
];

export default dm;

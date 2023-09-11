import type { DefaultTheme } from 'vitepress';

const other: DefaultTheme.SidebarItem[] = [
	{
		text: 'Java',
		collapsed: true,
		items: [
			{
				text: 'java中static加载顺序',
				link: '/other/java/static',
			},
			{
				text: '浅拷贝与深拷贝',
				link: '/other/java/copy',
			},
			{
				text: '关于java函数方法中把值带出去的问题',
				link: '/other/java/this',
			},
			{
				text: 'HashSet 是否无序',
				link: '/other/java/hashMap',
			},
		],
	},
	{
		text: 'Nodejs',
		collapsed: true,
		items: [
			{ text: 'Nodejs 基础', link: '/other/nodejs/node_basis' },
			{ text: 'Express', link: '/other/nodejs/express' },
			{ text: '数据库和身份认证', link: '/other/nodejs/mysql' },
			{ text: '大事件后台 API 项目', link: '/other/nodejs/ev_api_server' },
		],
	},
];
export default other;

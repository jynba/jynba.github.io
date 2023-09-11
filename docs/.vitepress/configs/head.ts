import type { HeadConfig } from 'vitepress';

const isDevelopment = process.env.NODE_ENV === 'development';

export const head: HeadConfig[] = [
	['meta', { name: 'theme-color', content: '#3eaf7c' }],
	['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
	['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
	['meta', { name: 'msapplication-TileColor', content: '#000000' }],
	['meta', { name: 'msapplication-TileImage', content: '/logo.ico' }],
	['meta', { name: 'baidu-site-verification', content: 'codeva-Whjnr38WFE' }],
	['link', { rel: 'icon', href: '/logo.ico' }],
	['link', { rel: 'apple-touch-icon', href: '/logo.ico' }],
	['link', { rel: 'mask-icon', href: '/logo.ico', color: '#3eaf7c' }],
	['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
	[
		'script',
		{
			src: isDevelopment
				? ''
				: 'https://hm.baidu.com/hm.js?6971c4545d5d470fb983004fbb46c0df',
		},
	],
];

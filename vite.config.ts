import { URL, fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';

import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import preload from 'vite-plugin-preload';
import type { Plugin } from 'vite';

const MAX_PRELOADED_IMAGES = 5;

const metaTags = [
	// {
	// 	title: 'Almost Prohibited - Browse items from your favourite retailers',
	// },
	{
		name: 'description',
		content:
			"Canada's upcoming aggregator for firearms, parts, and accessories",
	},
	{
		name: 'viewport',
		content: 'width=device-width, initial-scale=1.0',
	},
	{
		charSet: 'UTF-8',
	},
	{
		name: 'theme-color',
		content: '#364fc7',
	},
	{
		property: 'og:title',
		content:
			'Almost Prohibited - Browse items from your favourite retailers',
	},
	{
		property: 'og:url',
		content: 'https://almostprohibited.ca',
	},
	{
		property: 'og:description',
		content:
			"Canada's upcoming aggregator for firearms, parts, and accessories",
	},
	{
		property: 'og:image',
		content: 'https://almostprohibited.ca/favicon.svg',
	},
	{
		property: 'og:type',
		content: 'website',
	},
];

const linkTags = [
	{
		rel: 'shortcut icon',
		href: '/favicon.ico',
	},
	{
		rel: 'icon',
		type: 'image/png',
		href: '/favicon-96x96.png',
		sizes: '96x96',
	},
	{
		rel: 'icon',
		type: 'image/svg+xml',
		href: '/favicon.svg',
	},
	{
		rel: 'apple-touch-icon',
		href: '/apple-touch-icon.png',
		sizes: '180x180',
	},
	{
		rel: 'manifest',
		href: '/site.webmanifest',
	},
	{
		rel: 'preconnect',
		href: 'https://fonts.googleapis.com',
	},
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap',
	},
];

function generateImageRetailerPreloads(): Array<string> {
	const retailerImagePath = fileURLToPath(
		new URL('./public/retailers', import.meta.url),
	);

	let imageCount = 0;

	const preloadTags = readdirSync(retailerImagePath)
		.filter((__) => {
			// this should work out since retailers are displayed
			// in alphabetical order
			return imageCount++ < MAX_PRELOADED_IMAGES;
		})
		.map((imageName) => {
			return `<link rel="preload" href="/retailers/${imageName}" as="image" />`;
		});

	return preloadTags;
}

// @ts-expect-error
function preloadAssets(): Plugin {
	return {
		name: 'preload-images',
		transformIndexHtml(html, _) {
			const tags = [...generateImageRetailerPreloads()];

			return html.replace('</head>', `${tags.join('\n')}\n</head>`);
		},
	};
}

function generateTags(
	elementType: string,
	tagAttributes: Array<object>,
): Array<string> {
	return tagAttributes.map((tag) => {
		const attributes = Object.entries(tag).map(
			([key, value]) => `${key}="${value}"`,
		);

		return `<${elementType} ${attributes.join(' ')} />`;
	});
}

function insertTags(): Plugin {
	return {
		name: 'insert-tags',
		transformIndexHtml(html, _) {
			const tags = [
				'<title>Almost Prohibited - Browse items from your favourite retailers</title>',
				...generateTags('meta', metaTags),
				...generateTags('link', linkTags),
			];

			return html.replace('</head>', `${tags.join('\n')}\n</head>`);
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [viteReact(), preload(), insertTags()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});

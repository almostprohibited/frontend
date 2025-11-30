import { createRootRoute, createRoute } from '@tanstack/react-router';
import App from './App';
import { Category, SortOptions } from './utils/apiStructs';
import { z } from 'zod/mini';

const rootRoute = createRootRoute({
	component: () => <App />,
	head: () => ({
		meta: [
			{
				title: 'Almost Prohibited - Browse items from your favourite retailers',
			},
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
		],
		links: [
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
			// {
			// 	rel: 'preconnect',
			// 	href: 'https://fonts.googleapis.com',
			// },
			// {
			// 	rel: 'preconnect',
			// 	href: 'https://fonts.gstatic.com',
			// },
			// {
			// 	rel: 'stylesheet',
			// 	href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
			// },
		],
	}),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
}).lazy(() => import('./pages/home/index').then((d) => d.homeLazyRoute));

const contactRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/contact',
}).lazy(() => import('./pages/contact/index').then((d) => d.contactLazyRoute));

const privacyRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/privacy',
}).lazy(() => import('./pages/privacy/index').then((d) => d.privacyLazyRoute));

const roadmapRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/roadmap',
}).lazy(() => import('./pages/roadmap/index').then((d) => d.roadmapLazyRoute));

const searchRouteSchema = z.object({
	query: z.string().check(z.trim()),
	sort: z.optional(z.enum(SortOptions)),
	category: z.optional(z.enum(Category)),
	'min-price': z.optional(z.number().check(z.minimum(0))),
	'max-price': z.optional(z.number().check(z.minimum(0))),
	page: z.optional(z.number().check(z.minimum(0))),
	retailers: z.optional(z.array(z.string().check(z.trim()))),
});

export type SearchRouteSchema = z.infer<typeof searchRouteSchema>;

const searchRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/search',
	validateSearch: (search) => searchRouteSchema.parse(search),
}).lazy(() => import('./pages/search/index').then((d) => d.searchLazyRoute));

export const routeTree = rootRoute.addChildren([
	indexRoute,
	contactRoute,
	privacyRoute,
	roadmapRoute,
	searchRoute,
]);

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
				rel: 'icon',
				href: '/favicon.ico',
			},
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

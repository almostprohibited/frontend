import { createRootRoute, createRoute } from '@tanstack/react-router';
import App from './App';
import { Category, SortOptions } from './utils/apiStructs';
import { z } from 'zod/mini';

const rootRoute = createRootRoute({
	component: () => <App />,
	head: (context) => {
		const linkTags = [];

		const routeMatch = context.matches.at(-1);

		if (routeMatch) {
			linkTags.push({
				rel: 'canonical',
				href: `https://almostprohibited.ca${routeMatch.pathname}`,
			});
		}

		return {
			links: linkTags,
		};
	},
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
	head: () => ({
		meta: [
			{
				name: 'robots',
				content: 'noindex',
			},
		],
	}),
	path: '/search',
	validateSearch: (search) => searchRouteSchema.parse(search),
}).lazy(() => import('./pages/search/index').then((d) => d.searchLazyRoute));

export const routeTree = rootRoute.addChildren([
	indexRoute,
	contactRoute,
	privacyRoute,
	searchRoute,
]);

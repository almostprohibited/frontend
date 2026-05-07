import {
	createRootRouteWithContext,
	createRoute,
	redirect,
} from '@tanstack/react-router';
import App from './App';
import { Category, SortOptions } from './utils/apiStructs';
import { z } from 'zod/mini';
import { useIsBeta } from './utils/hooks/useIsBeta';
import type { AuthState } from './auth';

interface RootContext {
	auth: AuthState;
}

function protectedPageCheck({ context }: { context: RootContext }) {
	const isBeta = useIsBeta();

	if (!isBeta || !context.auth.isAuthenticated) {
		throw redirect({
			to: '/auth/',
		});
	}
}

const rootRoute = createRootRouteWithContext<RootContext>()({
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

const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	beforeLoad: ({ context }) => {
		const isBeta = useIsBeta();

		if (!isBeta) {
			throw redirect({
				to: '/',
			});
		}

		if (context.auth.isAuthenticated) {
			throw redirect({
				to: '/dashboard/',
			});
		}
	},
	path: '/auth',
}).lazy(() => import('./pages/auth/index').then((d) => d.authLazyRoute));

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	beforeLoad: protectedPageCheck,
	path: '/dashboard',
}).lazy(() =>
	import('./pages/dashboard/index').then((d) => d.dashboardLazyRoute),
);

const watchListRoute = createRoute({
	getParentRoute: () => rootRoute,
	beforeLoad: protectedPageCheck,
	path: '/watchlist',
}).lazy(() =>
	import('./pages/watchlist/index').then((d) => d.watchListLazyRoute),
);

const notificationsRoute = createRoute({
	getParentRoute: () => rootRoute,
	beforeLoad: protectedPageCheck,
	path: '/notifications',
}).lazy(() =>
	import('./pages/notifications/index').then((d) => d.notificationsLazyRoute),
);

export const routeTree = rootRoute.addChildren([
	indexRoute,
	contactRoute,
	privacyRoute,
	searchRoute,
	authRoute,
	dashboardRoute,
	watchListRoute,
	notificationsRoute,
]);

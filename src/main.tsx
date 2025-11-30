import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routes.tsx';
import ErrorResult from './components/fallbacks/errorResult.tsx';
import EmptyResult from './components/fallbacks/emptyResult.tsx';

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: 'intent',
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	trailingSlash: 'always',
	defaultErrorComponent: () => {
		return <ErrorResult />;
	},
	defaultNotFoundComponent: () => {
		return <EmptyResult />;
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}

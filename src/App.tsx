import {
	Box,
	ColorSchemeScript,
	createTheme,
	Flex,
	MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Footer from './components/footer/component';

import { HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from './components/header/component';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

import './globals.css';

export default function App() {
	const theme = createTheme({
		fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',

		// https://mantine.dev/guides/8x-to-9x/#default-border-radius-change
		// why they would do this, I will never understand
		// 9.x SegmentedControl's 'sm' is NOT the same as 8.x SegmentedControl's default
		defaultRadius: 'sm',
	});

	return (
		<>
			<HeadContent />
			<ColorSchemeScript />
			<MantineProvider defaultColorScheme="dark" theme={theme}>
				<Notifications />
				<Flex direction="column" h="100%">
					<Header />
					<Box mb="2rem" flex={1}>
						<Outlet />
						<TanStackRouterDevtools />
					</Box>
					<Footer />
				</Flex>
			</MantineProvider>
		</>
	);
}

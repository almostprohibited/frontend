import {
	Box,
	ColorSchemeScript,
	createTheme,
	Flex,
	MantineProvider,
} from '@mantine/core';
import Footer from './components/footer/component';

import { HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from './components/header/component';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import './globals.css';

export default function App() {
	const theme = createTheme({
		fontFamily: 'Arial, Helvetica, sans-serif',
	});

	return (
		<>
			<HeadContent />
			<ColorSchemeScript />
			<MantineProvider defaultColorScheme="dark" theme={theme}>
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

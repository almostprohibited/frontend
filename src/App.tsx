import {
	Affix,
	Box,
	ColorSchemeScript,
	createTheme,
	Flex,
	MantineProvider,
	Overlay,
} from '@mantine/core';
import Footer from './components/footer/component';

import { useIsBeta } from './utils/hooks/useIsBeta';
import { HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from './components/header/component';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import './globals.css';

export default function App() {
	const isBeta = useIsBeta();

	const theme = createTheme({
		fontFamily: 'Arial, Helvetica, sans-serif',
	});

	return (
		<>
			<HeadContent />
			<ColorSchemeScript />
			<MantineProvider defaultColorScheme="dark" theme={theme}>
				{isBeta && (
					<Affix w="100%" h="100%">
						<Overlay backgroundOpacity={0} bd="2px solid yellow" />
					</Affix>
				)}
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

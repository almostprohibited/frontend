import {
	Affix,
	Alert,
	Box,
	ColorSchemeScript,
	Flex,
	MantineProvider,
	Stack,
	Text,
} from '@mantine/core';
import { IconFlask } from '@tabler/icons-react';
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

	return (
		<>
			<HeadContent />
			<ColorSchemeScript />
			<MantineProvider defaultColorScheme="dark">
				{isBeta && (
					<Affix position={{ bottom: 20, right: 20 }}>
						<a href="https://almostprohibited.ca">
							<Alert
								variant="filled"
								color="grape"
								title="This is the beta website!"
								icon={<IconFlask />}
								maw="20rem"
							>
								<Stack>
									<Text size="sm">
										{
											'This site may contain features that are broken, or work in progress.'
										}
									</Text>
									<Text size="sm">
										{
											'Click to head back to the release site.'
										}
									</Text>
								</Stack>
							</Alert>
						</a>
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

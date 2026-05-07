import { Box, Card, Divider, Flex, Space, Text, Title } from '@mantine/core';
import { createLazyRoute, Link } from '@tanstack/react-router';
import Logout from './components/logout';
import DeleteAccount from './components/delete';
import { useMobileView } from '@/utils/hooks/useMobileView';

export const dashboardLazyRoute = createLazyRoute('/dashboard')({
	component: DashboardPage,
});

function DashboardPage() {
	const isMobile = useMobileView();

	return (
		<Flex
			p={'var(--content-side-padding)'}
			direction="column"
			gap="xl"
			h="100%"
		>
			<Space />
			<Title>Dashboard</Title>
			<Box flex="1">
				<Flex direction={isMobile ? 'column' : 'row'} gap="lg">
					<Card
						shadow="lg"
						w="100%"
						withBorder
						component={Link}
						to="/watchlist"
					>
						<Flex direction="column" gap="md">
							<Title order={2}>Watch list</Title>
							<Text>
								Setup the product keywords you want to look out
								for.
							</Text>
						</Flex>
					</Card>
					<Card
						shadow="lg"
						w="100%"
						withBorder
						component={Link}
						href="/notifications"
					>
						<Flex direction="column" gap="md">
							<Title order={2}>Notification channels</Title>
							<Text>Configure your notification methods.</Text>
						</Flex>
					</Card>
				</Flex>
			</Box>
			<Divider />
			<Flex justify="space-between">
				<Logout />
				<DeleteAccount />
			</Flex>
		</Flex>
	);
}

import { Divider, Flex, Space, Title } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';
import Logout from './components/logout';
import DeleteAccount from './components/delete';

export const dashboardLazyRoute = createLazyRoute('/dashboard')({
	component: DashboardPage,
});

function DashboardPage() {
	return (
		<Flex
			p={'var(--content-side-padding)'}
			justify="center"
			direction="column"
			gap="xl"
		>
			<Space />
			<Title>Dashboard</Title>

			<Divider />
			<Flex justify="space-between">
				<Logout />
				<DeleteAccount />
			</Flex>
		</Flex>
	);
}

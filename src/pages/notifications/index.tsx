// import { useMobileView } from '@/utils/hooks/useMobileView';
import { Card, Divider, Flex, Space, Text, Title } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';
import { EmailSection } from './components/email/section';

export const notificationsLazyRoute = createLazyRoute('/notifications')({
	component: NotificationsPage,
});

function NotificationsPage() {
	// const isMobile = useMobileView();

	return (
		<Flex p={'var(--content-side-padding)'} direction="column" gap="xl">
			<Space />
			<Title>Notifications</Title>
			<Text>Register and verify different notification methods</Text>
			<Divider />
			<Flex
				// direction={isMobile ? 'column' : 'row'}
				direction="column"
				gap="xl"
				justify="center"
				w="100%"
			>
				<EmailSection />
				<Card shadow="lg" w="100%" withBorder>
					<Flex direction="column" gap="md">
						<Title order={2}>Apps</Title>
						<Divider />
						<Text c="dimmed" ta="center">
							Coming soon
						</Text>
					</Flex>
				</Card>
			</Flex>
		</Flex>
	);
}

import { Text } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';

export const notificationsLazyRoute = createLazyRoute('/notifications')({
	component: NotificationsPage,
});

function NotificationsPage() {
	return <Text>notifications</Text>;
}

import { Card, Divider, Flex, Text, Title } from '@mantine/core';

export function NotificationSettings() {
	return (
		<Card withBorder shadow="sm">
			<Flex direction="column" gap="lg">
				<Title order={3} ta="center">
					Notification Settings
				</Title>
				<Divider />
				<Text>adjust notifications</Text>
			</Flex>
		</Card>
	);
}

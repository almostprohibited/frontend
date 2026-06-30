import {
	Card,
	Divider,
	Flex,
	Title,
	Center,
	Loader,
	Text,
} from '@mantine/core';
import { EmailTable } from './emailTable';
import { useNotificationChannels } from '@/utils/apiRequest';
import { EmailInputs } from './emailInputs';

export function EmailSection() {
	const { data, isLoading } = useNotificationChannels();

	return (
		<Card shadow="lg" w="100%" withBorder>
			<Flex direction="column" gap="md">
				<Title order={2}>Emails</Title>
				<Divider />
				<EmailInputs />
				<Center>
					{isLoading ? (
						<Loader type="dots" size="1.55rem" />
					) : !data || data.length === 0 ? (
						<Text>No emails found, add one to get started</Text>
					) : (
						<EmailTable emails={data} />
					)}
				</Center>
			</Flex>
		</Card>
	);
}

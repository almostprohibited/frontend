import { useNotificationChannels } from '@/utils/apiRequest';
import { getApiDomain } from '@/utils/environment';
import { useMobileView } from '@/utils/hooks/useMobileView';
import {
	ActionIcon,
	Button,
	Card,
	Center,
	Divider,
	Fieldset,
	Flex,
	Loader,
	SimpleGrid,
	Space,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from '@mantine/core';
import {
	IconBrandGoogle,
	IconBrandWindows,
	IconExternalLink,
	IconSend2,
} from '@tabler/icons-react';
import { createLazyRoute } from '@tanstack/react-router';

export const notificationsLazyRoute = createLazyRoute('/notifications')({
	component: NotificationsPage,
});

function NotificationsPage() {
	const isMobile = useMobileView();
	const theme = useMantineTheme();

	const { data, isLoading } = useNotificationChannels();

	return (
		<Flex p={'var(--content-side-padding)'} direction="column" gap="xl">
			<Space />
			<Title>Notifications</Title>
			<Text>Register and verify different notification methods</Text>
			<Divider />
			<Flex
				direction={isMobile ? 'column' : 'row'}
				gap="md"
				justify="center"
				w="100%"
			>
				<Card shadow="lg" w="100%" withBorder>
					<Flex direction="column" gap="md">
						<Title order={2}>Emails</Title>
						<Divider />
						<Fieldset legend="One-click providers">
							<SimpleGrid cols={2}>
								<form
									action={`${getApiDomain()}/api/notification/google/provider`}
									method="POST"
								>
									<Button
										leftSection={<IconBrandGoogle />}
										rightSection={<IconExternalLink />}
										justify="space-between"
										variant="outline"
										size="md"
										fullWidth
										color={theme.colors.green[4]}
										type="submit"
									>
										<Text>Google</Text>
									</Button>
								</form>
								<form
									action={`${getApiDomain()}/api/notification/microsoft/provider`}
									method="POST"
								>
									<Button
										leftSection={<IconBrandWindows />}
										rightSection={<IconExternalLink />}
										justify="space-between"
										variant="outline"
										size="md"
										fullWidth
										color={theme.colors.green[4]}
										type="submit"
									>
										<Text>Microsoft</Text>
									</Button>
								</form>
							</SimpleGrid>
						</Fieldset>
						<Fieldset legend="Manual input">
							<Flex>
								<TextInput
									w="100%"
									placeholder="your@email.com"
								/>
								<ActionIcon
									// disabled={
									// 	!cfToken || loginFailure || sendingLoginRequest
									// }
									variant="default"
									size="input-sm"
									ml="0.5rem"
									c="blue"
									// loading={sendingLoginRequest}
									// onClick={sendQuery}
								>
									<IconSend2 />
								</ActionIcon>
							</Flex>
						</Fieldset>
						<Divider />

						<Center>
							{isLoading ? (
								<Loader type="dots" size="1.55rem" />
							) : !data || data.length > 0 ? (
								<Text>
									No emails found, add one to get started
								</Text>
							) : (
								<Flex direction="column">
									{data.map((channel) => (
										<Text>{channel.identifier}</Text>
									))}
								</Flex>
							)}
						</Center>
					</Flex>
				</Card>

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

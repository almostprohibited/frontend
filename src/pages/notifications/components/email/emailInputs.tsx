import { updateNotificationChannels } from '@/utils/apiRequest';
import { getApiDomain } from '@/utils/environment';
import {
	ActionIcon,
	Button,
	Fieldset,
	Flex,
	SimpleGrid,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
	IconBrandGoogle,
	IconBrandWindows,
	IconExternalLink,
	IconSend2,
} from '@tabler/icons-react';
import { useState } from 'react';

export function EmailInputs() {
	const theme = useMantineTheme();

	// TODO: validate email input
	const [email, setEmail] = useState('');
	const [isSendingRequest, setIsSendingRequest] = useState(false);

	function sendRequest() {
		setIsSendingRequest(true);

		fetch(`${getApiDomain()}/api/notification/email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials:
				process.env.NODE_ENV === 'development'
					? 'include'
					: 'same-origin',
			body: JSON.stringify({
				email: email.trim(),
			}),
		}).then((response) => {
			notifications.show({
				title: response.status,
				message: response.statusText,
				autoClose: false,
			});

			// TODO: consider only updating local notification methods
			// if response is OK
			updateNotificationChannels();

			setIsSendingRequest(false);
			setEmail('');
		});
	}

	return (
		<>
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
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<ActionIcon
						variant="default"
						size="input-sm"
						ml="0.5rem"
						c="blue"
						loading={isSendingRequest}
						onClick={sendRequest}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>
			</Fieldset>
		</>
	);
}

import {
	Button,
	Checkbox,
	Flex,
	Table,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { IconCheckFilled } from '@tabler/icons-react';
import {
	type NotificationChannel,
	NotificationChannelStatus,
} from '@/utils/apiStructs';
import { notifications } from '@mantine/notifications';
import { updateNotificationChannels } from '@/utils/apiRequest';
import { getApiDomain } from '@/utils/environment';

export function EmailTable({ emails }: { emails: Array<NotificationChannel> }) {
	const theme = useMantineTheme();

	const [isSendingDelete, setIsSendingDelete] = useState(false);
	const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);

	function deleteEmails() {
		setIsSendingDelete(true);

		fetch(`${getApiDomain()}/api/notification/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials:
				process.env.NODE_ENV === 'development'
					? 'include'
					: 'same-origin',
			body: JSON.stringify({
				identifiers: selectedEmails,
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

			setIsSendingDelete(false);
			setSelectedEmails([]);
		});
	}

	return (
		<Flex w="100%" direction="column" gap="lg">
			<Table>
				<TableThead>
					<TableTr>
						<TableTh />
						<TableTh>Email</TableTh>
						<TableTh>Verified</TableTh>
					</TableTr>
				</TableThead>
				{emails
					.sort((a, b) => a.identifier.localeCompare(b.identifier))
					.map((email) => (
						<TableTr
							key={email.identifier}
							bg={
								selectedEmails.includes(email.identifier)
									? theme.colors.red[9]
									: 'initial'
							}
						>
							<TableTd>
								<Checkbox
									variant="outline"
									color={theme.colors.red[4]}
									checked={selectedEmails.includes(
										email.identifier,
									)}
									onChange={(event) => {
										if (event.currentTarget.checked) {
											setSelectedEmails([
												...selectedEmails,
												email.identifier,
											]);
										} else {
											setSelectedEmails(
												selectedEmails.filter(
													(selectedEmail) =>
														selectedEmail !==
														email.identifier,
												),
											);
										}
									}}
								/>
							</TableTd>
							<TableTd>{email.identifier}</TableTd>
							<TableTd>
								{email.status ===
								NotificationChannelStatus.Verified ? (
									<IconCheckFilled
										color={theme.colors.green[5]}
									/>
								) : (
									<Text>verify</Text>
								)}
							</TableTd>
						</TableTr>
					))}
			</Table>
			<Button
				disabled={selectedEmails.length === 0 || isSendingDelete}
				color={theme.colors.red[5]}
				variant="outline"
				onClick={deleteEmails}
				loading={isSendingDelete}
			>
				Delete
			</Button>
		</Flex>
	);
}

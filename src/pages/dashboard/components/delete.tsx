import { useAuth } from '@/auth';
import { getApiDomain } from '@/utils/environment';
import { Text, Button, Flex, Modal, Title, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowBack, IconFileShredder, IconX } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

function showFailureNotification() {
	notifications.show({
		title: 'Failed to delete account',
		message:
			'Something went wrong when deleting your account, please try again. If this continues to happen, please contact me.',
		autoClose: false,
		color: 'red',
		icon: <IconX />,
	});
}

export default function DeleteAccount() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const [
		isConfirmationOpen,
		{ open: openConfirmation, close: closeConfirmation },
	] = useDisclosure(false);

	function deleteAccount() {
		setIsLoading(true);

		fetch(`${getApiDomain()}/api/auth/delete`, {
			method: 'DELETE',
			credentials:
				process.env.NODE_ENV === 'development'
					? 'include'
					: 'same-origin',
		})
			.then((response) => {
				if (response.ok) {
					auth.logout();

					navigate({ to: '/' });
				} else {
					showFailureNotification();
				}
			})
			.catch(showFailureNotification);
	}

	return (
		<>
			<Modal
				opened={isConfirmationOpen}
				onClose={closeConfirmation}
				withCloseButton={false}
				centered
			>
				<Flex direction="column" gap="sm">
					<Title order={3}>
						Are you sure you want to delete your account?
					</Title>
					<Space h="md" />
					<Text>
						You won't be able to recover your settings if you do,
						and odds are I won't help you.
					</Text>
					<Text>
						Once your account is deleted, all login, watch list, and
						notifcations information will be deleted.
					</Text>
					<Space h="md" />
					<Flex gap="xl">
						<Button
							onClick={closeConfirmation}
							variant="outline"
							leftSection={<IconArrowBack />}
							fullWidth
						>
							Back
						</Button>
						<Button
							onClick={deleteAccount}
							loaderProps={{ type: 'oval' }}
							color="red"
							variant="filled"
							leftSection={<IconFileShredder />}
							fullWidth
							loading={isLoading}
						>
							Delete
						</Button>
					</Flex>
				</Flex>
			</Modal>
			<Button
				onClick={openConfirmation}
				loading={isLoading}
				loaderProps={{ type: 'oval' }}
				color="red"
				variant="outline"
				leftSection={<IconFileShredder />}
			>
				Delete Account
			</Button>
		</>
	);
}

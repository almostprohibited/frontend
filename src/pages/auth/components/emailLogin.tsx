import {
	Flex,
	Title,
	Text,
	TextInput,
	ActionIcon,
	useMantineTheme,
} from '@mantine/core';
import { IconMail, IconSend2 } from '@tabler/icons-react';

import { useState } from 'react';
import { isValidEmail } from '@/utils/inputCheckers';
import { OtpModal } from './otpModal';
import { getApiDomain } from '@/utils/environment';

export default function EmailLogin({ cfToken }: { cfToken?: string }) {
	const theme = useMantineTheme();

	const [isOtpModalOpen, setOtpModalOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(true);

	const [sendingLoginRequest, setSendingLoginRequest] = useState(false);
	const [loginFailure, setLoginFailure] = useState(false);

	function validateEmail(input: string) {
		setEmail(input);

		if (isValidEmail(input) || input.length === 0) {
			setEmailValid(true);
			return;
		}

		setEmailValid(false);
	}

	function sendQuery() {
		if (emailValid && cfToken) {
			setSendingLoginRequest(true);

			fetch(`${getApiDomain()}/api/auth/email/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'cf-turnstile-response': cfToken,
					email: email.trim(),
				}),
			}).then((response) => {
				if (response.ok) {
					setOtpModalOpen(true);
				} else {
					setLoginFailure(true);
				}
			});
		}
	}

	return (
		<>
			<Flex direction="column" gap="md" w="100%">
				<Title order={4}>Sign in with your email</Title>
				<Text>
					You'll receive an email with a one-time login code. No
					passwords, no personal information.
				</Text>
				<Flex>
					<TextInput
						placeholder="your@email.com"
						value={email}
						onChange={(event) =>
							validateEmail(event.currentTarget.value)
						}
						error={!emailValid}
						disabled={
							!cfToken || loginFailure || sendingLoginRequest
						}
						flex={1}
						leftSection={<IconMail />}
					/>
					<ActionIcon
						disabled={
							!cfToken || loginFailure || sendingLoginRequest
						}
						variant="default"
						size="input-sm"
						ml="0.5rem"
						c="blue"
						loading={sendingLoginRequest}
						onClick={sendQuery}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>
				<Text
					display={loginFailure ? 'initial' : 'none'}
					size="sm"
					ta="center"
					c={theme.colors.red[6]}
				>
					Failed to login! Refresh the page to try again.
				</Text>
			</Flex>
			<OtpModal email={email} isOpen={isOtpModalOpen} />
		</>
	);
}

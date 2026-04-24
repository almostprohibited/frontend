import { getApiDomain, getCfSiteKey } from '@/utils/environment';
import {
	Modal,
	Title,
	Space,
	Text,
	Flex,
	Code,
	PinInput,
	Box,
	Stack,
	useMantineTheme,
	LoadingOverlay,
} from '@mantine/core';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useEffect, useRef, useState } from 'react';

const OTP_LENGTH = 6;

export function OtpModal({
	email,
	isOpen,
}: {
	email: string;
	isOpen: boolean;
}) {
	const theme = useMantineTheme();
	const turnstileRef = useRef<TurnstileInstance | null>(null);

	const [cfToken, setCfToken] = useState<string | undefined>(undefined);

	const [otpValue, setOtpValue] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);
	const [isError, setError] = useState(false);

	useEffect(() => {
		if (otpValue.length === OTP_LENGTH && cfToken) {
			setSubmitting(true);
			setError(false);

			fetch(`${getApiDomain()}/api/auth/email/otp`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials:
					process.env.NODE_ENV === 'development'
						? 'include'
						: 'same-origin',
				body: JSON.stringify({
					'cf-turnstile-response': cfToken,
					email: email.trim(),
					'otp-code': otpValue.trim(),
				}),
			}).then((response) => {
				if (!response.ok) {
					turnstileRef.current?.reset();

					setCfToken(undefined);
					setSubmitting(false);
					setError(true);
				} else {
					// tanstack useNavigate uses old authContext state
					// meaning that it won't redirect properly, and I
					// don't know how to reset that
					//
					// just do a hard refresh
					window.location.href = '/dashboard/';
				}
			});
		}
	}, [otpValue]);

	return (
		<Modal
			opened={isOpen}
			onClose={() => {}}
			withCloseButton={false}
			centered
		>
			<Title order={3}>Enter your one-time passcode</Title>
			<Space h="lg" />
			<Flex w="100%" align="center" gap="xl" direction="column">
				<Stack>
					<Text>
						I've sent a code to your email (<Code>{email}</Code>).
					</Text>
					<Text>
						Check your spam folders in case it doesn't appear in
						your inbox.
					</Text>
				</Stack>
				<Box pos="relative">
					<LoadingOverlay
						visible={isSubmitting}
						loaderProps={{ type: 'oval' }}
					/>
					<PinInput
						length={6}
						placeholder="-"
						type="number"
						size="lg"
						value={otpValue}
						onChange={setOtpValue}
						disabled={isSubmitting}
						oneTimeCode
					/>
				</Box>
				<Text
					display={isError ? 'initial' : 'none'}
					size="sm"
					ta="center"
					c={theme.colors.red[6]}
				>
					Failed to validate passcode! Try again.
				</Text>
				<Turnstile
					id="otp-turnstile"
					ref={turnstileRef}
					style={{ width: '100%' }}
					siteKey={getCfSiteKey()}
					options={{
						size: 'flexible',
					}}
					onSuccess={setCfToken}
				/>
			</Flex>
		</Modal>
	);
}

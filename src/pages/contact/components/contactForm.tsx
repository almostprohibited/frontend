import {
	Button,
	Fieldset,
	LoadingOverlay,
	Stack,
	Textarea,
	TextInput,
} from '@mantine/core';
import { Turnstile } from '@marsidev/react-turnstile';
import { IconMailForward } from '@tabler/icons-react';
import { useState } from 'react';
import { FinishedOverlay } from './finishedOverlay';
import { getApiDomain, getCfSiteKey } from '@/utils/environment';

export function ContactForm() {
	const siteKey = getCfSiteKey();
	const apiDomain = getApiDomain();

	const [email, setEmail] = useState<string>('');
	const [emailContainsError, setEmailContainsError] = useState(false);

	const [subject, setSubject] = useState<string>('');

	const [body, setBody] = useState<string>();
	const [bodyContainsError, setBodyContainsError] = useState(false);

	const [cfToken, setCfToken] = useState<string>('');

	const [isSendingRequest, setSendingRequest] = useState(false);

	const [hasSentRequest, setHasSentRequest] = useState(false);
	const [requestSuccess, setRequestSuccess] = useState(true);

	function submitForm() {
		const url = `${apiDomain}/api/contact`;

		if (!body || !cfToken || bodyContainsError || emailContainsError) {
			console.error('Form contains problems');
			return;
		}

		setSendingRequest(true);
		setHasSentRequest(true);

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'cf-turnstile-response': cfToken,
				body,
				email,
				subject,
			}),
		}).then((response) => {
			setRequestSuccess(response.status === 200);
			setSendingRequest(false);
		});
	}

	function validateEmail(email: string) {
		setEmail(email);

		if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(email)) {
			setEmailContainsError(true);
			return;
		}

		setEmailContainsError(false);
	}

	function validateBody(body: string) {
		setBody(body);

		if (!body) {
			setBodyContainsError(true);
			return;
		}

		setBodyContainsError(false);
	}

	return (
		<Fieldset pos="relative">
			<LoadingOverlay
				visible={isSendingRequest}
				loaderProps={{ type: 'oval' }}
			/>
			{!isSendingRequest && hasSentRequest && (
				<FinishedOverlay wasSuccess={requestSuccess} />
			)}
			<Stack gap="md">
				<TextInput
					label="Email"
					placeholder="your@email.com"
					description="Optional. Only required if you want a reply"
					value={email}
					onChange={(event) =>
						validateEmail(event.currentTarget.value)
					}
					error={emailContainsError}
					disabled={hasSentRequest}
				/>
				<TextInput
					label="Subject"
					placeholder="summary of your message"
					description="Optional."
					value={subject}
					onChange={(event) => setSubject(event.currentTarget.value)}
					disabled={hasSentRequest}
				/>
				<Textarea
					label="Body"
					withAsterisk
					minRows={10}
					autosize
					placeholder="complain to me here"
					resize="vertical"
					value={body}
					onChange={(event) =>
						validateBody(event.currentTarget.value)
					}
					error={bodyContainsError}
					disabled={hasSentRequest}
				/>
				<Button
					variant="outline"
					fullWidth
					rightSection={<IconMailForward />}
					onClick={submitForm}
					disabled={
						hasSentRequest ||
						cfToken === '' ||
						body === '' ||
						body === undefined ||
						bodyContainsError
					}
				>
					Submit
				</Button>
				<Turnstile
					style={{ width: '100%' }}
					siteKey={siteKey}
					options={{
						size: 'flexible',
					}}
					onSuccess={setCfToken}
				/>
			</Stack>
		</Fieldset>
	);
}

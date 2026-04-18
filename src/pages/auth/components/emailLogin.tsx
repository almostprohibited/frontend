import { Flex, Title, Text, TextInput, ActionIcon } from '@mantine/core';
import { IconMail, IconSend2 } from '@tabler/icons-react';

import { useState } from 'react';
import { isValidEmail } from '@/utils/inputCheckers';

export default function EmailLogin({ cfToken }: { cfToken?: string }) {
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [emailValid, setEmailValid] = useState(true);

	function validateEmail(input: string) {
		setEmail(input);

		if (isValidEmail(input) || input.length === 0) {
			setEmailValid(true);
			return;
		}

		setEmailValid(false);
	}

	return (
		<Flex direction="column" gap="md" w="100%">
			<Title order={4}>Sign in with an email magic link</Title>
			<Text>
				You'll receive an email with a link to log in. I don't want your
				passwords or your information.
			</Text>
			<Flex>
				<TextInput
					placeholder="your@email.com"
					value={email}
					onChange={(event) =>
						validateEmail(event.currentTarget.value)
					}
					error={!emailValid}
					disabled={!cfToken}
					flex={1}
					leftSection={<IconMail />}
				/>
				<ActionIcon
					disabled={!cfToken}
					variant="default"
					size="input-sm"
					ml="0.5rem"
					c="blue"
					// onClick={() => sendQuery(true)}
				>
					<IconSend2 />
				</ActionIcon>
			</Flex>
		</Flex>
	);
}

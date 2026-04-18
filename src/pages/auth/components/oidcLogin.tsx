import { getApiDomain } from '@/utils/environment';
import { Text, Button, useMantineTheme, Title, Flex } from '@mantine/core';
import {
	IconBrandDiscord,
	IconBrandGoogle,
	IconExternalLink,
} from '@tabler/icons-react';
import type { ReactElement } from 'react';

export default function OidcLoginProviders({ cfToken }: { cfToken?: string }) {
	return (
		<Flex direction="column" gap="md" w="100%">
			<Title order={4}>Sign in with a provider</Title>
			<Text>
				Use a third party service to log in. You'll be sent to their
				confirmation page, and they'll send you right back here.
			</Text>
			<OidcProviderButton
				displayName="Discord"
				apiProvider="discord"
				icon={<IconBrandDiscord />}
				cfToken={cfToken}
			/>
			<OidcProviderButton
				displayName="Google"
				apiProvider="google"
				icon={<IconBrandGoogle />}
				cfToken={cfToken}
			/>
		</Flex>
	);
}

function OidcProviderButton({
	displayName,
	icon,
	apiProvider,
	cfToken,
}: {
	displayName: string;
	icon: ReactElement;
	apiProvider: string;
	cfToken?: string;
}) {
	const theme = useMantineTheme();

	// TODO: 12am code to use a vanilla form, revisit to see if this
	// can be done "better" (ie. more react-like)
	return (
		<form
			action={`${getApiDomain()}/api/auth/${apiProvider}/provider`}
			method="POST"
		>
			{cfToken && (
				<input
					type="hidden"
					name="cf-turnstile-response"
					value={cfToken}
				/>
			)}

			<Button
				leftSection={icon}
				rightSection={<IconExternalLink />}
				fullWidth
				justify="space-between"
				variant="light"
				size="md"
				color={theme.colors.blue[4]}
				type="submit"
				disabled={!cfToken}
			>
				<Text>Sign in with {displayName}</Text>
			</Button>
		</form>
	);
}

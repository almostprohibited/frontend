import { getApiDomain } from '@/utils/environment';
import { Text, Button, useMantineTheme } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import type { ReactElement } from 'react';

export default function OidcProviderButton({
	displayName,
	icon,
	apiProvider,
	cfToken,
	isExternal = false,
}: {
	displayName: string;
	icon: ReactElement;
	apiProvider: string;
	cfToken?: string;
	isExternal?: boolean;
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
				rightSection={isExternal ? <IconExternalLink /> : <span />}
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

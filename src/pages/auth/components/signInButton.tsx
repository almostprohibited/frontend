import { getApiDomain } from '@/utils/environment';
import { Text, Button, useMantineTheme } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import type { ReactElement } from 'react';

export default function SignInButton({
	displayName,
	icon,
	apiProvider,
	isExternal = false,
}: {
	displayName: string;
	icon: ReactElement;
	apiProvider?: string;
	isExternal?: boolean;
}) {
	const theme = useMantineTheme();

	return (
		<Button
			leftSection={icon}
			rightSection={isExternal ? <IconExternalLink /> : <span />}
			fullWidth
			justify="space-between"
			variant="light"
			size="md"
			color={theme.colors.blue[4]}
			component={apiProvider ? 'a' : undefined}
			href={
				apiProvider
					? `${getApiDomain()}/api/auth/${apiProvider}/provider`
					: undefined
			}
		>
			<Text>Sign in with {displayName}</Text>
		</Button>
	);
}

import { useMobileView } from '@/utils/hooks/useMobileView';
import {
	Alert,
	Box,
	Divider,
	Flex,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';
import {
	IconBrandDiscord,
	IconBrandGoogle,
	IconMail,
} from '@tabler/icons-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { getCfSiteKey } from '@/utils/environment';
import { useState } from 'react';
import OidcProviderButton from './components/oidcProviderButton';

export const authLazyRoute = createLazyRoute('/auth')({
	component: AuthPage,
});

function AuthPage() {
	const isMobile = useMobileView();
	const theme = useMantineTheme();

	const [cfToken, setCfToken] = useState<string | undefined>(undefined);

	return (
		<Flex
			p={'var(--content-side-padding)'}
			justify="center"
			align="center"
			h="100%"
			direction="column"
			gap="xl"
		>
			<Title order={1} ta="center">
				{'Login'}
			</Title>
			<Divider />
			<Flex
				direction={isMobile ? 'column' : 'row'}
				w="100%"
				justify="center"
				align="center"
				gap="xl"
			>
				<Box w="100%">
					<Alert
						variant="outline"
						color={theme.colors.gray[7]}
						radius="md"
					>
						<Text>
							Bacon ipsum dolor amet duis bacon prosciutto brisket
							sed velit id non pancetta fatback aliquip tenderloin
							elit. Deserunt short ribs shank ad consectetur
							swine. Consectetur prosciutto salami et andouille
							tri-tip, laborum non bacon hamburger ea in irure
							biltong. Ea consectetur tongue, beef ribs hamburger
							filet mignon eiusmod. Ad in meatball frankfurter
							jowl sausage boudin duis. Dolore aute pastrami
							chislic, spare ribs ground round bresaola aliqua.
						</Text>
					</Alert>
				</Box>
				<Flex direction="column" gap="md" w="100%">
					<OidcProviderButton
						displayName="Email"
						apiProvider="email"
						icon={<IconMail />}
						cfToken={cfToken}
					/>
					<Divider />
					<OidcProviderButton
						displayName="Discord"
						apiProvider="discord"
						icon={<IconBrandDiscord />}
						cfToken={cfToken}
						isExternal
					/>
					<OidcProviderButton
						displayName="Google"
						apiProvider="google"
						icon={<IconBrandGoogle />}
						cfToken={cfToken}
						isExternal
					/>
					<Turnstile
						style={{ width: '100%' }}
						siteKey={getCfSiteKey()}
						options={{
							size: 'flexible',
						}}
						onSuccess={setCfToken}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}

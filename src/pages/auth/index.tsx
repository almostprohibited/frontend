import { useMobileView } from '@/utils/hooks/useMobileView';
import { Divider, Flex, Title } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';
import { Turnstile } from '@marsidev/react-turnstile';
import { getCfSiteKey } from '@/utils/environment';
import { useState } from 'react';

import OidcLoginProviders from './components/oidcLogin';
import EmailLogin from './components/emailLogin';
import ProductPitch from './components/pitch';

export const authLazyRoute = createLazyRoute('/auth')({
	component: AuthPage,
});

function AuthPage() {
	const isMobile = useMobileView();

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
			<Divider />
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
				<ProductPitch />
				<Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
				<Flex direction="column" gap="md" w="100%">
					<EmailLogin cfToken={cfToken} />
					<Divider label="or" labelPosition="center" />
					<OidcLoginProviders cfToken={cfToken} />
					<Divider />
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

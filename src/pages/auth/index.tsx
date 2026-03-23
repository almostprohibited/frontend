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
import SignInButton from './components/signInButton';
import {
	IconBrandDiscord,
	IconBrandFacebook,
	IconBrandGoogle,
	IconMail,
} from '@tabler/icons-react';

export const authLazyRoute = createLazyRoute('/auth')({
	component: AuthPage,
});

function AuthPage() {
	const isMobile = useMobileView();
	const theme = useMantineTheme();

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
					<SignInButton displayName="Email" icon={<IconMail />} />
					<Divider />
					<SignInButton
						displayName="Discord"
						apiProvider="discord"
						icon={<IconBrandDiscord />}
						isExternal
					/>
					<SignInButton
						displayName="Facebook"
						apiProvider="facebook"
						icon={<IconBrandFacebook />}
						isExternal
					/>
					<SignInButton
						displayName="Google"
						apiProvider="google"
						icon={<IconBrandGoogle />}
						isExternal
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}

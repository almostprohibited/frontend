import { Divider, Flex, useMantineTheme } from '@mantine/core';
import styles from './component.module.css';
import { Link } from '@tanstack/react-router';
import { IconBrandGithub, IconCoffee } from '@tabler/icons-react';
import { CleanLink } from '../CleanLink';

const ICON_SIZE = '1.2rem';

export default function Footer() {
	const theme = useMantineTheme();

	return (
		<>
			<Divider />
			<Flex
				className={styles.footer}
				bg={theme.colors.dark[8]}
				color={theme.colors.dark[1]}
				gap={'xl'}
			>
				<Flex direction="column" w="100%" gap="md">
					<Link to="/contact/">{'[ Contact ]'}</Link>
					<Link to="/privacy/">{'[ Privacy Policy ]'}</Link>
				</Flex>
				<Flex direction="column" w="100%" gap="md" align="end">
					<CleanLink
						link="https://buymeacoffee.com/almostprohibited"
						clearStyle
					>
						{'[ '}
						<IconCoffee
							size={ICON_SIZE}
							style={{ verticalAlign: 'text-top' }}
						/>
						{' Buy me a coffee ]'}
					</CleanLink>
					<CleanLink
						link="https://github.com/almostprohibited"
						clearStyle
					>
						{'[ '}
						<IconBrandGithub
							size={ICON_SIZE}
							style={{ verticalAlign: 'text-top' }}
						/>
						{' Source code ]'}
					</CleanLink>
				</Flex>
			</Flex>
		</>
	);
}

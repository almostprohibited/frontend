import { Divider, Flex, useMantineTheme } from '@mantine/core';
import styles from './component.module.css';
import { Link } from '@tanstack/react-router';
import { IconBrandGithub } from '@tabler/icons-react';

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
					<a
						href="https://buymeacoffee.com/almostprohibited"
						target="_blank"
						referrerPolicy="no-referrer"
					>
						{'[ ☕ Buy me a coffee ]'}
					</a>
					<a
						href="https://github.com/almostprohibited"
						target="_blank"
						referrerPolicy="no-referrer"
					>
						{'[ '}
						<IconBrandGithub size="1.1rem" />
						{' Source code ]'}
					</a>
				</Flex>
			</Flex>
		</>
	);
}

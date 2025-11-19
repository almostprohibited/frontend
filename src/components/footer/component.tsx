import { Divider, Flex, useMantineTheme } from '@mantine/core';
import styles from './component.module.css';
import { Link } from '@tanstack/react-router';

export default function Footer() {
	const theme = useMantineTheme();

	return (
		<>
			<Divider />
			<Flex
				className={styles.footer}
				bg={theme.colors.dark[8]}
				color={theme.colors.dark[1]}
				justify={'center'}
				align={'center'}
				gap={'xl'}
			>
				<Link to="/contact/">{'[ Contact ]'}</Link>
				<Link to="/privacy/">{'[ Privacy Policy ]'}</Link>
				<Link to="/roadmap/">{'[ Roadmap ]'}</Link>
			</Flex>
		</>
	);
}

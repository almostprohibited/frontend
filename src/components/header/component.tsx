import { Box, Flex, Text, Tooltip } from '@mantine/core';
import styles from './component.module.css';
import {
	IconBrandGithub,
	IconHome,
	IconLogin2,
	IconUser,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { useIsBeta } from '@/utils/hooks/useIsBeta';
import { useAuth } from '@/auth';

export default function Header() {
	const isBeta = useIsBeta();
	const isMobile = useMobileView();
	const auth = useAuth();

	const iconSize = isMobile ? '1.7rem' : '2rem';

	return (
		<>
			{isBeta && (
				<Box p="0.5rem" bg="yellow">
					<Text fw={700} size="lg" ta="center" c="black">
						This is the beta website! Features may be incomplete, or
						broken!
					</Text>
				</Box>
			)}
			<Flex className={styles.header} align="center" justify="center">
				<Box w="100%">
					<Tooltip label="Home">
						<Link to="/">
							<IconHome size={iconSize} />
						</Link>
					</Tooltip>
				</Box>
				<Box>
					{!isBeta ? (
						<Tooltip label="Github source code">
							{/* this does not use ClearLink as it messes with the tooltip */}
							<a
								href="https://github.com/almostprohibited"
								target="_blank"
								referrerPolicy="no-referrer"
							>
								<IconBrandGithub size={iconSize} />
							</a>
						</Tooltip>
					) : !auth.isAuthenticated ? (
						<Tooltip label="Login">
							<Link to="/auth/">
								<IconLogin2 size={iconSize} />
							</Link>
						</Tooltip>
					) : (
						<Tooltip label="Dashboard">
							<Link to="/dashboard/">
								<IconUser size={iconSize} />
							</Link>
						</Tooltip>
					)}
				</Box>
			</Flex>
		</>
	);
}

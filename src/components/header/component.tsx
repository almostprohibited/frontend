import { Box, Flex, Text, Tooltip } from '@mantine/core';
import styles from './component.module.css';
import { IconBrandGithub, IconHome } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { useIsBeta } from '@/utils/hooks/useIsBeta';

export default function Header() {
	const isBeta = useIsBeta();
	const isMobile = useMobileView();

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
					<Tooltip label="Github source code">
						<a
							href="https://github.com/almostprohibited"
							target="_blank"
							referrerPolicy="no-referrer"
						>
							<IconBrandGithub size={iconSize} />
						</a>
					</Tooltip>
				</Box>
			</Flex>
		</>
	);
}

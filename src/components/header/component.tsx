import { Box, Flex, Tooltip } from '@mantine/core';
import styles from './component.module.css';
import { IconBrandGithub, IconHome } from '@tabler/icons-react';
import { useIsBeta } from '@/utils/hooks/useIsBeta';
import { Link } from '@tanstack/react-router';
import { useMobileView } from '@/utils/hooks/useMobileView';

export default function Header() {
	const isBeta = useIsBeta();
	const isMobile = useMobileView();

	const iconSize = isMobile ? '1.7rem' : '2rem';

	// Don't think I need the extra flex here
	return (
		<Flex className={styles.header} align="center" justify="center">
			<Box w="100%">
				<Tooltip label="Home">
					<Link to="/">
						<IconHome size={iconSize} />
					</Link>
				</Tooltip>
			</Box>
			{isBeta && (
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
			)}
		</Flex>
	);
}

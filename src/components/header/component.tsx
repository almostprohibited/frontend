"use client";

import { Box, Flex, Tooltip } from "@mantine/core";
import Link from "next/link";
import styles from "./component.module.css";
import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import { useIsBeta } from "@/utils/hooks/useIsBeta";

const iconSize = "2rem";

export default function Header() {
	const isBeta = useIsBeta();

	// Don't think I need the extra flex here
	return (
		<Flex className={styles.header} align="center" justify="center">
			<Box w="100%">
				<Tooltip label="Home">
					<Link href={"/"}><IconHome size={iconSize} /></Link>
				</Tooltip>
			</Box>
			{isBeta &&
				<Box>
					<Tooltip label="Github source code">
						<a href="https://github.com/almostprohibited" target="_blank" referrerPolicy="no-referrer"><IconBrandGithub size={iconSize} /></a>
					</Tooltip>
				</Box>
			}
		</Flex>
	);
}

'use client';

import { Divider, Flex, useMantineTheme } from "@mantine/core";
import styles from "./component.module.css";
import Link from "next/link";

export default function Footer() {
	const theme = useMantineTheme();

	return (
		<>
			<Divider />
			<Flex
				className={styles.footer}
				bg={theme.colors.dark[8]}
				color={theme.colors.dark[1]}
				justify={"center"}
				align={"center"}
				gap={"xl"}
			>
				<Link href={"/contact"}>{"[ Contact ]"}</Link>
				<Link href={"/privacy"}>{"[ Privacy Policy ]"}</Link>
				<Link href={"/roadmap"}>{"[ Roadmap ]"}</Link>
			</Flex>
		</>
	);
}

"use client";

import { Box } from "@mantine/core";
import Link from "next/link";
import styles from "./component.module.css";
import { IconHome } from "@tabler/icons-react";

export default function Header() {
	const homeIcon = <IconHome />

	return (
		<Box className={styles.header}>
			<Link href={"/"}>{homeIcon}</Link>
		</Box>
	);
}

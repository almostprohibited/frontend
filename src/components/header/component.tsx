"use client";

import { Box } from "@mantine/core";
import Link from "next/link";
import styles from "./component.module.css";

export default function Header() {
	return (
		<Box className={styles.header}>
			<Link href={"/"}>home</Link>
		</Box>
	);
}

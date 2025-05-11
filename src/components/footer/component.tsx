import { Flex, Grid, GridCol } from "@mantine/core";
import styles from "./component.module.css";
import Link from "next/link";

export default function Footer() {
	return (
		<Flex
			justify={"center"}
			align={"center"}
			gap={"xl"}
		>
			<Link href={"/"}>home</Link>
			<Link href={"/contact"}>Contact</Link>
			<Link href={"/privacy"}>Privacy Policy</Link>
		</Flex>
	);
}

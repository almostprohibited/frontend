"use client";

import { CloseButton, TextInput } from "@mantine/core";
import styles from "./component.module.css";
import { useState } from "react";

export default function SearchBar() {
	const placeHolderValues = [
		"norinco sks",
		"american ruger ranch",
		"ruger 10/22",
		"870",
		"tikka",
		"citadel ad-500",
		"henry lever 357",
	];

	const [placeHolderText] = useState(
		placeHolderValues[Math.floor(Math.random() * placeHolderValues.length)]
	)

	const [value, setValue] = useState("");

	return (
		<TextInput
			classNames={{input: styles.input}}
			placeholder={placeHolderText}
			size="lg"
			value={value}
			onChange={(event) => setValue(event.currentTarget.value)}
			rightSectionPointerEvents="auto"
			rightSection={
				<CloseButton onClick={() => setValue("")} display={value ? undefined: "none"} />
			}
		/>
	);
}

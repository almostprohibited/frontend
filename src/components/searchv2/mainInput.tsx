"use client";

import styles from "./mainInput.module.css";

import { CloseButton, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";

const placeHolderValues = [
	"norinco sks",
	"american ruger ranch",
	"ruger 10/22",
	"tikka t1x",
	"citadel ad-500",
	"henry lever 357",
	"phased plasma rifle 40-watt",
	"chiappa takedown",
	"howa m1500",
	"mauser",
	"cz alpha",
	"winchester 94",
	"mrx bison",
	"LAR mag",
	"10/22 rotary magazine",
	"stripper clip",
	"vortex venom",
	"red dot",
];

export default function MainInput({
	value,
	setValue,
	disabled = false
}: {
	value: string,
	setValue: Dispatch<SetStateAction<string>>,
	disabled?: boolean,
}) {
	const [placeHolderText] = useState(
		placeHolderValues[Math.floor(Math.random() * placeHolderValues.length)]
	)

	const closeButton = <CloseButton onClick={() => setValue("")} display={value ? undefined: "none"} />;
	const searchIcon = <IconSearch />;

	return <TextInput
		disabled={disabled}
		name="query"
		classNames={{input: styles.input, wrapper: styles.override}}
		placeholder={placeHolderText}
		size="lg"
		value={value}
		onChange={(event) => setValue(event.currentTarget.value)}
		rightSectionPointerEvents="auto"
		rightSection={closeButton}
		leftSection={searchIcon}
		flex="1"
		suppressHydrationWarning
	/>;
}
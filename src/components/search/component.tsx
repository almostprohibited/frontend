"use client";

import { ActionIcon, CloseButton, Collapse, Fieldset, Flex, Group, NumberInput, Skeleton, TextInput } from "@mantine/core";
import styles from "./component.module.css";
import { Suspense, useState } from "react";
import { IconAdjustmentsHorizontal, IconSearch, IconSend2 } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import Form from "next/form";

function SuspendedSearch() {
	const searchParams = useSearchParams();
	const query = searchParams.get("query") || "";

	const [value, setValue] = useState(query);

	const placeHolderValues = [
		"norinco sks",
		"american ruger ranch",
		"ruger 10/22",
		"870",
		"tikka",
		"citadel ad-500",
		"henry lever 357",
	];

	// const [placeHolderText] = useState(
	// 	placeHolderValues[Math.floor(Math.random() * placeHolderValues.length)]
	// )

	const [placeHolderText] = useState(
		placeHolderValues[1]
	)

	const closeButton = <CloseButton onClick={() => setValue("")} display={value ? undefined: "none"} />;
	const searchIcon = <IconSearch />;

	return <TextInput
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
	/>;
}

export default function SearchBar() {
	const [filterVisible, filterVisibleToggle] = useState(false);

	const numberInputProps = {
		decimalScale: 2,
		allowNegative: false,
		min: 0,
		prefix: "$",
		hideControls: true
	}

	return (
		<Form action="/search" onKeyDown={(event) => {
			if (event.key === "Enter") {
				event.currentTarget.closest("form")?.requestSubmit();
			}
		}}>
			<Suspense fallback={<Skeleton />}>
				<Flex
					align="center"
					justify="center"
				>
					<ActionIcon
						variant="default"
						size="input-lg"
						mr="0.5rem"
						onClick={() => filterVisibleToggle(!filterVisible)}
					>
						<IconAdjustmentsHorizontal />
					</ActionIcon>
					<SuspendedSearch />
					<ActionIcon
						variant="default"
						size="input-lg"
						ml="0.5rem"
						c="blue"
						// onClick={() => filterVisibleToggle(!filterVisible)}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>
			</Suspense>
			<Collapse mt="1rem" in={filterVisible}>
				<Fieldset legend="Price" display="initial">
					<Group>
						<NumberInput name="min-price" placeholder="minimum price" {...numberInputProps} />
						<NumberInput name="max-price" placeholder="maximum price" {...numberInputProps} />
					</Group>
				</Fieldset>
			</Collapse>
		</Form>
	);
}

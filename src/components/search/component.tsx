"use client";

import { ActionIcon, Center, CloseButton, Collapse, Fieldset, Flex, Group, NumberInput, Pagination, SegmentedControl, Skeleton, TextInput } from "@mantine/core";
import styles from "./component.module.css";
import { Suspense, useState } from "react";
import { IconAdjustmentsHorizontal, IconSearch, IconSend2, IconSortAscendingNumbers, IconSortDescendingNumbers, IconStar } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import Form from "next/form";

const placeHolderValues = [
	"norinco sks",
	"american ruger ranch",
	"ruger 10/22",
	"tikka t1x",
	"citadel ad-500",
	"henry lever 357",
	"phased plasma rifle 40-watt",
	"sterling arms r9",
	"chiappa takedown",
	"howa m1500",
	"mauser",
	"cz alpha",
	"winchester 94",
	"mrx bison"
];

function MainInput() {
	const searchParams = useSearchParams();
	const query = searchParams.get("query") || "";

	const [value, setValue] = useState(query);

	const [placeHolderText] = useState(
		placeHolderValues[Math.floor(Math.random() * placeHolderValues.length)]
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
		suppressHydrationWarning
	/>;
}

function FormattedNumberInput({
	inputName,
	placeholder,
}: {
	inputName: string
	placeholder: string
}) {
	const searchParams = useSearchParams();
	const value = searchParams.get(inputName) || "";

	const numberInputProps = {
		decimalScale: 2,
		allowNegative: false,
		min: 0,
		hideControls: true,
		leftSection: "$"
	};

	return <NumberInput name={inputName} placeholder={placeholder} value={value} {...numberInputProps} />;
}

function SortOptions() {
	const searchParams = useSearchParams();
	const sortParam = searchParams.get("sort") || "relevant";

	const [value, setValue] = useState(sortParam);

	return (
		<SegmentedControl
			value={value}
			onChange={setValue}
			name="sort"
			withItemsBorders={false}
			data = {[
				{
					value: "relevant",
					label: (
						<Center style={{gap: "0.5rem"}}>
							<IconStar size="1rem" />
							<span>Relevent</span>
						</Center>
					)
				},
				{
					value: "price-asc",
					label: (
						<Center style={{gap: "0.5rem"}}>
							<IconSortAscendingNumbers size="1rem" />
							<span>Price Asc</span>
						</Center>
					)
				},
				{
					value: "price-desc",
					label: (
						<Center style={{gap: "0.5rem"}}>
							<IconSortDescendingNumbers size="1rem" />
							<span>Price Desc</span>
						</Center>
					)
				}
			]}
		/>
	);
}

function submitForm(target: Element) {
	target.closest("form")?.requestSubmit();
}

export default function SearchBar({totalCount = 0}: {totalCount: number}) {
	const [filterVisible, filterVisibleToggle] = useState(false);
	const [page, setPage] = useState(0);

	return (
		<Form action="/search" onKeyDown={(event) => {
			if (event.key === "Enter") {
				submitForm(event.currentTarget);
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
					<MainInput />
					<ActionIcon
						variant="default"
						size="input-lg"
						ml="0.5rem"
						c="blue"
						onClick={(event) => submitForm(event.currentTarget)}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>
			</Suspense>
			<Group
				mt="1rem"
				justify="space-between"
			>
				<SortOptions />
				<Pagination
					total={Math.ceil(totalCount / 32)}
					withPages={totalCount > 0}
					onChange={(val) => {
						setPage(val - 1);
						submitForm(document.body)
					}}
					value={page + 1}
				/>
				<input hidden={true} name="page" value={page} readOnly />
			</Group>
			<Collapse mt="1rem" in={filterVisible}>
				<Fieldset legend="Price" display="initial">
					<Group>
						<FormattedNumberInput inputName="min-price" placeholder="minimum price" />
						<FormattedNumberInput inputName="max-price" placeholder="maximum price" />
					</Group>
				</Fieldset>
			</Collapse>
		</Form>
	);
}

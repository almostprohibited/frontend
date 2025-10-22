"use client";

import { useMobileView } from "@/utils/hooks/useMobileView";
import { SegmentedControl, Center } from "@mantine/core";
import { IconStar, IconSortAscendingNumbers, IconSortDescendingNumbers, IconAsterisk, IconBox } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import IconFirearm from "../icons/firearm";
import IconAmmo from "../icons/ammo";

export default function SortOptions({
	sortValue,
	setSortValue,
	categoryValue,
	setCategoryValue,
	onChange,
	disabled = false,
}: {
	sortValue: string,
	setSortValue: Dispatch<SetStateAction<string>>,
	categoryValue: string,
	setCategoryValue: Dispatch<SetStateAction<string>>,
	onChange: () => void,
	disabled?: boolean,
}) {
	const isMobile = useMobileView();

	const segmentWidth = isMobile ? "100%" : "";

	const categories = [
		{
			value: "all",
			label: (
				<Center style={{ gap: "0.5rem" }}>
					<IconAsterisk size="1rem" />
					<span>All</span>
				</Center>
			)
		},
		{
			value: "firearm",
			label: (
				<Center style={{ gap: "0.5rem" }}>
					<IconFirearm size="1rem" />
					<span>Firearms</span>
				</Center>
			)
		},
		{
			value: "ammunition",
			label: (
				<Center style={{ gap: "0.5rem" }}>
					<IconAmmo size="1rem" />
					<span>Ammo</span>
				</Center>
			)
		},
		{
			value: "other",
			label: (
				<Center style={{ gap: "0.5rem" }}>
					<IconBox size="1rem" />
					<span>Other</span>
				</Center>
			)
		}
	];

	return (
		<>
			<SegmentedControl
				w={segmentWidth}
				disabled={disabled}
				value={sortValue}
				onChange={(val) => {
					setSortValue(val);
					onChange();
				}}
				name="sort"
				withItemsBorders={false}
				data={[
					{
						value: "relevant",
						label: (
							<Center style={{ gap: "0.5rem" }}>
								<IconStar size="1rem" />
								<span>Relevant</span>
							</Center>
						)
					},
					{
						value: "price-asc",
						label: (
							<Center style={{ gap: "0.5rem" }}>
								<IconSortAscendingNumbers size="1rem" />
								<span>Price Asc</span>
							</Center>
						)
					},
					{
						value: "price-desc",
						label: (
							<Center style={{ gap: "0.5rem" }}>
								<IconSortDescendingNumbers size="1rem" />
								<span>Price Desc</span>
							</Center>
						)
					}
				]}
			/>
			<SegmentedControl
				w={segmentWidth}
				disabled={disabled}
				value={categoryValue}
				onChange={(val) => {
					setCategoryValue(val);
					onChange();
				}}
				name="category"
				withItemsBorders={false}
				data={categories}
			/>
		</>
	);
}

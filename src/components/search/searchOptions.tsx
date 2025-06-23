"use client";

import { SegmentedControl, Center } from "@mantine/core";
import { IconStar, IconSortAscendingNumbers, IconSortDescendingNumbers, IconAsterisk, IconLayersIntersect, IconBoom } from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SortOptions({
	onChange,
	disabled = false,
}: {
	onChange: CallableFunction,
	disabled?: boolean,
}) {
	const searchParams = useSearchParams();
	const sortParam = searchParams.get("sort") || "relevant";
	const categoryParam = searchParams.get("category") || "all";

	const pathname = usePathname();

	const [sort, setSort] = useState(sortParam);
	const [category, setCategory] = useState(categoryParam);
	const [isFirstRender, setFirstRender] = useState(true);

	useEffect(() => {
		if (!isFirstRender && pathname.startsWith("/search")) {
			onChange();
		} else if (isFirstRender && pathname.startsWith("/search")) {
			setFirstRender(false);
		}
	}, [sort, category, pathname, isFirstRender, onChange]);

	return (
		<>
			<SegmentedControl
				disabled={disabled}
				value={sort}
				onChange={setSort}
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
			<SegmentedControl
				disabled={disabled}
				value={category}
				onChange={setCategory}
				name="category"
				withItemsBorders={false}
				data = {[
					{
						value: "all",
						label: (
							<Center style={{gap: "0.5rem"}}>
								<IconAsterisk size="1rem" />
								<span>All</span>
							</Center>
						)
					},
					{
						value: "firearm",
						label: (
							<Center style={{gap: "0.5rem"}}>
								<IconBoom size="1rem" />
								<span>Firearms</span>
							</Center>
						)
					},
					{
						value: "other",
						label: (
							<Center style={{gap: "0.5rem"}}>
								<IconLayersIntersect size="1rem" />
								<span>Other</span>
							</Center>
						)
					}
				]}
			/>
		</>

	);
}
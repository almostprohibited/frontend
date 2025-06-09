"use client";

import { SegmentedControl, Center } from "@mantine/core";
import { IconStar, IconSortAscendingNumbers, IconSortDescendingNumbers } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortOptions() {
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
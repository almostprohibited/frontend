"use client";

import { ActionIcon, Collapse, Fieldset, Flex, Group, Pagination, Skeleton } from "@mantine/core";
import { Suspense, useState } from "react";
import { IconAdjustmentsHorizontal, IconSend2 } from "@tabler/icons-react";
import Form from "next/form";
import MainInput from "./mainInput";
import SortOptions from "./searchOptions";
import FormattedNumberInput from "./formatedNumberInput";

function submitForm(target: Element) {
	target.closest("form")?.requestSubmit();
}

export default function SearchBar({totalCount = 0}: {totalCount?: number}) {
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
			</Suspense>
		</Form>
	);
}

"use client";

import Form from "next/form";
import MainInput from "./mainInput";
import { ActionIcon, Box, Collapse, Divider, Fieldset, Flex, Group, LoadingOverlay } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconSend2 } from "@tabler/icons-react";
import { ReactElement, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SortOptions from "./searchOptions";
import FormattedNumberInput from "./formatedNumberInput";
import PaginationButtons from "./pagination";
import { useFirstRender } from "@/utils/hooks/useFirstRender";

export default function SearchBar({
	isLoading = false,
	apiResults = <></>,
	totalItems = 0
}: {
	isLoading?: boolean,
	apiResults?: ReactElement,
	totalItems?: number
}) {
	const searchParams = useSearchParams();
	const isFirstLoad = useFirstRender();

	const pathname = usePathname();
	const isSearchPage = pathname.startsWith("/search");

	const [dropdownVisible, setDropdownVisible] = useState(false);

	const initialSearchValue = searchParams.get("query") || "";
	const [queryValue, setQueryValue] = useState(initialSearchValue);

	const minPriceValue = searchParams.get("min-price") || "";
	const maxPriceValue = searchParams.get("max-price") || "";

	const [sortValue, setSortValue] = useState(searchParams.get("sort") || "relevant");
	const [categoryValue, setCategoryValue] = useState(searchParams.get("category") || "all");
	
	const maxPages = Math.ceil(totalItems / 32);
	const initialPage = Number(searchParams.get("page")) || 0;
	const [page, onPageChange] = useState(initialPage)

	function sendQuery(forcePageReset: boolean = false) {
		const form = document.querySelector<HTMLFormElement>("#api");
		if (!form) return;

		const inputPage = form.querySelector<HTMLInputElement>('input#page');
		if (inputPage && (forcePageReset || initialSearchValue !== queryValue)) {
			// evil hack to change form input "in flight"
			inputPage.value = "0";
			onPageChange(1);
		};

		form.requestSubmit();
	}

	useEffect(() => {
		if (isSearchPage && !isFirstLoad) {
			sendQuery();
		}
	}, [page]);

	return (
		<Form disabled={isLoading} id="api" action="/search" onKeyDown={(event) => {
			if (event.key === "Enter") {
				sendQuery()
			};
		}}>
			<Box pos="relative">
				<LoadingOverlay
					overlayProps={{radius: "md", backgroundOpacity: 0.5}}
					visible={isLoading}
					loaderProps={{type: "oval"}}
				/>
				<Flex
					align="center"
					justify="center"
				>
					<ActionIcon
						disabled={isLoading}
						variant="default"
						size="input-md"
						mr="0.5rem"
						onClick={() => setDropdownVisible(!dropdownVisible)}
					>
						<IconAdjustmentsHorizontal />
					</ActionIcon>
					<MainInput disabled={isLoading} value={queryValue} setValue={setQueryValue} />
					<ActionIcon
						disabled={isLoading}
						variant="default"
						size="input-md"
						ml="0.5rem"
						c="blue"
						onClick={() => sendQuery()}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>

				<Group justify="space-between" mt="1rem">
					<SortOptions
						disabled={isLoading}
						sortValue={sortValue}
						setSortValue={setSortValue}
						categoryValue={categoryValue}
						setCategoryValue={setCategoryValue}
						onChange={() => {
							if (isSearchPage) {
								sendQuery(true);
							}
						}}
					/>
				</Group>

				<Collapse mt="1rem" in={dropdownVisible}>
					<Fieldset disabled={isLoading} legend="Price" display="initial">
						<Group>
							<FormattedNumberInput
								inputName="min-price"
								value={minPriceValue}
								placeholder="minimum price"
							/>
							<FormattedNumberInput
								inputName="max-price"
								value={maxPriceValue}
								placeholder="maximum price"
							/>
						</Group>
					</Fieldset>
				</Collapse>
			</Box>

			<input id="page" hidden={true} name="page" value={Math.max(page - 1, 0)} readOnly />

			{
				isSearchPage &&
				<>
					<Divider mt="1rem" mb="1rem" />
					<Flex direction="column" gap="md">
						<PaginationButtons
							page={page}
							maxPages={maxPages}
							setPage={onPageChange}
							isSendingRequest={isLoading}
						/>
						{apiResults}
						<PaginationButtons
							page={page}
							maxPages={maxPages}
							setPage={onPageChange}
							isSendingRequest={isLoading}
						/>
					</Flex>
				</>
			}
		</Form>
	);
}
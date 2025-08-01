"use client";

import Form from "next/form";
import MainInput from "./mainInput";
import { ActionIcon, Box, Collapse, Divider, Fieldset, Flex, Group, LoadingOverlay } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconSend2 } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SortOptions from "./searchOptions";
import FormattedNumberInput from "./formatedNumberInput";
import PaginationButtons from "./pagination";

export default function SearchBar({
	totalItemCount = 0,
	isSendingRequest = false,
	results,
}: {
	totalItemCount?: number,
	isSendingRequest?: boolean,
	results?: ReactNode
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [dropdownVisible, setDropdownVisible] = useState(false);

	const initialSearchValue = searchParams.get("query") || "";
	const [queryValue, setQueryValue] = useState(initialSearchValue);

	const initialMinPriceValue = searchParams.get("min-price") || "";
	const initialMaxPriceValue = searchParams.get("max-price") || "";
	const [minPriceValue, setMinPriceValue] = useState<string | number>(initialMinPriceValue);
	const [maxPriceValue, setMaxPriceValue] = useState<string | number>(initialMaxPriceValue);

	const initialSortParam = searchParams.get("sort") || "relevant";
	const initialCategoryParam = searchParams.get("category") || "all";
	const [sortValue, setSortValue] = useState(initialSortParam);
	const [categoryValue, setCategoryValue] = useState(initialCategoryParam);
	
	const maxPages = Math.ceil(totalItemCount / 32);
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
		if (pathname.startsWith("/search")) {
			sendQuery(true);
		}
	}, [sortValue, categoryValue]);

	useEffect(() => {
		if (pathname.startsWith("/search")) {
			sendQuery();
		}
	}, [page]);

	return (
		<Form disabled={isSendingRequest} id="api" action="/search" onKeyDown={(event) => {
			if (event.key === "Enter") sendQuery();
		}}>
			<Box pos="relative">
				<LoadingOverlay
					overlayProps={{radius: "md", backgroundOpacity: 0.5}}
					visible={isSendingRequest}
					loaderProps={{type: "oval"}}
				/>
				<Flex
					align="center"
					justify="center"
				>
					<ActionIcon
						disabled={isSendingRequest}
						variant="default"
						size="input-lg"
						mr="0.5rem"
						onClick={() => setDropdownVisible(!dropdownVisible)}
					>
						<IconAdjustmentsHorizontal />
					</ActionIcon>
					<MainInput disabled={isSendingRequest} value={queryValue} setValue={setQueryValue} />
					<ActionIcon
						disabled={isSendingRequest}
						variant="default"
						size="input-lg"
						ml="0.5rem"
						c="blue"
						onClick={() => sendQuery()}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>

				<Group justify="space-between" mt="1rem">
					<SortOptions
						disabled={isSendingRequest}
						sortValue={sortValue}
						setSortValue={setSortValue}
						categoryValue={categoryValue}
						setCategoryValue={setCategoryValue}
					/>
				</Group>

				<Collapse mt="1rem" in={dropdownVisible}>
					<Fieldset disabled={isSendingRequest} legend="Price" display="initial">
						<Group>
							<FormattedNumberInput
								inputName="min-price"
								value={minPriceValue}
								setValue={setMinPriceValue}
								placeholder="minimum price"
							/>
							<FormattedNumberInput
								inputName="max-price"
								value={maxPriceValue}
								setValue={setMaxPriceValue}
								placeholder="maximum price"
							/>
						</Group>
					</Fieldset>
				</Collapse>
			</Box>

			{
				results &&
				<>
					<input id="page" hidden={true} name="page" value={Math.max(page - 1, 0)} readOnly />
					<Divider mt="1rem" mb="1rem" />
					<Flex direction="column" gap="md">
						<PaginationButtons
							page={page}
							maxPages={maxPages}
							setPage={onPageChange}
							isSendingRequest={isSendingRequest}
						/>
						{results}
						<PaginationButtons
							page={page}
							maxPages={maxPages}
							setPage={onPageChange}
							isSendingRequest={isSendingRequest}
						/>
					</Flex>
				</>
			}
		</Form>
	);
}
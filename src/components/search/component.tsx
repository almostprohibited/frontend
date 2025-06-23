"use client";

import { ActionIcon, Box, Collapse, Divider, Fieldset, Flex, Group, LoadingOverlay, Pagination, Skeleton } from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { IconAdjustmentsHorizontal, IconSend2 } from "@tabler/icons-react";
import Form from "next/form";
import MainInput from "./mainInput";
import SortOptions from "./searchOptions";
import FormattedNumberInput from "./formatedNumberInput";
import { usePathname, useSearchParams } from "next/navigation";
import Firearms from "@/app/search/components/results";

function submitForm() {
	const form: HTMLFormElement | null = document.querySelector("#api");
	form?.requestSubmit();
}

export default function SearchBar() {
	const searchParams = useSearchParams();
	const queryPage = Number(searchParams.get("page")) || 0;

	const pathname = usePathname();
	
	const [totalItemsCount, setTotalCount] = useState(0);

	const maxPages = Math.ceil(totalItemsCount / 32);

	const [filterVisible, filterVisibleToggle] = useState(false);
	const [isFirstLoad, setFirstLoad] = useState(true);
	const [isSendingRequest, setSendingRequest] = useState(false);
	const [page, onPageChange] = useState(queryPage)

	useEffect(() => {
		if (!isFirstLoad) {
			submitForm();
		} else if (isFirstLoad) {
			setFirstLoad(false);
		}
	}, [page]);

	return (
		<Form disabled={isSendingRequest} id="api" action="/search" onKeyDown={(event) => {
			if (event.key === "Enter") {
				submitForm();
			}
		}}>
			<Box pos="relative">
				<Flex
					align="center"
					justify="center"
				>
					<LoadingOverlay
						overlayProps={{radius: "md", backgroundOpacity: 0.5}}
						visible={isSendingRequest}
						loaderProps={{type: "oval"}}
					/>
					<ActionIcon
						disabled={isSendingRequest}
						variant="default"
						size="input-lg"
						mr="0.5rem"
						onClick={() => filterVisibleToggle(!filterVisible)}
					>
						<IconAdjustmentsHorizontal />
					</ActionIcon>
					<MainInput disabled={isSendingRequest} />
					<ActionIcon
						disabled={isSendingRequest}
						variant="default"
						size="input-lg"
						ml="0.5rem"
						c="blue"
						onClick={submitForm}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>

				<Group
					mt="1rem"
					justify="space-between"
				>
					<SortOptions disabled={isSendingRequest} onChange={submitForm} />
					<Pagination
						value={Math.max(page, 1)}
						total={maxPages}
						onChange={onPageChange}
						disabled={maxPages <= 1 || isSendingRequest ? true : false}
					/>
					<input id="page" hidden={true} name="page" value={Math.max(page - 1, 0)} readOnly />
				</Group>

				<Collapse mt="1rem" in={filterVisible}>
					<Fieldset disabled={isSendingRequest} legend="Price" display="initial">
						<Group>
							<FormattedNumberInput inputName="min-price" placeholder="minimum price" />
							<FormattedNumberInput inputName="max-price" placeholder="maximum price" />
						</Group>
					</Fieldset>
				</Collapse>
			</Box>

			{pathname.startsWith("/search") && 
				<>
					<Divider mt="1rem" mb="1rem" />
					<Suspense fallback={<Skeleton />}>
						<Firearms setTotalCount={setTotalCount} setLoadingOverlay={setSendingRequest} />
					</Suspense>
					<Divider mt="1rem" mb="1rem" />
				</>
			}

			<Flex pos="relative" align="flex-center" justify="flex-end">
				<LoadingOverlay
					overlayProps={{radius: "md", backgroundOpacity: 0.5}}
					visible={isSendingRequest}
					loaderProps={{type: "oval"}}
				/>
				<Pagination
					value={Math.max(page, 1)}
					total={maxPages}
					onChange={onPageChange}
					disabled={maxPages <= 1 || isSendingRequest ? true : false}
				/>
			</Flex>
		</Form>
	);
}

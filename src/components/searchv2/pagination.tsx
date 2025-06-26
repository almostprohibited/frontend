import { Flex, LoadingOverlay, Pagination } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

export default function PaginationButtons({
	page,
	setPage,
	maxPages,
	isSendingRequest,
}: {
	page: number,
	setPage: Dispatch<SetStateAction<number>>,
	maxPages: number,
	isSendingRequest: boolean,
}) {
	return (
		<Flex w="100%" justify="flex-end" pos="relative">
			<LoadingOverlay
				overlayProps={{radius: "md", backgroundOpacity: 0.5}}
				visible={isSendingRequest}
				loaderProps={{type: "oval"}}
			/>
			<Pagination
				value={Math.max(page, 1)}
				total={maxPages}
				onChange={setPage}
				disabled={maxPages <= 1 || isSendingRequest}
			/>
		</Flex>
	);
}
import { Flex, LoadingOverlay, Pagination } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

export default function PaginationButtons({
	page,
	setPage,
	maxPages,
	isSendingRequest,
}: {
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	maxPages: number;
	isSendingRequest: boolean;
}) {
	return (
		<Flex justify="flex-end" pos="relative" flex="1">
			<LoadingOverlay
				overlayProps={{ radius: 'md', backgroundOpacity: 0.5 }}
				visible={isSendingRequest}
				loaderProps={{ type: 'oval' }}
			/>
			<Pagination
				value={page}
				total={maxPages}
				onChange={(val) => setPage(val - 1)}
				disabled={maxPages <= 1 || isSendingRequest}
			/>
		</Flex>
	);
}

"use client";

import useResultsBuilder from "@/components/apiResponse/buildResults";
import SearchBar from "@/components/searchv2/component";
import { useSearchApi } from "@/utils/apiRequest";
import { Box, Skeleton } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchBarWrapper() {
	const searchParams = useSearchParams();
	
	// TODO: do something about `error`, I removed it to stop the linter from complaining about
	// unused vars but we should fix this edge case: data is cached, but second API request fails
	const {data, isLoading} = useSearchApi(searchParams);
	
	const results = useResultsBuilder(isLoading, data);

	return <SearchBar isLoading={isLoading} apiResults={results} totalItems={data ? data.total_count : 0} />
}

export default function SearchPage() {
	return (
		<Box mt="2rem" w={"100%"} p={"var(--content-side-padding)"}>
			<Suspense fallback={<Skeleton />}>
				<SearchBarWrapper />
			</Suspense>
		</Box>
	);
}

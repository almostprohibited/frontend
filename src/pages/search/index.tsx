import useResultsBuilder from '@/components/apiResponse/buildResults';
import SearchBar from '@/components/searchbar/component';
import { useSearchApi } from '@/utils/apiRequest';
import { Box, Skeleton } from '@mantine/core';
import {
	createLazyRoute,
	defaultStringifySearch,
	useSearch,
} from '@tanstack/react-router';
import { Suspense } from 'react';

function Wrapper() {
	const searchParams = useSearch({ from: '/search', shouldThrow: false })!;
	const searchString = defaultStringifySearch(searchParams);

	// TODO: do something about `error`, I removed it to stop the linter from complaining about
	// unused vars but we should fix this edge case: data is cached, but second API request fails
	const { data, isLoading } = useSearchApi(searchString);

	const results = useResultsBuilder(isLoading, data);

	return (
		<SearchBar
			child={results}
			isLoading={isLoading}
			totalItems={data?.total_count || 0}
		/>
	);
}

function SearchPage() {
	return (
		<Box mt="2rem" w={'100%'} p={'var(--content-side-padding)'}>
			<Suspense fallback={<Skeleton />}>
				<Wrapper />
			</Suspense>
		</Box>
	);
}

export const searchLazyRoute = createLazyRoute('/search')({
	component: SearchPage,
});

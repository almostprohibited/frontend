import { useMobileView } from '@/utils/hooks/useMobileView';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { SimpleGrid } from '@mantine/core';
import ErrorResult from '../fallbacks/errorResult';
import LoadingSearch from './loadingSearch';
import ProductCard from './productCard';
import type { SearchApiResponse } from '@/utils/apiStructs';
import EmptyResult from '../fallbacks/emptyResult';

export default function useResultsBuilder(
	isLoading: boolean,
	data?: SearchApiResponse,
) {
	const isSmallWindow = useMobileView();
	const [viewProductPrice, setViewProductPrice] = useState(false);

	if (data) {
		const resultElements: Array<ReactElement> = [];

		if (data.total_count === 0) {
			return <EmptyResult />;
		}

		data.items.forEach((apiResult) => {
			resultElements.push(
				<ProductCard
					key={apiResult.name + apiResult.url}
					crawlData={apiResult}
					viewProductPrice={viewProductPrice}
					setViewProductPrice={setViewProductPrice}
				/>,
			);
		});

		return (
			<SimpleGrid cols={isSmallWindow ? 2 : 4}>
				{...resultElements}
			</SimpleGrid>
		);
	}

	if (isLoading) {
		return <LoadingSearch />;
	}

	return <ErrorResult />;
}

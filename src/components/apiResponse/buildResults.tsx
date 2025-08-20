"use client";

import { useMobileView } from "@/utils/hooks/useMobileView";
import { ReactElement, useState } from "react";
import EmptySearch from "./emptySearch";
import { SimpleGrid } from "@mantine/core";
import ErrorSearch from "./errorSearch";
import LoadingSearch from "./loadingSearch";
import ProductCard from "./productCard";
import { ApiResponse } from "@/utils/apiStructs";

export default function useResultsBuilder(isLoading: boolean, data?: ApiResponse) {
	const isSmallWindow = useMobileView();
	const [viewProductPrice, setViewProductPrice] = useState(false);

	if (data) {
		const resultElements: Array<ReactElement> = [];

		if (data.total_count === 0) {
			return <EmptySearch />;
		}

		
		data.items.forEach(apiResult => {
			resultElements.push(
				<ProductCard
					key={apiResult.name + apiResult.url}
					crawlData={apiResult}
					viewProductPrice={viewProductPrice}
					setViewProductPrice={setViewProductPrice}
				/>
			);
		})

		return (
			<SimpleGrid cols={isSmallWindow ? 2 : 4}>
				{...resultElements}
			</SimpleGrid>
		);
	}

	if (isLoading) {
		return <LoadingSearch />;
	}

	return <ErrorSearch />;
}

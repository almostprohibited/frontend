import { ApiResponse } from "@/utils/apiStructs";
import { SimpleGrid } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, ReactElement, useEffect } from "react";
import EmptySearch from "./emptySearch";
import ProductCard from "./productCard";
import { useMediaQuery } from "@mantine/hooks";

export default function Results({
	setTotalCount,
	setLoadingOverlay,
}: {
	setTotalCount: Dispatch<SetStateAction<number>>,
	setLoadingOverlay: Dispatch<SetStateAction<boolean>>,
}) {
	const searchParams = useSearchParams();
	const isSmallWindow = useMediaQuery("(max-width: 1000px)");

	const [results, setResults] = useState<Array<ReactElement>>([]);

	useEffect(() => {
		setLoadingOverlay(true);

		const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?`;

		fetch(url + searchParams.toString()).then(async response => {
			return await response.json();
		})
		.then(async (data: ApiResponse) => {
			const resultElements: Array<ReactElement> = [];
			console.log(data);
			data.items.forEach(apiResult => {
				resultElements.push(<ProductCard key={apiResult.url} crawlData={apiResult}/>);
			})

			setResults(resultElements);
			setTotalCount(data.total_count);
		})
		.finally(() => {
			setLoadingOverlay(false);
		});
	}, [searchParams, setTotalCount, setLoadingOverlay])

	if (results.length === 0) {
		return <EmptySearch />;
	}
	
	return (
		<SimpleGrid cols={isSmallWindow ? 3 : 4}>
			{...results}
		</SimpleGrid>
	);
}
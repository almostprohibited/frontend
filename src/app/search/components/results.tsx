import { ApiResponse } from "@/utils/apiStructs";
import { SimpleGrid } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, ReactElement, useEffect } from "react";
import EmptySearch from "./emptySearch";
import ProductCard from "./productCard";
import { useMobileView } from "@/utils/hooks/useMobileView";

// export default function Results({
// 	setTotalCount,
// 	setLoadingOverlay,
// }: {
// 	setTotalCount: Dispatch<SetStateAction<number>>,
// 	setLoadingOverlay: Dispatch<SetStateAction<boolean>>,
// }) {
export default function Results({
	setTotalItems,
	setLoadingState,
}: {
	setTotalItems: Dispatch<SetStateAction<number>>,
	setLoadingState: Dispatch<SetStateAction<boolean>>,
}) {
	const searchParams = useSearchParams();
	const isSmallWindow = useMobileView();

	const [results, setResults] = useState<Array<ReactElement>>([]);

	useEffect(() => {
		setLoadingState(true);

		const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?`;

		fetch(url + searchParams.toString()).then(async response => {
			return await response.json();
		})
		.then(async (data: ApiResponse) => {
			const resultElements: Array<ReactElement> = [];
			
			data.items.forEach(apiResult => {
				resultElements.push(<ProductCard key={apiResult.name} crawlData={apiResult}/>);
			})

			setResults(resultElements);
			setTotalItems(data.total_count);
		})
		.finally(() => {
			setLoadingState(false);
		});
	}, [searchParams])

	if (results.length === 0) {
		return <EmptySearch />;
	}
	
	return (
		<SimpleGrid cols={isSmallWindow ? 2 : 4}>
			{...results}
		</SimpleGrid>
	);
}
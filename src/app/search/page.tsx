"use client";

import SearchBar from "@/components/search/component";
import { Box, Divider, keys, SimpleGrid, Skeleton } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { Dispatch, ReactElement, SetStateAction, Suspense, useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import { ApiResponse, FirearmResult } from "../../utils/apiStructs";
import EmptySearch from "./components/emptySearch";

function Firearms({setTotalCount}: {setTotalCount: Dispatch<SetStateAction<number>>}) {
	const searchParams = useSearchParams();

	const [firearms, setFirearms] = useState<Array<ReactElement>>([]);
	const [isSearching, setIsSearching] = useState(true);

	useEffect(() => {
		const url = new URL("http://localhost:3001/api");

		// who reverses KV pair arguments, wtf nextjs
		searchParams.forEach((value, key) => {
			url.searchParams.append(key, value);
		});

		fetch(url).then(async response => {
			return await response.json();
		})
		.then(async (data: ApiResponse) => {
			const firearmObjs: Array<ReactElement> = [];
			
			data.firearms.forEach(firearm => {
				firearmObjs.push(<ProductCard key={firearm.link} firearm={firearm}/>);
			})

			setFirearms(firearmObjs);
			setTotalCount(data.total_count);
		});
	}, [searchParams])

	if (isSearching) {
		// do loading
	}

	if (firearms.length === 0) {
		return <EmptySearch />;
	}
	
	return (
		<SimpleGrid cols={4}>
			{...firearms}
		</SimpleGrid>
	);
}

export default function SearchPage() {
	const [totalCount, setTotalCount] = useState(0);

	return (
		<Box mt="2rem" w={"100%"} p={"var(--content-side-padding)"}>
			<SearchBar totalCount={totalCount} />
			<Divider mt="1rem" mb="1rem" />
			<Suspense fallback={<Skeleton />}>
				<Firearms setTotalCount={setTotalCount} />
			</Suspense>
		</Box>
	);
}

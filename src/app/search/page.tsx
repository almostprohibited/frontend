"use client";

import SearchBar from "@/components/search/component";
import { Box, Divider, Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { ReactElement, Suspense, useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import { FirearmResult } from "./searchResult";
import EmptySearch from "./components/emptySearch";

function SuspendedFirearms() {
	const searchParams = useSearchParams();
	const search = searchParams.get("query") || "";

	const [firearms, setFirearms] = useState<Array<ReactElement>>([]);

	useEffect(() => {
		const url = new URL("http://localhost:3001/api");
		url.searchParams.append("query", search);

		console.log("sending request to " + url);

		fetch(url).then(async response => {
			return await response.json();
		})
		.then(async (data: Array<FirearmResult>) => {
			const firearmObjs: Array<ReactElement> = [];
			
			data.forEach(firearm => {
				console.log(firearm);
				firearmObjs.push(<ProductCard key={firearm.link} firearm={firearm}/>);
			})

			setFirearms(firearmObjs);
		})
	}, [search])

	if (firearms.length === 0) {
		return <EmptySearch />;
	} else {
		return (
			<SimpleGrid cols={4}>
				{...firearms}
			</SimpleGrid>
		);
	}

}

export default function SearchPage() {
	return (
		<Box mt="2rem" w={"100%"} p={"var(--content-side-padding)"}>
			<SearchBar />
			<Divider mt="1rem" mb="1rem" />
			<Suspense>
				<SuspendedFirearms />
			</Suspense>
		</Box>
	);
}

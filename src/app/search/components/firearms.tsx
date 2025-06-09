import { ApiResponse } from "@/utils/apiStructs";
import { SimpleGrid } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, ReactElement, useEffect } from "react";
import EmptySearch from "./emptySearch";
import ProductCard from "./productCard";

export default function Firearms({setTotalCount}: {setTotalCount: Dispatch<SetStateAction<number>>}) {
	const searchParams = useSearchParams();

	const [firearms, setFirearms] = useState<Array<ReactElement>>([]);
	// const [isSearching, setIsSearching] = useState(true);

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
	}, [searchParams, setTotalCount])

	// if (isSearching) {
	// 	// do loading
	// }

	if (firearms.length === 0) {
		return <EmptySearch />;
	}
	
	return (
		<SimpleGrid cols={4}>
			{...firearms}
		</SimpleGrid>
	);
}
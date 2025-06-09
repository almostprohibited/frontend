"use client";

import SearchBar from "@/components/search/component";
import { Box, Divider, Skeleton } from "@mantine/core";
import { Suspense, useState } from "react";
import Firearms from "./components/firearms";

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

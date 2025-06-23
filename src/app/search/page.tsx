"use client";

import SearchBar from "@/components/search/component";
import { Box, Skeleton } from "@mantine/core";
import { Suspense } from "react";

export default function SearchPage() {
	return (
		<Box mt="2rem" w={"100%"} p={"var(--content-side-padding)"}>
			<Suspense fallback={<Skeleton />}>
				<SearchBar />
			</Suspense>
		</Box>
	);
}

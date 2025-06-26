"use client";

import SearchBar from "@/components/searchv2/component";
import { Box, Skeleton } from "@mantine/core";
import { Suspense, useState } from "react";
import Results from "./components/results";

export default function SearchPage() {
	const [totalItems, setTotalItems] = useState(0);
	const [isSendingRequest, setSendingRequest] = useState(false);

	return (
		<Box mt="2rem" w={"100%"} p={"var(--content-side-padding)"}>
			<Suspense fallback={<Skeleton />}>
				<SearchBar
					totalItemCount={totalItems}
					isSendingRequest={isSendingRequest}
					results={
						<Results
							setTotalItems={setTotalItems}
							setLoadingState={setSendingRequest}
						/>}
					/>
			</Suspense>
		</Box>
	);
}

"use client";

import SearchBar from "@/components/search/component";
import { Box, Divider, Skeleton } from "@mantine/core";
import { Suspense, useState } from "react";
import Firearms from "./components/results";

export default function SearchPage() {
	return (
		<Box mt="2rem" w={"100%"} p={"var(--content-side-padding)"}>
			<SearchBar />
		</Box>
	);
}

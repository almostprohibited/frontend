"use client";

import { Box, Center, Divider, Skeleton, Space, Text, Title, useMantineTheme } from "@mantine/core";
import SearchBar from "@/components/searchv2/component";
import RetailerCards from "@/components/retailerCards/component";
import { Suspense } from "react";

export default function Home() {
	const theme = useMantineTheme();

	return (
		<>
			<Center>
				<Box ta={"center"} pt={"2rem"} pb={"2rem"} w={"100%"} bg={theme.colors.indigo[9]} c={theme.colors.cyan[1]}>
					<Title order={1}>AlmostProhibited.ca</Title>
					<Space h={"lg"} />
					<Text>{"Canada's upcoming aggregator for firearms, parts, and accessories"}</Text>
				</Box>
			</Center>
			<Center mt={"2rem"} mb={"2rem"}>
				<Box w={"100%"} p={"var(--content-side-padding)"}>
					<Suspense fallback={<Skeleton />}>
						<SearchBar />
					</Suspense>
				</Box>
			</Center>
			<Divider />
			<Space h={"xl"} />
			<Center>
				<RetailerCards />
			</Center>
		</>
	);
}

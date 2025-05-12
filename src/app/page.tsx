"use client";

import { Box, Center, Divider, Space, Text, Title, useMantineTheme } from "@mantine/core";
import SearchBar from "@/components/search/component";
import RetailerCards from "@/components/retailerCards/component";

export default function Home() {
	const theme = useMantineTheme();

	return (
		<>
			<Center>
				<Box ta={"center"} pt={"2rem"} pb={"2rem"} w={"100%"} bg={theme.colors.indigo[9]} c={theme.colors.cyan[1]}>
					<Title order={1}>almostprohibited.ca</Title>
					<Space h={"lg"} />
					<Text>Canada&apos;s upcoming sporting goods product aggregator</Text>
				</Box>
			</Center>
			<Space h={"xl"} />
			<Center>
				<Box ta={"center"} w={"100%"} p={"var(--content-side-padding)"}>
					<SearchBar />
				</Box>
			</Center>
			<Space h={"xl"} />
			<Divider />
			<Space h={"xl"} />
			<Center>
				<RetailerCards />
			</Center>
		</>
	);
}

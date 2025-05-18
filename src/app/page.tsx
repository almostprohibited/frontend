"use client";

import { Alert, Box, Center, Divider, Group, Space, Text, Title, useMantineTheme } from "@mantine/core";
import SearchBar from "@/components/search/component";
import RetailerCards from "@/components/retailerCards/component";
import { IconInfoCircle } from "@tabler/icons-react";

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
			<Center mt={"2rem"} mb={"2rem"}>
				<Box w={"100%"} p={"var(--content-side-padding)"}>
					<SearchBar />
				</Box>
			</Center>
			<Divider />
			<Center mt={"2rem"} mb={"2rem"}>
				<Box w={"100%"} p={"var(--content-side-padding)"}>
					<Alert variant="outline" color="blue" title="Hey, heads up!" icon={<IconInfoCircle />}>
						<Text size="sm">
							This website is in development, some elements and cards might move around from time to time.
						</Text>
					</Alert>
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

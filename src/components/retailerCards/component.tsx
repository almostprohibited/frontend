"use client";

import { Box, Card, SimpleGrid, Space, Text, Title } from "@mantine/core";

export default function RetailerCards() {
	const retailers = ["Reliable Gun", "Italian Sporting Goods"];
	const retailerCards: Array<React.ReactElement> = [];

	retailers.forEach(retailer => {
		retailerCards.push(
			<Card key={retailer}>
				<Text>{retailer}</Text>
			</Card>
		)
	});

	return (
		<Box ta={"center"}>
			<Title order={3}>Supported Retailers</Title>
			<Space h={"xl"} />
			<SimpleGrid cols={4}>
				{retailerCards}
			</SimpleGrid>
		</Box>
	);
}

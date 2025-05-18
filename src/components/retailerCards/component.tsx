"use client";

import { Alert, Box, Card, Space, Text, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

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
		<Box w={"100%"} p={"var(--content-side-padding)"}>
			<Title order={3} ta={"center"} >Supported Retailers</Title>
			<Space h={"xl"} />
			{/* <SimpleGrid cols={4}>
				{retailerCards}
			</SimpleGrid> */}
			<Alert variant="outline" color="yellow" title="Under construction!" icon={<IconAlertTriangle />}>
				<Text size="sm">
					This section is under construction! Check back later.
				</Text>
			</Alert>
		</Box>
	);
}

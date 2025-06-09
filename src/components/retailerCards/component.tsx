"use client";

import { RetailerEnum } from "@/utils/apiStructs";
import { Box, SimpleGrid, Space, Text, Title, Image, Card, CardSection, Center, Anchor } from "@mantine/core";

export default function RetailerCards() {
	const retailerCards: Array<React.ReactElement> = [];

	RetailerEnum.getRetailers().forEach(retailer => {
		retailerCards.push(
			<Anchor
				key={retailer.name}
				href={retailer.url}
				target="_blank"
				underline="never"
				c="initial"
			>
				<Card shadow="sm" radius="md">
					<CardSection>
						<Image
							alt=""
							src={retailer.logoUrl}
							radius="md"
							fit="contain"
							h="5rem" />
					</CardSection>
					<Center mt="1rem">
						<Text size="xl">{retailer.name}</Text>
					</Center>
				</Card>
			</Anchor>
		)
	});

	return (
		<Box w={"100%"} p={"var(--content-side-padding)"}>
			<Title order={3} ta={"center"} >Supported Retailers</Title>
			<Space h={"xl"} />
			<SimpleGrid cols={4}>
				{retailerCards}
			</SimpleGrid>
		</Box>
	);
}

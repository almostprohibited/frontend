"use client";

import { Box, Center, Flex, Text } from "@mantine/core";

export default function LoadingSearch() {
	return (
		<Center h="100%">
			<Flex
				c="dark"
				justify="center"
				align="center"
				gap="sm"
			>
				<Box>
					<Text size="xl">{"hold on, we're searching the database!"}</Text>
				</Box>
			</Flex>
		</Center>
	);
}
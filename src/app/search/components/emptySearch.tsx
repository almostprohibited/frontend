import { Box, Center, Flex, Group, Stack, Text } from "@mantine/core";
import { IconZoomQuestion } from "@tabler/icons-react";

export default function EmptySearch() {
	return (
		<Center h="100%">
			<Flex
				c="dark"
				justify="center"
				align="center"
				gap="sm"
			>
				<IconZoomQuestion size={"3rem"} />
				<Box>
					<Text size="xl">whoops, no results were found, please try again</Text>
				</Box>
			</Flex>
		</Center>
	);
}
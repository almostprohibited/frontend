import { Box, Center, Flex, Stack, Text } from "@mantine/core";
import { IconMapQuestion } from "@tabler/icons-react";

export default function http404() {
	return (
		<Center h="100%">
			<Flex
				justify="center"
				align="center"
				gap="md"
				c="grey"
			>
				<IconMapQuestion size={"5rem"} />
				<Box>
					<Stack>
						<Text size="xl">404 Not Found</Text>
						<Text>whatever you are looking for is not here</Text>
					</Stack>
				</Box>
			</Flex>
		</Center>
	);
}
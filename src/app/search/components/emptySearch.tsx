import { Box, Center, Group, Text } from "@mantine/core";
import { IconMapX } from "@tabler/icons-react";

export default function EmptySearch() {
	return (
		<Center>
			<Group c={"dark"}>
				<IconMapX size={"3rem"} />
				<Box>
					<Text size="xl">whoops, no results were found, please try again</Text>
				</Box>
			</Group>
		</Center>
	);
}
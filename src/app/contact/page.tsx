import { Alert, Box, Space, Text, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function contactPage() {
	return (
		<Box mt="2rem">
			<Title order={2} ta={"center"}>Contact Me</Title>
			<Space h="xl" />
			<Alert variant="outline" color="yellow" title="Under construction!" icon={<IconAlertTriangle />}>
				<Text size="sm">
					This section is under construction! Check back later.
				</Text>
			</Alert>
		</Box>
	);
}

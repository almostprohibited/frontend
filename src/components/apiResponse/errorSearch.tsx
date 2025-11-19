import { Box, Center, Flex, Text } from '@mantine/core';
import { IconDatabaseExclamation } from '@tabler/icons-react';

export default function ErrorSearch() {
	return (
		<Center h="100%">
			<Flex c="dark" justify="center" align="center" gap="sm">
				<IconDatabaseExclamation size={'3rem'} />
				<Box>
					<Text size="xl">something went wrong, try again</Text>
					<Text size="xl">
						if the problem persists, please contact me
					</Text>
				</Box>
			</Flex>
		</Center>
	);
}

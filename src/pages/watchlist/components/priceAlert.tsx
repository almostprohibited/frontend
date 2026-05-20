import { ActionIcon, Card, Divider, Flex, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export function PriceAlert({ deleteHandler }: { deleteHandler: () => void }) {
	return (
		<Card withBorder shadow="sm">
			<Flex direction="column" gap="lg">
				<Flex direction="row" align="center">
					<ActionIcon
						variant="outline"
						size="lg"
						color="red"
						onClick={deleteHandler}
					>
						<IconTrash />
					</ActionIcon>
					<Title
						order={3}
						ta="center"
						pos="absolute"
						left="50%"
						style={{ transform: 'translateX(-50%)' }}
					>
						Price Settings
					</Title>
				</Flex>
				<Divider />
			</Flex>
		</Card>
	);
}

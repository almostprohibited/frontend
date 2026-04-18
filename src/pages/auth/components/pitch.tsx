import { Flex, Stack, Title, Text, Card, CardSection } from '@mantine/core';
import { IconBinoculars, IconTag, type Icon } from '@tabler/icons-react';

export default function ProductPitch() {
	return (
		<Flex w="100%" direction="column" gap="xl" justify="space-between">
			<Pitch
				Icon={IconBinoculars}
				title="Product stock alerts"
				text="Get notified for products that show up in stock across the supported retailers"
			/>
			<Pitch
				Icon={IconTag}
				title="Price change aware"
				text="Configure your alerts to only notify you if the product drops in price"
			/>
		</Flex>
	);
}

function Pitch({
	Icon,
	title,
	text,
}: {
	Icon: Icon;
	title: string;
	text: string;
}) {
	return (
		<Card withBorder shadow="sm">
			<CardSection p="1rem">
				<Flex gap="md" align="center">
					<Icon size="5rem" stroke={1} style={{ flex: '1 0 auto' }} />

					<Stack gap="xs" w="100%">
						<Title order={3}>{title}</Title>
						<Text>{text}</Text>
					</Stack>
				</Flex>
			</CardSection>
		</Card>
	);
}

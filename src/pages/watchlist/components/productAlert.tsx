import { usePlaceHolderSearch } from '@/utils/hooks/usePlaceHolderSearch';
import { Flex, Card, TextInput, Button, Text, Divider } from '@mantine/core';
import {
	IconArrowBackUp,
	IconCoin,
	IconDeviceFloppy,
	IconDiscount,
	IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

export function ProductAlert() {
	const [name, setName] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const [placeholderSearch] = useState(usePlaceHolderSearch());

	return (
		<Card id={Date.now().toString()} withBorder shadow="md">
			<Flex w="100%" direction="column" gap="lg">
				<Flex gap="md">
					<TextInput
						size="md"
						placeholder="alert name"
						value={name}
						flex="1"
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
					<Button size="md" variant="outline" color="red">
						<IconTrash />
					</Button>
				</Flex>
				<Flex direction="row" align="center" gap="md">
					<Text size="lg">I want to be alerted when</Text>
					<TextInput
						flex="1"
						placeholder={placeholderSearch}
						value={searchTerm}
						onChange={(event) => {
							setSearchTerm(event.target.value);
						}}
					/>
					<Text size="lg">is in stock.</Text>
				</Flex>
				<Divider />
				<Flex direction="row" justify="space-between">
					<Flex direction="row" gap="md">
						<Button variant="outline" color="green">
							<IconCoin />
						</Button>
						<Button variant="outline" color="green">
							<IconDiscount />
						</Button>
					</Flex>
					<Flex direction="row" gap="md">
						<Button
							variant="outline"
							leftSection={<IconArrowBackUp />}
						>
							<Text>Undo Changes</Text>
						</Button>
						<Button
							variant="outline"
							leftSection={<IconDeviceFloppy />}
						>
							<Text>Save</Text>
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}

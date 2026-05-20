import {
	Flex,
	Card,
	TextInput,
	Button,
	Text,
	AccordionItem,
	AccordionControl,
	AccordionPanel,
	Space,
	Title,
	Divider,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import {
	IconArrowBackUp,
	IconDeviceFloppy,
	IconPlus,
	IconTag,
	IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { SearchTerm } from './searchTerm';
import { PriceAlert } from './priceAlert';

export function ProductAlert({ accordionId }: { accordionId: string }) {
	const [name, setName] = useState('');

	const [priceAlert, setPriceAlert] = useState(false);

	const [searchTermInputIds, searchTermInputIdsHandler] =
		useListState<number>([Date.now()]);

	function handleSearchDelete(key: number) {
		const index = searchTermInputIds.findIndex((id) => id === key);

		if (index !== -1) {
			searchTermInputIdsHandler.remove(index);
		}
	}

	function addSearchTermInput() {
		searchTermInputIdsHandler.append(Date.now());
	}

	function handleDeletePrice() {
		setPriceAlert(false);
	}

	return (
		<AccordionItem
			value={accordionId}
			key={accordionId}
			onKeyUp={(event) => {
				if (event.key === ' ') {
					event.preventDefault();
				}
			}}
		>
			<Flex align="center" gap="md">
				<AccordionControl>
					<TextInput
						w="100%"
						size="md"
						placeholder="alert name"
						value={name}
						leftSection={<IconTag />}
						flex="1"
						onChange={(event) => {
							setName(event.target.value);
						}}
						onClick={(event) => {
							event.stopPropagation();
						}}
					/>
				</AccordionControl>
			</Flex>
			<AccordionPanel>
				<Flex w="100%" direction="column" gap="xl" mt="1rem">
					<Card
						withBorder
						shadow="sm"
						display={
							searchTermInputIds.length > 0 ? 'initial' : 'none'
						}
					>
						<Flex direction="column" gap="lg">
							<Flex direction="column" gap="md" w="100%">
								<Title order={3} ta="center">
									Search Terms
								</Title>
								<Divider />
								<Text>
									I want to be alerted when any of the
									following search terms appears:
								</Text>
								{searchTermInputIds.map((id) => (
									<SearchTerm
										key={id}
										id={id}
										isLastInput={
											searchTermInputIds.length === 1
										}
										handleDelete={handleSearchDelete}
									/>
								))}
							</Flex>
						</Flex>
						<Space h="xl" />
						<Button
							variant="outline"
							color="green"
							leftSection={<IconPlus />}
							rightSection={<span />}
							justify="space-between"
							onClick={addSearchTermInput}
						>
							<Text>Search Term</Text>
						</Button>
					</Card>
					{priceAlert ? (
						<PriceAlert deleteHandler={handleDeletePrice} />
					) : (
						<></>
					)}
					<Flex direction="row" justify="space-between" align="end">
						<Flex direction="column" gap="md">
							<Button
								variant="outline"
								color="green"
								leftSection={<IconPlus />}
								rightSection={<span />}
								justify="space-between"
								disabled={priceAlert}
								onClick={() => setPriceAlert(true)}
							>
								<Text>Price Alert</Text>
							</Button>
						</Flex>
						<Flex direction="column" gap="md">
							<Button
								variant="outline"
								color="red"
								leftSection={<IconTrash />}
							>
								<Text>Delete</Text>
							</Button>
							<Space />
							<Button
								variant="outline"
								color="gray"
								leftSection={<IconArrowBackUp />}
							>
								<Text>Cancel</Text>
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
			</AccordionPanel>
		</AccordionItem>
	);
}

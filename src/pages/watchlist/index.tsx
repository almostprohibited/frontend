import {
	Accordion,
	Box,
	Button,
	Divider,
	Flex,
	Space,
	Text,
	Title,
} from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';
import { IconClipboardPlus, IconPlus } from '@tabler/icons-react';
import { useListState } from '@mantine/hooks';
import { ProductAlert } from './components/productAlert';

export const watchListLazyRoute = createLazyRoute('/watchlist')({
	component: WatchListPage,
});

function WatchListPage() {
	const [productAlertIds, productAlertIdsHandler] = useListState<string>([]);
	const [openAccordionItems, openAccordionItemsHandler] =
		useListState<string>([]);

	function addProductAlert() {
		const newId = Date.now().toString();

		productAlertIdsHandler.insert(0, newId);
		openAccordionItemsHandler.append(newId);
	}

	return (
		<Flex p={'var(--content-side-padding)'} direction="column" gap="xl">
			<Space />
			<Title>Watch List</Title>
			<Button variant="outline" size="lg" onClick={addProductAlert}>
				<Flex justify="center" gap="sm">
					<IconPlus />
					<Text>Add</Text>
				</Flex>
			</Button>
			<Divider />
			{productAlertIds.length === 0 ? (
				<Flex c="dark" justify="center" align="center" gap="sm">
					<IconClipboardPlus size={'3rem'} />
					<Box>
						<Text size="xl">
							No product alerts found, add one to get started
						</Text>
					</Box>
				</Flex>
			) : (
				<Accordion
					multiple
					variant="separated"
					chevronPosition="left"
					value={openAccordionItems}
					onChange={(openItems) => {
						openAccordionItemsHandler.setState(openItems);
					}}
				>
					{productAlertIds.map((id) => (
						<ProductAlert key={id} accordionId={id} />
					))}
				</Accordion>
			)}
		</Flex>
	);
}

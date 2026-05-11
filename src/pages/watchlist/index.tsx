import { Box, Button, Divider, Flex, Space, Text, Title } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';
import { IconClipboardPlus, IconPlus } from '@tabler/icons-react';
import { useListState } from '@mantine/hooks';
import type { ReactElement } from 'react';
import { ProductAlert } from './components/productAlert';

export const watchListLazyRoute = createLazyRoute('/watchlist')({
	component: WatchListPage,
});

function WatchListPage() {
	const [productAlerts, productAlertsHandler] = useListState<ReactElement>(
		[],
	);

	function addProductAlert() {
		productAlertsHandler.append(<ProductAlert />);
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
			{productAlerts.length === 0 ? (
				<Flex c="dark" justify="center" align="center" gap="sm">
					<IconClipboardPlus size={'3rem'} />
					<Box>
						<Text size="xl">
							No product alerts found, add one to get started
						</Text>
					</Box>
				</Flex>
			) : (
				productAlerts
			)}
		</Flex>
	);
}

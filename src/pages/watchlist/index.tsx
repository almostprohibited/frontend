import { Text } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';

export const watchListLazyRoute = createLazyRoute('/watchlist')({
	component: WatchListPage,
});

function WatchListPage() {
	return <Text>watch list</Text>;
}

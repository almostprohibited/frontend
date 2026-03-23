import { Box } from '@mantine/core';
import { createLazyRoute } from '@tanstack/react-router';

export const dashboardLazyRoute = createLazyRoute('/dashboard')({
	component: DashboardPage,
});

function DashboardPage() {
	return <Box>hello world</Box>;
}

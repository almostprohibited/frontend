import { useAuth } from '@/auth';
import { Box, Button } from '@mantine/core';
import { createLazyRoute, useNavigate } from '@tanstack/react-router';

export const dashboardLazyRoute = createLazyRoute('/dashboard')({
	component: DashboardPage,
});

function DashboardPage() {
	const auth = useAuth();
	const navigate = useNavigate();

	function logout() {
		auth.logout();

		navigate({ to: '/' });
	}

	return (
		<>
			<Box>hello world</Box>
			<Button onClick={logout}>logout</Button>
		</>
	);
}

import { useAuth } from '@/auth';
import { getApiDomain } from '@/utils/environment';
import { Box, Button } from '@mantine/core';
import { createLazyRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const dashboardLazyRoute = createLazyRoute('/dashboard')({
	component: DashboardPage,
});

function DashboardPage() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	function logout() {
		setIsLoading(true);

		fetch(`${getApiDomain()}/api/auth/logout`, {
			method: 'DELETE',
			credentials:
				process.env.NODE_ENV === 'development'
					? 'include'
					: 'same-origin',
		}).then((response) => {
			if (response.ok) {
				auth.logout();

				navigate({ to: '/' });
			}
		});
	}

	return (
		<>
			<Box>hello world</Box>
			<Button
				onClick={logout}
				loading={isLoading}
				loaderProps={{ type: 'oval' }}
			>
				logout
			</Button>
		</>
	);
}

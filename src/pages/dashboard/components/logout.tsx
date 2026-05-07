import { useAuth } from '@/auth';
import { getApiDomain } from '@/utils/environment';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export default function Logout() {
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
		}).then((_) => {
			auth.logout();

			navigate({ to: '/' });
		});
	}

	return (
		<Button
			onClick={logout}
			loading={isLoading}
			loaderProps={{ type: 'oval' }}
			variant="outline"
			leftSection={<IconLogout />}
		>
			Logout
		</Button>
	);
}

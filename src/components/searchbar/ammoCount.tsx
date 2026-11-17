import { RangeSlider, Stack, Text } from '@mantine/core';

export function AmmoCount() {
	return (
		<Stack gap="lg">
			<RangeSlider
				restrictToMarks
				label={null}
				size="sm"
				defaultValue={[0, 5]}
				min={0}
				max={8}
				marks={[
					{ value: 0, label: '0' },
					{ value: 1, label: '5' },
					{ value: 2, label: '10' },
					{ value: 3, label: '20' },
					{ value: 4, label: '50' },
					{ value: 5, label: '100' },
					{ value: 6, label: '250' },
					{ value: 7, label: '500' },
					{ value: 8, label: '1000' },
				]}
				mt="1.5rem"
				styles={{
					markLabel: {
						transform: 'translate(-50%, calc(-100% - 0.75rem))',
					},
				}}
			/>
			<Text c="dimmed" size="sm">
				The ammo count filter is a "best effort" filter. Products that
				do not have an ammo count will always be included.
			</Text>
		</Stack>
	);
}

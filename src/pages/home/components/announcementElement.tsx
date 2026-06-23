import {
	Alert,
	Box,
	Text,
	useMantineTheme,
	Stack,
	Progress,
} from '@mantine/core';
import type { AnnouncementObject } from './activeAnnouncements';

export default function AnnouncementElement({
	data,
	progress,
}: {
	data: AnnouncementObject;
	progress: number;
}) {
	const theme = useMantineTheme();

	return (
		<Alert
			key={data.title}
			variant="outline"
			color={data.colour}
			radius="md"
			title={data.title}
			m={'var(--content-side-padding)'}
			icon={data.icon}
		>
			<Stack>
				<Box c={theme.colors.gray[4]}>{data.content()}</Box>
				{data.date ? (
					<Text size="xs" c="grey">
						{data.date}
					</Text>
				) : (
					<></>
				)}
				<Progress
					size="xs"
					color={data.colour}
					value={progress}
					animated
				/>
			</Stack>
		</Alert>
	);
}

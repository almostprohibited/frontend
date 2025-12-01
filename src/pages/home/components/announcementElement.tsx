import type { AnnouncementObject } from './announcements';
import { Alert, Box, useMantineTheme } from '@mantine/core';

export default function AnnouncementElement({
	data,
}: {
	data: AnnouncementObject;
}) {
	const theme = useMantineTheme();
	// const [progressBarLength, setProgressBarLength] = useState(100);

	// useInterval(
	// 	() => {
	// 		setProgressBarLength(progressBarLength - 10);
	// 	},
	// 	100,
	// 	{ autoInvoke: true },
	// );

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
			<Box c={theme.colors.gray[4]}>{data.content()}</Box>
			{/* <Progress
				mt="1rem"
				size="xs"
				color={data.colour}
				value={progressBarLength}
			/> */}
		</Alert>
	);
}

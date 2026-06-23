import { useMobileView } from '@/utils/hooks/useMobileView';
import {
	ActionIcon,
	Box,
	Breadcrumbs,
	Flex,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import getActiveAnnouncements from './activeAnnouncements';
import AnnouncementElement from './announcementElement';

export default function Announcements() {
	const announcements = getActiveAnnouncements();

	const theme = useMantineTheme();
	const isMobile = useMobileView();

	const [activeIndex, setActiveIndex] = useState(0);
	const [progressBarLength, setProgressBarLength] = useState(100);

	const currentDelayMs = announcements[activeIndex].timeout_ms;

	const progressBarInterval = useInterval(() => {
		setProgressBarLength((prev) =>
			Math.max(0, prev - 5000 / currentDelayMs),
		);

		// will this destroy performance? I don't know
		if (progressBarLength === 0) {
			setActiveIndex((prev) => (prev + 1) % announcements.length);
		}
	}, 50);

	useEffect(() => {
		progressBarInterval.stop();

		setProgressBarLength(100);

		progressBarInterval.start();
	}, [activeIndex]);

	const breadcrumbs = [];

	for (const [index, _] of announcements.entries()) {
		breadcrumbs.push(
			<ActionIcon
				value={index}
				variant={index === activeIndex ? 'filled' : 'light'}
				size="xs"
				radius="xl"
				color={theme.colors.blue[8]}
				onClick={(event) => {
					setActiveIndex(Number.parseInt(event.currentTarget.value));
				}}
			/>,
		);
	}

	return (
		<Flex direction="column" align="center" w="100%">
			<Title order={3} mb="1rem">
				Announcements
			</Title>
			<Breadcrumbs separator="-" mb="1rem">
				{breadcrumbs}
			</Breadcrumbs>
			<Box
				w={isMobile ? '100%' : '75%'}
				m={'var(--content-side-padding)'}
			>
				<AnnouncementElement
					data={announcements[activeIndex]}
					progress={progressBarLength}
				/>
			</Box>
		</Flex>
	);
}

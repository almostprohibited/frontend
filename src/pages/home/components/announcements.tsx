import { useMobileView } from '@/utils/hooks/useMobileView';
import {
	Box,
	Breadcrumbs,
	Button,
	Flex,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import React, { useState } from 'react';
import getActiveAnnouncements from './activeAnnouncements';
import AnnouncementElement from './announcementElement';

export interface AnnouncementObject {
	title: string;
	content: () => React.ReactNode;
	colour: string;
	icon: React.ReactNode;
	shouldDisplay: () => boolean;
}

export const ANNOUNCEMENT_COUNTDOWN_MS = 10_000;

export default function Announcements() {
	const theme = useMantineTheme();
	const isMobile = useMobileView();
	const [activeIndex, setActiveIndex] = useState(0);

	const announcements = getActiveAnnouncements();

	const interval = useInterval(
		() => {
			setActiveIndex((activeIndex + 1) % announcements.length);
		},
		ANNOUNCEMENT_COUNTDOWN_MS,
		{ autoInvoke: true },
	);

	const breadcrumbs = [];

	for (const [index, _] of announcements.entries()) {
		breadcrumbs.push(
			<Button
				value={index}
				variant={index === activeIndex ? 'filled' : 'light'}
				size="1rem"
				radius="xl"
				color={theme.colors.blue[8]}
				onClick={(event) => {
					setActiveIndex(Number.parseInt(event.currentTarget.value));
					interval.stop();
					interval.start();
				}}
			/>,
		);
	}

	return (
		<Flex direction="column" align="center" w="100%">
			<Title order={3} mb="1rem">
				Announcements
			</Title>
			<Box
				w={isMobile ? '100%' : '75%'}
				m={'var(--content-side-padding)'}
			>
				<AnnouncementElement data={announcements[activeIndex]} />
			</Box>
			<Breadcrumbs separator="-" mt="1rem">
				{breadcrumbs}
			</Breadcrumbs>
		</Flex>
	);
}

import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBuildingStore,
	IconConfetti,
	IconMessage,
} from '@tabler/icons-react';
import { List, ListItem, Stack, Text, useMantineTheme } from '@mantine/core';
import type { AnnouncementObject } from './announcements';

export default function getActiveAnnouncements() {
	const theme = useMantineTheme();

	const announcements: AnnouncementObject[] = [
		{
			title: 'Happy birthday to us!',
			content: () => {
				const yearsOld = getYearsOld();

				return (
					<Text>
						We're turning {yearsOld} year{yearsOld > 1 ? 's' : ''}{' '}
						old this week! AlmostProhibited was born on June 26th,
						2025.
					</Text>
				);
			},
			date: undefined,
			colour: 'orange',
			icon: <IconConfetti size="2rem" />,
			shouldDisplay: () => isBirthdayWeek(),
		},
		{
			title: 'Recently Added Retailers',
			content: () => {
				return (
					<Stack>
						<Text>Easthill Outdoors has been added!</Text>
					</Stack>
				);
			},
			date: 'May 3, 2026',
			colour: theme.colors.grape[4],
			icon: <IconBuildingStore size="2rem" />,
			shouldDisplay: () => true,
		},
		{
			title: 'Google Form Feedback - Thanks',
			content: () => {
				return (
					<Stack>
						<Text>
							Thanks to those that took the time to fill out the
							feedback form, your feedback and extra comments are
							much appreciated!
						</Text>
						<Text>
							Judging from the form, the next new feature that
							people want to see the most is the stock and price
							drop notification system. Stay tuned for updates on
							this.
						</Text>
					</Stack>
				);
			},
			date: 'Mar 21, 2026',
			colour: theme.colors.teal[3],
			icon: <IconMessage size="2rem" />,
			shouldDisplay: () => true,
		},
	];

	return announcements.filter((announcement) => announcement.shouldDisplay());
}

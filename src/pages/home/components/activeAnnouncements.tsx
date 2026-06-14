import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBuildingStore,
	IconConfetti,
	IconMessage,
	IconTool,
} from '@tabler/icons-react';
import { Stack, Text, useMantineTheme } from '@mantine/core';
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
			title: 'Server Maintenance',
			content: () => {
				return (
					<Stack>
						<Text>
							The site will be down for up to two hours later
							today, June 13th at roughly 12am for maintenance.
						</Text>
					</Stack>
				);
			},
			date: 'June 13, 2026',
			colour: theme.colors.green[4],
			icon: <IconTool size="2rem" />,
			shouldDisplay: () => true,
		},
		{
			title: 'Recently Added Retailers',
			content: () => {
				return (
					<Stack>
						<Text>
							General Gun & Supply and Range Arts have been added
							to the site!
						</Text>
					</Stack>
				);
			},
			date: 'June 11, 2026',
			colour: theme.colors.yellow[4],
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

import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBuildingStore,
	IconCloudOff,
	IconConfetti,
	IconMessage,
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
			title: 'May 31st Outage',
			content: () => {
				return (
					<Stack>
						<Text>
							Hey all, some of you may have noticed that the site
							was down from roughly May 30th @ 11PM PT, to May
							31st @ 12PM PT.
						</Text>
						<Text>
							This was due to the disk space on the server filling
							up with the automated backups, causing processes to
							fail in the background as they were no longer able
							to save their data. Each backup is roughly 2.7GB in
							size.
						</Text>
						<Text>
							In the short term, I'll spin up another disk
							parition specifically for backups and reduce the
							number of daily backups kept the local machine from
							14 days, to 7 days.
						</Text>
						<Text>
							Thanks to the 5 of you that had reached out (or had
							tried to).
						</Text>
					</Stack>
				);
			},
			date: 'May 31, 2026',
			colour: theme.colors.red[8],
			icon: <IconCloudOff size="2rem" />,
			shouldDisplay: () => Date.now() < 1780426800000,
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

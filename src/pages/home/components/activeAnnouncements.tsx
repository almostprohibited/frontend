import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBuildingStore,
	IconConfetti,
	IconMessage,
	IconZoomQuestion,
} from '@tabler/icons-react';
import { Stack, Text, useMantineTheme } from '@mantine/core';
import { CleanLink } from '@/components/CleanLink';

const ANNOUNCEMENT_COUNTDOWN_MS_DEFAULT = 20_000;

export interface AnnouncementObject {
	title: string;
	content: () => React.ReactNode;
	date: string | undefined;
	colour: string;
	icon: React.ReactNode;
	shouldDisplay: () => boolean;
	timeout_ms: number;
}

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
			timeout_ms: ANNOUNCEMENT_COUNTDOWN_MS_DEFAULT,
			shouldDisplay: () => isBirthdayWeek(),
		},
		{
			title: 'Recently Added Retailers',
			content: () => {
				return (
					<Stack>
						<Text>
							<CleanLink link="https://dstactical.com/">
								DS Tactical
							</CleanLink>
							{' and '}
							<CleanLink link="https://partsonly.ca/">
								Parts Only Canada
							</CleanLink>{' '}
							have been added to the site!
						</Text>
					</Stack>
				);
			},
			date: 'August 12, 2026',
			colour: theme.colors.indigo[4],
			icon: <IconBuildingStore size="2rem" />,
			timeout_ms: 20_000,
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
			date: 'March 21, 2026',
			colour: theme.colors.teal[3],
			icon: <IconMessage size="2rem" />,
			timeout_ms: ANNOUNCEMENT_COUNTDOWN_MS_DEFAULT,
			shouldDisplay: () => true,
		},
	];

	return announcements.filter((announcement) => announcement.shouldDisplay());
}

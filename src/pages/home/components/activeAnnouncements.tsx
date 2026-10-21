import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBuildingStore,
	IconCloudCancel,
	IconConfetti,
	IconMessage,
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
							<CleanLink link="https://gobigtactical.ca/">
								Go Big Tactical
							</CleanLink>
							{' (BC) and '}
							<CleanLink link="https://www.gun-shop.ca/">
								Wild West
							</CleanLink>
							{' (Alberta) '}
							have been added to the site!
						</Text>
					</Stack>
				);
			},
			date: 'October 4, 2026',
			colour: theme.colors.green[5],
			icon: <IconBuildingStore size="2rem" />,
			timeout_ms: 20_000,
			shouldDisplay: () => true,
		},
		{
			title: 'Latulippe - Temporarily Down',
			content: () => {
				return (
					<Stack>
						<Text>
							For now, Latulippe's (Quebec) results will not show
							up on the site. This is due to their product pages
							being protected by Cloudflare's managed challenge
							(that "Performing security validation" check).
						</Text>
						<Text>
							In short, my crawler does not solve or handle those
							challenges since it wasn't needed at the time and I
							never implemented it. I'll fix this at some point.
						</Text>
					</Stack>
				);
			},
			date: 'September 29, 2026',
			colour: theme.colors.red[4],
			icon: <IconCloudCancel size="2rem" />,
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

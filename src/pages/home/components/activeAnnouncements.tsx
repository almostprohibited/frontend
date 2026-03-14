import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBuildingStore,
	IconConfetti,
	IconLetterCase,
	IconMessage,
} from '@tabler/icons-react';
import { Anchor, Stack, Text, useMantineTheme } from '@mantine/core';
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
					<Text>
						{'Budget Shooter Supply has been added to the site!'}
					</Text>
				);
			},
			date: 'Mar 13, 2026',
			colour: theme.colors.green[3],
			icon: <IconBuildingStore size="2rem" />,
			shouldDisplay: () => true,
		},
		{
			title: 'Font Change',
			content: () => {
				return (
					<Text>
						{
							"No, your eyes are not playing games with you. I've finally configured a font for the website after nearly 9 months of using Arial."
						}
					</Text>
				);
			},
			date: 'Mar 13, 2026',
			colour: theme.colors.red[3],
			icon: <IconLetterCase size="2rem" />,
			shouldDisplay: () => true,
		},
		{
			title: 'Google Form Feedback - Update',
			content: () => {
				return (
					<Stack>
						<Text>
							{
								"I hear you all loud and clear: you want more retailers. I'll make sure to expand the supported retailers above all else for the time being."
							}
						</Text>
						<Text>
							{"If you haven't yet, check out the "}
							<Anchor
								href="https://forms.gle/vRjUKfENuUDkMh4n6"
								target="_blank"
							>
								{'Google Form'}
							</Anchor>
							{
								' to provide your feedback on the site. This form will still remain open for more responses.'
							}
						</Text>
					</Stack>
				);
			},
			date: 'Feb 28, 2026',
			colour: theme.colors.orange[3],
			icon: <IconMessage size="2rem" />,
			shouldDisplay: () => true,
		},
		// {
		// 	title: 'Open source',
		// 	content: () => {
		// 		return (
		// 			<Text>
		// 				{'AlmostProhibited is now open source on '}
		// 				<Anchor
		// 					href="https://github.com/almostprohibited"
		// 					target="_blank"
		// 				>
		// 					Github
		// 				</Anchor>
		// 				{
		// 					'! What this means is that the source code that powers this site, and the backend, are now free to view and use.'
		// 				}
		// 			</Text>
		// 		);
		// 	},
		// 	colour: 'gray',
		// 	icon: <IconBrandGithub size="2rem" />,
		// 	shouldDisplay: () => true,
		// },
	];

	return announcements.filter((announcement) => announcement.shouldDisplay());
}

import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import { IconConfetti, IconMessage } from '@tabler/icons-react';
import { Anchor, Text, useMantineTheme } from '@mantine/core';
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
			colour: 'orange',
			icon: <IconConfetti size="2rem" />,
			shouldDisplay: () => isBirthdayWeek(),
		},
		{
			title: 'Google Form Feedback',
			content: () => {
				return (
					<Text>
						{
							'Hey you! I have some features that I want to add to the site and wanted some light feedback. Feel free to take a minute and fill out the '
						}
						<Anchor
							href="https://forms.gle/vRjUKfENuUDkMh4n6"
							target="_blank"
						>
							{'Google Form'}
						</Anchor>
						{
							'. This form will remain open for some time, likely until one of those features gets added.'
						}
					</Text>
				);
			},
			colour: theme.colors.grape[3],
			icon: <IconMessage size="2rem" />,
			shouldDisplay: () => true,
		},
		// {
		// 	title: 'Recently added retailers',
		// 	content: () => {
		// 		return <Text>CRAFM has been added to the site!</Text>;
		// 	},
		// 	colour: 'blue',
		// 	icon: <IconBuildingStore size="2rem" />,
		// 	shouldDisplay: () => true,
		// },
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

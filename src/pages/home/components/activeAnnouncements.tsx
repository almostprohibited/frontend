import { getYearsOld, isBirthdayWeek } from '@/utils/birthday';
import {
	IconBrandGithub,
	IconBuildingStore,
	IconConfetti,
} from '@tabler/icons-react';
import { Anchor, Text } from '@mantine/core';
import type { AnnouncementObject } from './announcements';

export default function getActiveAnnouncements() {
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
			title: 'Recently added retailers',
			content: () => {
				return (
					<Text>
						Frontier Firearms and Gold'n Loan Outfitters have been
						added to the crawler!
					</Text>
				);
			},
			colour: 'green',
			icon: <IconBuildingStore size="2rem" />,
			shouldDisplay: () => true,
		},
		{
			title: 'Open source',
			content: () => {
				return (
					<Text>
						{'AlmostProhibited is now open source on '}
						<Anchor
							href="https://github.com/almostprohibited"
							target="_blank"
						>
							Github
						</Anchor>
						{
							'! What this means is that the source code that powers this site, and the backend, are now free to view and use.'
						}
					</Text>
				);
			},
			colour: 'gray',
			icon: <IconBrandGithub size="2rem" />,
			shouldDisplay: () => true,
		},
	];

	return announcements.filter((announcement) => announcement.shouldDisplay());
}

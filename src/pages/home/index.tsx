import {
	Box,
	Center,
	Divider,
	Space,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import RetailerCards from '@/components/retailerCards/component';
import SearchBar from '@/components/searchbar/component';
import { createLazyRoute } from '@tanstack/react-router';
import Announcements from './components/announcements';
import getActiveAnnouncements from './components/activeAnnouncements';

export const homeLazyRoute = createLazyRoute('/')({
	component: Home,
});

function Home() {
	const theme = useMantineTheme();

	return (
		<>
			<Center>
				<Box
					ta={'center'}
					pt={'2rem'}
					pb={'2rem'}
					w={'100%'}
					bg={theme.colors.indigo[9]}
					c={theme.colors.cyan[1]}
				>
					<Title order={1}>AlmostProhibited.ca</Title>
					<Space h={'lg'} />
					<Text>
						{
							"Canada's upcoming aggregator for firearms, parts, and accessories"
						}
					</Text>
				</Box>
			</Center>
			<Center mt={'2rem'} mb={'2rem'}>
				<Box w={'100%'} p={'var(--content-side-padding)'}>
					<SearchBar />
				</Box>
			</Center>

			<Divider />

			{getActiveAnnouncements().length > 0 && (
				<>
					<Center mt={'2rem'} mb={'2rem'}>
						<Announcements />
					</Center>
					<Divider />
				</>
			)}

			<Space h={'xl'} />
			<Center>
				<RetailerCards />
			</Center>
		</>
	);
}

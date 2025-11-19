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
import { isBirthday } from '@/utils/birthday';
import BirthdayAlert from '@/pages/home/components/birthday';
import SearchBar from '@/components/searchbar/component';
import { createLazyRoute } from '@tanstack/react-router';

export const homeLazyRoute = createLazyRoute('/')({
	component: Home,
});

function Home() {
	const theme = useMantineTheme();
	const birthday = isBirthday();

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
			{birthday && (
				<>
					<Space h={'xl'} />
					<BirthdayAlert />
				</>
			)}
			<Space h={'xl'} />
			<Center>
				<RetailerCards />
			</Center>
		</>
	);
}

import { useRetailersStatusApi } from '@/utils/apiRequest';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { RetailerEnum } from '@/utils/retailerConstants';
import {
	Box,
	SimpleGrid,
	Space,
	Text,
	Title,
	Image,
	Card,
	CardSection,
	Center,
	Flex,
	Skeleton,
	Tooltip,
	NumberFormatter,
	useMantineTheme,
} from '@mantine/core';
import IconFirearm from '../icons/firearm';
import IconAmmo from '../icons/ammo';
import { IconBox } from '@tabler/icons-react';
import type { RetailerStatusCountApiResponse } from '@/utils/apiStructs';
import type { ReactElement } from 'react';
import { RetailerNameContainer } from '../RetailerNameContainer';

function ItemCount({
	icon,
	labelSuffix,
	count,
}: {
	icon: ReactElement;
	labelSuffix: string;
	count: number | undefined;
}) {
	const isMobile = useMobileView();

	return (
		<Tooltip label={`${count} ${labelSuffix}`}>
			<Flex
				direction={isMobile ? 'row' : 'column'}
				gap="md"
				align="center"
				justify="center"
				flex={1}
			>
				{icon}
				<Skeleton visible={count === undefined} w="3rem">
					<Text ta="center">
						<NumberFormatter value={count ?? 0} thousandSeparator />
					</Text>
				</Skeleton>
			</Flex>
		</Tooltip>
	);
}

function RetailerCountStats({
	retailerApiName,
	counts,
}: {
	retailerApiName: string;
	counts: RetailerStatusCountApiResponse | undefined;
}) {
	const isMobile = useMobileView();

	return (
		<Flex
			w="100%"
			direction={isMobile ? 'column' : 'row'}
			gap="xs"
			justify="center"
			key={retailerApiName}
		>
			<ItemCount
				icon={<IconFirearm size="1.5rem" />}
				labelSuffix="firearms"
				count={counts?.firearms}
			/>
			<ItemCount
				icon={<IconAmmo size="1.5rem" />}
				labelSuffix="ammo items"
				count={counts?.ammo}
			/>
			<ItemCount
				icon={<IconBox size="1.5rem" />}
				labelSuffix="miscellaneous items"
				count={counts?.other}
			/>
		</Flex>
	);
}

function RetailerCrawlState({
	crawlTime,
	successful,
}: {
	crawlTime: number | undefined;
	successful: boolean | undefined;
}) {
	const theme = useMantineTheme();

	const currentUnixSecs = new Date().getTime() / 1000;
	const timeDiffSecs = currentUnixSecs - (crawlTime ?? 0);
	const timeDiffHours = timeDiffSecs / 60 / 60;
	const displayDiff = timeDiffHours.toFixed(2);

	const stateColour =
		timeDiffHours < 24 ? theme.colors.green[6] : theme.colors.orange[6];

	const successColour = successful
		? theme.colors.green[6]
		: theme.colors.orange[6];

	return (
		<Skeleton
			visible={crawlTime === undefined}
			miw="3rem"
			style={{ alignSelf: 'end' }}
		>
			<Center c="dimmed">
				<Text size="sm">
					{'Last crawled'}{' '}
					<Text span c={stateColour}>{`${displayDiff}`}</Text>{' '}
					{'hours ago'}{' '}
					<Text
						span
						size="sm"
						c={successColour}
					>{`${successful ? 'successfully' : 'with errors'}`}</Text>
				</Text>
			</Center>
		</Skeleton>
	);
}

export default function RetailerCards() {
	const isMobile = useMobileView();
	const { data, isLoading: _ } = useRetailersStatusApi();

	const retailerCards: Array<React.ReactElement> = [];

	RetailerEnum.getRetailers()
		.sort((a, b) => {
			return a.name.localeCompare(b.name);
		})
		.forEach((retailer) => {
			const cardChildren = [
				<CardSection>
					<Image
						p="0.25rem"
						alt=""
						src={retailer.logoUrl}
						radius="md"
						fit="contain"
						h="5rem"
					/>
				</CardSection>,
				<CardSection>
					<RetailerNameContainer retailer={retailer} textSize="lg" />
				</CardSection>,
				<RetailerCountStats
					retailerApiName={retailer.apiName}
					counts={data?.[retailer.apiName].counts}
				/>,
				<RetailerCrawlState
					crawlTime={data?.[retailer.apiName].timestamp}
					successful={data?.[retailer.apiName].successful}
				/>,
			];

			retailerCards.push(
				<Card
					key={retailer.name}
					component="a"
					href={retailer.url}
					target="_blank"
					shadow="sm"
					radius="md"
					style={{
						display: 'grid',
						gridRow: `span ${cardChildren.length}`,
						gridTemplateRows: 'subgrid',
						rowGap: 'var(--mantine-spacing-md)',
						underline: 'never',
						color: 'inherit',
					}}
				>
					{cardChildren}
				</Card>,
			);
		});

	return (
		<Box w={'100%'} p={'var(--content-side-padding)'}>
			<Title
				order={3}
				ta={'center'}
			>{`${RetailerEnum.getRetailers().length} Supported Retailers`}</Title>
			<Space h={'xl'} />
			<SimpleGrid cols={isMobile ? 2 : 4}>{retailerCards}</SimpleGrid>
		</Box>
	);
}

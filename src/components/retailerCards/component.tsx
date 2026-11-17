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
	Anchor,
	Flex,
	Divider,
	Skeleton,
	Tooltip,
	NumberFormatter,
} from '@mantine/core';
import IconFirearm from '../icons/firearm';
import IconAmmo from '../icons/ammo';
import { IconBox } from '@tabler/icons-react';
import type { RetailerStatusCountApiResponse } from '@/utils/apiStructs';
import type { ReactElement } from 'react';

function ItemCount({
	icon,
	labelSuffix,
	count,
}: {
	icon: ReactElement;
	labelSuffix: string;
	count: number | undefined;
}) {
	return (
		<Tooltip label={`${count} ${labelSuffix}`}>
			<Flex
				direction="column"
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

function RetailerStatus({
	retailerApiName,
	counts,
}: {
	retailerApiName: string;
	counts: RetailerStatusCountApiResponse | undefined;
}) {
	//        const currentUnixSecs = new Date().getTime() / 1000;
	// const timeDiffSecs = currentUnixSecs - crawlData.query_time;
	//    const timeDiffHours = timeDiffSecs / 60 / 60;

	return (
		<Flex w="100%" justify="center" key={retailerApiName}>
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

export default function RetailerCards() {
	const isMobile = useMobileView();
	const { data, isLoading: _ } = useRetailersStatusApi();

	const retailerCards: Array<React.ReactElement> = [];

	RetailerEnum.getRetailers()
		.sort((a, b) => {
			return a.name.localeCompare(b.name);
		})
		.forEach((retailer) => {
			retailerCards.push(
				<Anchor
					key={retailer.name}
					href={retailer.url}
					target="_blank"
					underline="never"
					c="initial"
				>
					<Card shadow="sm" radius="md">
						<CardSection>
							<Image
								p="0.25rem"
								alt=""
								src={retailer.logoUrl}
								radius="md"
								fit="contain"
								h="5rem"
							/>
						</CardSection>
						<Center mt="1rem">
							<Text size="lg" ta="center">
								{retailer.name}
							</Text>
						</Center>
						<Divider size="md" mt="1rem" mb="1rem" />
						<RetailerStatus
							retailerApiName={retailer.apiName}
							counts={data?.[retailer.apiName].counts}
						/>
					</Card>
				</Anchor>,
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

import { useHistoryApi } from '@/utils/apiRequest';
import type { CrawlResult } from '@/utils/apiStructs';
import {
	centsToHumanString,
	convertTimestampToHumanReadable,
} from '@/utils/format';
import { useMobileView } from '@/utils/hooks/useMobileView';
import {
	Flex,
	Text,
	Container,
	Divider,
	Stack,
	Title,
	SegmentedControl,
	Skeleton,
	ModalRoot,
	ModalContent,
	ModalOverlay,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
	ModalBody,
} from '@mantine/core';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import { useState } from 'react';

import './styles.css';
import { RetailerNameContainer } from './retailerNameContainer';
import type { Retailer } from '@/utils/retailerConstants';
import { PriceGraph } from './priceGraph';

// TODO: improve this, currently if the result has gaps
// eg. the product was taken down, and then added back
// then there will be gaps in the graph
//
// this was going to originally be used to limit API response
// size, still probably will, but will fix later
const mapping: { [key: string]: number } = {
	'1 Year': 365,
	'1 Month': 30,
	'1 Week': 7,
};

export default function PriceHistory({
	isGraphOpen,
	closeGraph,
	crawlResult,
	retailer,
}: {
	isGraphOpen: boolean;
	closeGraph: () => void;
	crawlResult: CrawlResult;
	retailer: Retailer;
}) {
	const isMobile = useMobileView();

	const [timeRange, setTimeRange] = useState('1 Week');
	const historyRange = mapping[timeRange];

	const { data, isLoading } = useHistoryApi(crawlResult.id);

	return (
		<ModalRoot
			opened={isGraphOpen}
			onClose={closeGraph}
			centered
			size={isMobile ? '95%' : '70%'}
		>
			<ModalOverlay blur={3} />
			<ModalContent>
				<ModalHeader>
					<ModalTitle w="100%">
						<Stack gap="xs">
							<Flex>
								<Title order={2}>Price History</Title>
								<ModalCloseButton />
							</Flex>
							<Text>{crawlResult.name}</Text>
							<RetailerNameContainer retailer={retailer} />
						</Stack>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Skeleton visible={isLoading}>
						<PriceGraph
							graphData={data?.history || []}
							historyRange={historyRange}
						/>
						<SegmentedControl
							size="xs"
							fullWidth
							data={Object.keys(mapping)}
							value={timeRange}
							onChange={setTimeRange}
						/>
					</Skeleton>
					<Divider my="md" />
					<Flex direction={isMobile ? 'column' : 'row'} gap="md">
						<Container>
							<Skeleton visible={isLoading}>
								<Stack ta="center">
									<Flex>
										<Title order={4}>
											{'Lowest Price'}
										</Title>
										<IconCaretDown />
									</Flex>
									<Text>
										{'$' +
											centsToHumanString(
												data?.min_price.sale_price ||
													data?.min_price
														.regular_price ||
													0,
											)}
									</Text>
									<Text size="xs" c="dimmed">
										{convertTimestampToHumanReadable(
											data?.min_price.query_time || 0,
											{
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											},
										)}
									</Text>
								</Stack>
							</Skeleton>
						</Container>
						<Container>
							<Stack ta="center">
								<Title order={4}>{'Current Price'}</Title>
								<Text>
									{'$' +
										centsToHumanString(
											crawlResult.price.sale_price ||
												crawlResult.price.regular_price,
										)}
								</Text>
							</Stack>
						</Container>
						<Container>
							<Skeleton visible={isLoading}>
								<Stack ta="center">
									<Flex>
										<Title order={4}>
											{'Highest Price'}
										</Title>
										<IconCaretUp
											style={{ marginTop: '0.1rem' }}
										/>
									</Flex>
									<Text>
										{'$' +
											centsToHumanString(
												data?.max_price.sale_price ||
													data?.max_price
														.regular_price ||
													0,
											)}
									</Text>
									<Text size="xs" c="dimmed">
										{convertTimestampToHumanReadable(
											data?.max_price.query_time || 0,
											{
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											},
										)}
									</Text>
								</Stack>
							</Skeleton>
						</Container>
					</Flex>
				</ModalBody>
			</ModalContent>
		</ModalRoot>
	);
}

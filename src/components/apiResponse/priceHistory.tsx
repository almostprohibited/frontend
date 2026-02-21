import { useHistoryApi } from '@/utils/apiRequest';
import type { CrawlResult, HistoryPrice } from '@/utils/apiStructs';
import { centsToHumanString } from '@/utils/format';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { LineChart } from '@mantine/charts';
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

const LABEL_REGULAR = 'Regular Price';
const LABEL_SALE = 'Sale Price';

interface Data {
	readonly date: number;
	readonly [LABEL_REGULAR]: number | undefined;
	readonly [LABEL_SALE]: number | undefined;
}

function convertToDate(timestamp: number) {
	return new Date(timestamp * 1000);
}

function convertToHumanReadable(
	timestamp: number,
	options: Intl.DateTimeFormatOptions,
): string {
	return convertToDate(timestamp).toLocaleDateString('en-US', options);
}

function getReferenceLineProps(timestamp: number) {
	const dateObj = convertToDate(timestamp);

	if (dateObj.getDate() === 1) {
		return {
			x: timestamp,
			color: dateObj.getMonth() === 0 ? 'grey' : null,
			label:
				dateObj.getMonth() === 0
					? dateObj.getFullYear().toString()
					: convertToHumanReadable(timestamp, {
							month: 'short',
						}),
		};
	}

	return null;
}

function getRange(minPrice: number, maxPrice: number) {
	const deviation = maxPrice - minPrice;

	const min = Math.max(0, minPrice - deviation);
	const max = maxPrice + deviation;

	return [min, max];
}

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

	let graphData: Data[] = [];
	let graphXLabels: object[] = [];

	let previousHumanDate = null;

	if (data) {
		// I don't 100% trust my own API to give me sorted data
		data.history.sort(
			(a: HistoryPrice, b: HistoryPrice) => a.query_time - b.query_time,
		);

		for (const history of data.history) {
			if (previousHumanDate) {
				let index = 1;

				const emptyDatapoints: Data[] = [];

				while (true) {
					const currentEmpty = history.query_time - 86400 * index++;

					if (
						convertToHumanReadable(currentEmpty, {
							month: 'short',
							day: 'numeric',
						}) === previousHumanDate
					) {
						break;
					}

					emptyDatapoints.push({
						date: currentEmpty,
						[LABEL_REGULAR]: undefined,
						[LABEL_SALE]: undefined,
					});

					const referenceLineProps =
						getReferenceLineProps(currentEmpty);

					if (referenceLineProps) {
						graphXLabels.push(referenceLineProps);
					}
				}

				graphData = graphData.concat(emptyDatapoints.reverse());
			}

			const humanDate = convertToHumanReadable(history.query_time, {
				month: 'short',
				day: 'numeric',
			});
			previousHumanDate = humanDate;

			graphData.push({
				date: history.query_time,
				[LABEL_REGULAR]: history.regular_price,
				[LABEL_SALE]: history.sale_price,
			});

			const referenceLineProps = getReferenceLineProps(
				history.query_time,
			);

			if (referenceLineProps) {
				graphXLabels.push(referenceLineProps);
			}
		}

		const historySize = Object.values(graphData).length;
		const startIndex = Math.max(0, historySize - historyRange);
		const endIndex = historySize;

		graphData = graphData.slice(startIndex, endIndex);
	}

	let minPriceRelative = Math.min(
		...graphData
			.filter((data) => data[LABEL_REGULAR] !== undefined)
			.map((data) => data[LABEL_SALE] || data[LABEL_REGULAR]!),
	);

	const sortedMaxPrice = graphData
		.filter((data) => data[LABEL_REGULAR] !== undefined)
		.sort((a, b) => b[LABEL_REGULAR]! - a[LABEL_REGULAR]!);

	let maxPriceRelative =
		sortedMaxPrice.length > 0 ? sortedMaxPrice[0][LABEL_REGULAR]! : 0;

	const graphPadding = isMobile ? 10 : 30;

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
						<LineChart
							h={300}
							w="100%"
							data={graphData}
							xAxisProps={{
								padding: {
									left: graphPadding,
									right: graphPadding,
								},
								type: 'number',
								scale: 'time',
								domain: ['dataMin', 'dataMax'],
								tickFormatter: (value) =>
									convertToHumanReadable(value, {
										month: 'short',
										day: 'numeric',
									}),
							}}
							yAxisProps={{
								domain: getRange(
									minPriceRelative,
									maxPriceRelative,
								),
							}}
							tooltipProps={{
								labelFormatter: (value) =>
									convertToHumanReadable(value, {
										month: 'short',
										day: 'numeric',
									}),
							}}
							dataKey="date"
							curveType="linear"
							series={[
								{ name: LABEL_REGULAR, color: 'blue' },
								{ name: LABEL_SALE, color: 'teal' },
							]}
							withLegend
							connectNulls={false}
							tooltipAnimationDuration={200}
							withPointLabels={historyRange === 7}
							valueFormatter={(value) =>
								`$${centsToHumanString(value)}`
							}
							gridProps={{ yAxisId: 'left' }} // Missing y axis line fix: https://github.com/mantinedev/mantine/issues/8110#issuecomment-3140063560
							pr="1.2rem"
							mb="1rem"
							styles={{
								// https://github.com/recharts/recharts/issues/6064
								// Not sure why this is the case since tooltip is placed after
								// the legend in Mantine, but this fixes the indexing problem
								// ref: https://github.com/mantinedev/mantine/blob/e1239ef0c5dd920967814d85ffe0b8ba4488a269/packages/%40mantine/charts/src/LineChart/LineChart.tsx#L451
								tooltip: {
									zIndex: 1,
								},
							}}
							referenceLines={graphXLabels}
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
										{convertToHumanReadable(
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
										{convertToHumanReadable(
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

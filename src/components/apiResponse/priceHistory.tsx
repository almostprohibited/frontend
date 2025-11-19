import { useHistoryApi } from '@/utils/apiRequest';
import type { CrawlResult, HistoryPrice } from '@/utils/apiStructs';
import { centsToHumanString } from '@/utils/format';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { LineChart } from '@mantine/charts';
import {
	Modal,
	Flex,
	Text,
	Container,
	Divider,
	Stack,
	Title,
	SegmentedControl,
	Skeleton,
} from '@mantine/core';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import { useState } from 'react';

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

const DOMAIN_DEVIATION = 100;

const LABEL_REGULAR = 'Regular Price';
const LABEL_SALE = 'Sale Price';

function convertToHumanReadable(
	timestamp: number,
	options: Intl.DateTimeFormatOptions,
): string {
	return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
}

function getRange(minPrice: number, maxPrice: number) {
	const roundedMin = Number.parseInt(centsToHumanString(minPrice));
	const roundedMax = Number.parseInt(centsToHumanString(maxPrice));

	const min = Math.max(0, roundedMin - DOMAIN_DEVIATION);
	const max = min === 0 ? roundedMax * 2 : roundedMax + DOMAIN_DEVIATION;

	return [min, max];
}

export default function PriceHistory({
	isGraphOpen,
	closeGraph,
	crawlResult,
}: {
	isGraphOpen: boolean;
	closeGraph: () => void;
	crawlResult: CrawlResult;
}) {
	const isMobile = useMobileView();

	const [timeRange, setTimeRange] = useState('1 Week');
	const historyRange = mapping[timeRange];

	const { data, isLoading } = useHistoryApi(crawlResult.id);

	let graphData: object[] = [];

	let minPriceRelative = Number.MAX_SAFE_INTEGER;
	let maxPriceRelative = 0;

	let previousHumanDate = null;

	if (data) {
		// I don't 100% trust my own API to give me sorted data
		data.history.sort(
			(a: HistoryPrice, b: HistoryPrice) => a.query_time - b.query_time,
		);

		for (const history of data.history) {
			if (previousHumanDate) {
				let index = 1;

				const emptyDatapoints = [];

				while (true) {
					const currentEmpty = history.query_time - 86400 * index++;
					const localEmptyHumanDate = convertToHumanReadable(
						currentEmpty,
						{ month: 'short', day: 'numeric' },
					);

					if (localEmptyHumanDate === previousHumanDate) {
						break;
					}

					emptyDatapoints.push({
						date: localEmptyHumanDate,
						[LABEL_REGULAR]: null,
						[LABEL_SALE]: null,
					});
				}

				graphData = graphData.concat(emptyDatapoints.reverse());
			}

			const humanDate = convertToHumanReadable(history.query_time, {
				month: 'short',
				day: 'numeric',
			});
			previousHumanDate = humanDate;

			graphData.push({
				date: humanDate,
				[LABEL_REGULAR]: centsToHumanString(history.regular_price),
				[LABEL_SALE]: history.sale_price
					? centsToHumanString(history.sale_price)
					: null,
			});

			const localMinPrice = Math.min(
				history.regular_price,
				history.sale_price || history.regular_price,
			);
			const localMaxPrice = Math.max(
				history.regular_price,
				history.sale_price || history.regular_price,
			);

			if (localMinPrice < minPriceRelative) {
				minPriceRelative = localMinPrice;
			}

			if (localMaxPrice > maxPriceRelative) {
				maxPriceRelative = localMaxPrice;
			}
		}

		const historySize = Object.values(graphData).length;
		const startIndex = Math.max(0, historySize - historyRange);
		const endIndex = historySize;

		graphData = graphData.slice(startIndex, endIndex);
	}

	const graphPadding = isMobile ? 10 : 30;
	//https://github.com/recharts/recharts/issues/6064
	return (
		<Modal
			opened={isGraphOpen}
			onClose={closeGraph}
			title={`${crawlResult.name} - Pricing History`}
			centered
			size={isMobile ? '95%' : '70%'}
		>
			<Skeleton visible={isLoading}>
				<LineChart
					h={300}
					data={graphData}
					xAxisProps={{
						padding: { left: graphPadding, right: graphPadding },
					}}
					yAxisProps={{
						domain: getRange(minPriceRelative, maxPriceRelative),
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
					valueFormatter={(value) => `$${value}`}
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
								<Title order={4}>{'Lowest Price'}</Title>
								<IconCaretDown />
							</Flex>
							<Text>
								{'$' +
									centsToHumanString(
										data?.min_price.sale_price ||
											data?.min_price.regular_price ||
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
								<Title order={4}>{'Highest Price'}</Title>
								<IconCaretUp style={{ marginTop: '0.1rem' }} />
							</Flex>
							<Text>
								{'$' +
									centsToHumanString(
										data?.max_price.sale_price ||
											data?.max_price.regular_price ||
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
		</Modal>
	);
}

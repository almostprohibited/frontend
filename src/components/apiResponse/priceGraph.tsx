import type { HistoryPrice } from '@/utils/apiStructs';
import {
	centsToHumanString,
	convertTimestampToDate,
	convertTimestampToHumanReadable,
} from '@/utils/format';
import { LineChart, type ChartReferenceLineProps } from '@mantine/charts';
import { Box, Flex, ScrollArea } from '@mantine/core';
import { useEffect, useRef } from 'react';

function getRange(minPrice: number, maxPrice: number) {
	const deviation = maxPrice - minPrice;

	const min = Math.max(0, minPrice - deviation);
	const max = maxPrice + deviation;

	return [min, max];
}

const LABEL_REGULAR = 'Regular Price';
const LABEL_SALE = 'Sale Price';

const GRAPH_EDGE_PADDING = 30;

interface Data {
	readonly date: number;
	readonly [LABEL_REGULAR]: number | undefined;
	readonly [LABEL_SALE]: number | undefined;
}

function getReferenceLineProps(
	timestamp: number,
): ChartReferenceLineProps | undefined {
	const dateObj = convertTimestampToDate(timestamp);

	if (dateObj.getDate() === 1) {
		return {
			x: timestamp,
			color: dateObj.getMonth() === 0 ? 'grey' : undefined,
			label:
				dateObj.getMonth() === 0
					? dateObj.getFullYear().toString()
					: convertTimestampToHumanReadable(timestamp, {
							month: 'short',
							year: '2-digit',
						}),
		};
	}

	return undefined;
}

function parseHistory(graphData: Array<HistoryPrice>): Array<Data> {
	if (graphData.length === 0) {
		return [];
	}

	const sortedApiResponse = [...graphData].sort(
		(a: HistoryPrice, b: HistoryPrice) => a.query_time - b.query_time,
	);

	const timestampMappedResponse = new Map<number, Data>();

	sortedApiResponse.forEach((price) =>
		timestampMappedResponse.set(price.query_time, {
			date: price.query_time + 86400,
			[LABEL_REGULAR]: price.regular_price,
			[LABEL_SALE]: price.sale_price,
		}),
	);

	const currentDate = Date.now() / 1000 - 86400;

	let currentTimestamp = sortedApiResponse[0].query_time;

	while (currentTimestamp < currentDate) {
		currentTimestamp += 86400;

		if (timestampMappedResponse.get(currentTimestamp)) {
			continue;
		}

		timestampMappedResponse.set(currentTimestamp, {
			date: currentTimestamp,
			[LABEL_REGULAR]: undefined,
			[LABEL_SALE]: undefined,
		});
	}

	const returnResults = Array.from(timestampMappedResponse.values());

	return returnResults.sort((a: Data, b: Data) => a.date - b.date);
}

function getGraphBounds(displayPoints: Array<Data>) {
	const minPrice = Math.min(
		...displayPoints
			.filter((data) => data[LABEL_REGULAR] !== undefined)
			.map((data) => data[LABEL_SALE] || data[LABEL_REGULAR]!),
	);

	const sortedMaxPrice = displayPoints
		.filter((data) => data[LABEL_REGULAR] !== undefined)
		.sort((a, b) => b[LABEL_REGULAR]! - a[LABEL_REGULAR]!);

	const maxPrice =
		sortedMaxPrice.length > 0 ? sortedMaxPrice[0][LABEL_REGULAR]! : 0;

	return getRange(minPrice, maxPrice);
}

export function PriceGraph({
	graphData,
	historyRange,
}: {
	graphData: Array<HistoryPrice>;
	historyRange: number;
}) {
	const scrollViewport = useRef<HTMLDivElement>(null);

	const dataPoints = parseHistory(graphData);

	const historySize = dataPoints.length;
	const startIndex = Math.max(0, historySize - historyRange);

	const displayPoints = dataPoints.slice(startIndex, historySize);

	const monthReferenceLine: Array<ChartReferenceLineProps> = [];

	const graphBounds = getGraphBounds(displayPoints);

	for (const displayPoint of displayPoints) {
		const referenceLine = getReferenceLineProps(displayPoint.date);

		if (referenceLine) {
			monthReferenceLine.push(referenceLine);
		}
	}

	console.log(displayPoints);

	useEffect(() => {
		if (historyRange === 365) {
			setTimeout(() => {
				scrollViewport.current!.scrollTo({
					left: scrollViewport.current!.scrollWidth,
					behavior: 'smooth',
				});
			}, 750);
		}
	}, [historyRange]);

	return (
		<Flex direction="row" wrap="nowrap" pr="1.2rem" mb="1rem">
			<LineChart
				mt="2.75rem"
				h={256}
				w={66}
				data={displayPoints}
				yAxisProps={{ domain: graphBounds }}
				dataKey="date"
				series={[
					{
						name: LABEL_REGULAR,
						color: 'transparent',
					},
					{ name: LABEL_SALE, color: 'transparent' },
				]}
				valueFormatter={(value) => `$${centsToHumanString(value)}`}
			/>

			<ScrollArea
				w="100%"
				type={displayPoints.length > 30 ? 'always' : 'never'}
				offsetScrollbars
				scrollbars="x"
				viewportRef={scrollViewport}
			>
				<Box
					w={displayPoints.length > 30 ? '100rem' : '100%'}
					mb="1rem"
				>
					<LineChart
						h={300}
						data={displayPoints}
						xAxisProps={{
							padding: {
								left: GRAPH_EDGE_PADDING,
								right: GRAPH_EDGE_PADDING,
							},
							type: 'number',
							scale: 'time',
							domain: ['dataMin', 'dataMax'],
							tickFormatter: (value) =>
								convertTimestampToHumanReadable(value, {
									month: 'short',
									day: 'numeric',
								}),
						}}
						yAxisProps={{ domain: graphBounds }}
						withYAxis={false}
						tooltipProps={{
							labelFormatter: (value) =>
								convertTimestampToHumanReadable(value, {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								}),
						}}
						dataKey="date"
						curveType="linear"
						series={[
							{
								name: LABEL_REGULAR,
								color: 'blue',
							},
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
						styles={{
							// https://github.com/recharts/recharts/issues/6064
							// Not sure why this is the case since tooltip is placed after
							// the legend in Mantine, but this fixes the indexing problem
							// ref: https://github.com/mantinedev/mantine/blob/e1239ef0c5dd920967814d85ffe0b8ba4488a269/packages/%40mantine/charts/src/LineChart/LineChart.tsx#L451
							tooltip: {
								zIndex: 1,
							},
						}}
						referenceLines={monthReferenceLine}
					/>
				</Box>
			</ScrollArea>
		</Flex>
	);
}

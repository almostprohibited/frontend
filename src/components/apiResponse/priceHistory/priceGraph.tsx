import type { HistoryPrice } from '@/utils/apiStructs';
import {
	centsToHumanString,
	convertTimestampToDate,
	convertTimestampToHumanReadable,
} from '@/utils/format';
import { LineChart, type ChartReferenceLineProps } from '@mantine/charts';
import { Box, Flex, ScrollArea, SegmentedControl } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from './tooltip';

function getRange(minPrice: number, maxPrice: number) {
	const deviation = maxPrice - minPrice;

	const min = Math.max(0, minPrice - deviation);
	const max = maxPrice + deviation;

	return [min, max];
}

const segmentControlValues: Record<
	string,
	{ count: number; shouldDisable: (count: number) => boolean }
> = {
	'1 Year': {
		count: 365,
		shouldDisable: (count: number) => count <= 30,
	},
	'1 Month': {
		count: 30,
		shouldDisable: (count: number) => count <= 7,
	},
	'1 Week': {
		count: 7,
		shouldDisable: (_: number) => false,
	},
};

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
							year: 'numeric',
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
		timestampMappedResponse.set(price.query_time + 86400, {
			date: price.query_time + 86400,
			[LABEL_REGULAR]: price.regular_price,
			[LABEL_SALE]: price.sale_price,
		}),
	);

	const currentDate = new Date();
	currentDate.setUTCHours(0, 0, 0, 0);

	const normalizedTimestamp = currentDate.getTime() / 1000 - 86400;

	let currentTimestamp = sortedApiResponse[0].query_time;

	while (currentTimestamp <= normalizedTimestamp) {
		currentTimestamp += 86400;

		if (timestampMappedResponse.get(currentTimestamp) !== undefined) {
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

// reference for scrolling linechart
// https://github.com/recharts/recharts/issues/1364#issuecomment-2608588147
export function PriceGraph({ graphData }: { graphData: Array<HistoryPrice> }) {
	const scrollViewport = useRef<HTMLDivElement>(null);
	const mousePosition = useRef({ x: 0, y: 0 });

	const [timeRange, setTimeRange] = useState('1 Week');
	const historyRange = segmentControlValues[timeRange];

	const dataPoints = parseHistory(graphData);

	const historySize = dataPoints.length;
	const startIndex = Math.max(0, historySize - historyRange.count);

	let stopFiltering = false;

	// I hope that Array.filter filters in order
	// get rid of the leading "undefined" points
	const displayPoints = dataPoints
		.slice(startIndex, historySize)
		.filter((point) => {
			if (stopFiltering) {
				return true;
			}

			const shouldInclude = point[LABEL_REGULAR] !== undefined;
			stopFiltering = shouldInclude;

			return shouldInclude;
		});

	const monthReferenceLine: Array<ChartReferenceLineProps> = [];

	const graphBounds = getGraphBounds(displayPoints);

	for (const displayPoint of displayPoints) {
		const referenceLine = getReferenceLineProps(displayPoint.date);

		if (referenceLine) {
			monthReferenceLine.push(referenceLine);
		}
	}

	useEffect(() => {
		if (historyRange.count === 365) {
			setTimeout(() => {
				scrollViewport.current!.scrollTo({
					left: scrollViewport.current!.scrollWidth,
					behavior: 'smooth',
				});
			}, 750);
		}
	}, [historyRange]);

	return (
		<Flex w="100%" direction="column" gap="md">
			<Flex
				direction="row"
				wrap="nowrap"
				pr="1.2rem"
				onMouseMove={(e) => {
					mousePosition.current = { x: e.clientX, y: e.clientY };
				}}
			>
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
						w={
							displayPoints.length > 30
								? `${0.3 * displayPoints.length}rem`
								: '100%'
						}
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
								content: ({ label, payload }) => (
									<Tooltip
										// @ts-ignore TS2322 label is already being checked
										timestamp={
											Number.isInteger(label) ? label : 0
										}
										payload={payload}
										mousePosition={mousePosition}
									/>
								),
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
							withPointLabels={historyRange.count === 7}
							valueFormatter={(value) =>
								`$${centsToHumanString(value)}`
							}
							gridProps={{ yAxisId: 'left' }} // Missing y axis line fix: https://github.com/mantinedev/mantine/issues/8110#issuecomment-3140063560
							referenceLines={monthReferenceLine}
						/>
					</Box>
				</ScrollArea>
			</Flex>

			<SegmentedControl
				size="xs"
				fullWidth
				data={Object.entries(segmentControlValues).flatMap(
					([label, data]) => ({
						value: label,
						label,
						disabled: data.shouldDisable(dataPoints.length),
					}),
				)}
				value={timeRange}
				onChange={setTimeRange}
			/>
		</Flex>
	);
}

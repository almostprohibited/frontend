"use client";

import { useHistoryApi } from "@/utils/apiRequest";
import { CrawlResult, HistoryPrice } from "@/utils/apiStructs";
import { centsToHumanString } from "@/utils/format";
import { useMobileView } from "@/utils/hooks/useMobileView";
import { LineChart } from "@mantine/charts";
import { Modal, Flex, Text, Container, Divider, Stack, Title, SegmentedControl, Skeleton } from "@mantine/core";
import { IconCaretDown, IconCaretUp } from "@tabler/icons-react";
import { useState } from "react";

// TODO: improve this, currently if the result has gaps
// eg. the product was taken down, and then added back
// then there will be gaps in the graph
//
// this was going to originally be used to limit API response
// size, still probably will, but will fix later
const mapping: {[key: string]: number} = {
	"1 Week": 7,
	"1 Month": 30,
	"1 Year": 365,
}

const DOMAIN_DEVIATION = 100;

function convertToHumanReadable(timestamp: number, options: Intl.DateTimeFormatOptions): string {
	return new Date(timestamp * 1000).toLocaleDateString("en-US", options);
}

function getRange(minPrice: number, maxPrice: number) {
	return [
		Math.max(0, Number.parseInt(centsToHumanString(minPrice)) - DOMAIN_DEVIATION),
		Number.parseInt(centsToHumanString(maxPrice)) + DOMAIN_DEVIATION
	];
}

export default function PriceHistory({
	isGraphOpen,
	closeGraph,
	crawlResult
}: {
	isGraphOpen: boolean,
	closeGraph: () => void,
	crawlResult: CrawlResult
}) {
	const isMobile = useMobileView();
	
	const [timeRange, setTimeRange] = useState("1 Week")
	const historyRange = mapping[timeRange];
	
	const params = new URLSearchParams();
	params.append("id", crawlResult.id);

	const {data, isLoading} = useHistoryApi(params);

	const graphData = [];
	let minPriceRelative: HistoryPrice = {normalized_timestamp: 0, price: Number.MAX_SAFE_INTEGER};
	let maxPriceRelative: HistoryPrice = {normalized_timestamp: 0, price: 0};

	if (data) {
		data.history.sort((a, b) => a.normalized_timestamp - b.normalized_timestamp);

		const historySize = data.history.length;
		const startIndex = Math.max(0, historySize - historyRange);
		const endIndex = historySize;

		for (const history of data.history.slice(startIndex, endIndex)) {
			graphData.push({
				date: convertToHumanReadable(history.normalized_timestamp, {month: "short", day: "numeric"}),
				price: centsToHumanString(history.price),
			});

			if (history.price < minPriceRelative.price) {
				minPriceRelative = history;
			}

			if (history.price > maxPriceRelative.price) {
				maxPriceRelative = history;
			}
		}
	}
	
	const graphPadding = isMobile ? 10 : 30;

	return (
		<Modal
			opened={isGraphOpen}
			onClose={closeGraph}
			title="Pricing History"
			centered
			size={isMobile ? "95%" : "70%"}
		>
			<Skeleton visible={isLoading}>
				<LineChart
					h={300}
					data={graphData}
					xAxisProps={{padding: {left: graphPadding, right: graphPadding}}}
					yAxisProps={{domain: getRange(minPriceRelative.price, maxPriceRelative.price)}}
					dataKey="date"
					curveType="linear"
					series={[{name: "price"}]}
					connectNulls={false}
					tooltipAnimationDuration={200}
					withPointLabels={historyRange === 7}
					gridProps={{yAxisId: "left"}} // Missing y axis line fix: https://github.com/mantinedev/mantine/issues/8110#issuecomment-3140063560
					pr="2rem"
					mt="1rem"
					mb="1.5rem"
				/>
				<SegmentedControl
					size="xs"
					fullWidth
					data={["1 Year", "1 Month", "1 Week"]}
					value={timeRange}
					onChange={setTimeRange}
				/>
			</Skeleton>
			<Divider my="md" />
			<Flex
				direction={isMobile ? "column" : "row"}
				gap="md"
			>
				<Container>
					<Skeleton visible={isLoading}>
						<Stack ta="center">
							<Flex>
								<Title order={4}>{"Lowest Price"}</Title>
								<IconCaretDown />
							</Flex>
							<Text>{"$" + centsToHumanString(data?.lowest_price.price || 0)}</Text>
							<Text size="xs" c="dimmed">{convertToHumanReadable(data?.lowest_price.normalized_timestamp || 0, {month: "short", day: "numeric", year: "numeric"})}</Text>
						</Stack>
					</Skeleton>
				</Container>
				<Container>
					<Stack ta="center">
						<Title order={4}>{"Current Price"}</Title>
						<Text>{"$" + centsToHumanString(crawlResult.price.regular_price)}</Text>
					</Stack>
				</Container>
				<Container>
					<Skeleton visible={isLoading}>
						<Stack ta="center">
							<Flex>
								<Title order={4}>{"Highest Price"}</Title>
								<IconCaretUp style={{marginTop: "0.1rem"}} />
							</Flex>
							<Text>{"$" + centsToHumanString(data?.highest_price.price || 0)}</Text>
							<Text size="xs" c="dimmed">{convertToHumanReadable(data?.highest_price.normalized_timestamp || 0, {month: "short", day: "numeric", year: "numeric"})}</Text>
						</Stack>
					</Skeleton>
				</Container>
			</Flex>
		</Modal>
	)
}
import { LineChart } from "@mantine/charts";
import { Modal, Button, Flex, Text, Container, Divider, Stack, Title, SegmentedControl } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretDown, IconCaretUp, IconChartHistogram } from "@tabler/icons-react";
import { useState } from "react";

export default function PriceHistory({
	bgColour,
	iconColour,
}: {
	bgColour: string,
	iconColour: string,
}) {
	const [isGraphOpen, {open: openGraph, close: closeGraph}] = useDisclosure(false);
	const [timeRange, setTimeRange] = useState("1 Week")

	return (
		<>
			<Modal
				opened={isGraphOpen}
				onClose={closeGraph}
				title="Pricing History"
				centered
				size="70%"
			>
				<LineChart
					h={300}
					data={[{date: "Aug 21", price: 1000}, {date: "Aug 22", price: 1100}, {date: "Aug 23", price: 1100}, {date: "Aug 24", price: 1100}, {date: "Aug 25", price: 1100}]}
					xAxisProps={{padding: {left: 30, right: 30}}}
					yAxisProps={{domain: [900, 1200]}}
					dataKey="date"
					curveType="linear"
					series={[{name: "price"}]}
					connectNulls={false}
					tooltipAnimationDuration={200}
					withPointLabels
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
				<Divider my="md" />
				<Flex>
					<Container>
						<Stack ta="center">
							<Flex>
								<Title order={4}>{"Lowest Price"}</Title>
								<IconCaretDown />
							</Flex>
							<Text>{"$123"}</Text>
							<Text size="xs" c="dimmed">{"August 40th 2025"}</Text>
						</Stack>
					</Container>
					<Container>
						<Stack ta="center">
							<Title order={4}>{"Current Price"}</Title>
							<Text>{"$123"}</Text>
						</Stack>
					</Container>
					<Container>
						<Stack ta="center">
							<Flex>
								<Title order={4}>{"Highest Price"}</Title>
								<IconCaretUp style={{marginTop: "0.1rem"}} />
							</Flex>
							<Text>{"$123"}</Text>
							<Text size="xs" c="dimmed">{"August 40th 2025"}</Text>
						</Stack>
					</Container>
				</Flex>
			</Modal>
			<Button fullWidth color={bgColour} radius="xs" onClick={openGraph}>
				<IconChartHistogram color={iconColour} />
			</Button>
		</>
	)
}
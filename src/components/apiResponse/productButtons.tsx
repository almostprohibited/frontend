"use client";

import "./styles.css";

import { Button, ButtonGroup, useMantineTheme } from "@mantine/core";
import { IconAlertTriangle, IconChartHistogram } from "@tabler/icons-react";
import PriceHistory from "./priceHistory";
import { CrawlResult } from "@/utils/apiStructs";
import { useDisclosure } from "@mantine/hooks";
import { useIsBeta } from "@/utils/hooks/useIsBeta";

export default function ProductButtons({
	crawlResult,
}: {
	crawlResult: CrawlResult,
}) {
	const [isGraphOpen, {open: openGraph, close: closeGraph}] = useDisclosure(false);
	
	const theme = useMantineTheme();

	const isBeta = useIsBeta();

	const bgColour = theme.colors.dark[7];
	const iconColour = theme.colors.gray[5];

	return (
		<>
			{
				isGraphOpen ? 
					<PriceHistory isGraphOpen={isGraphOpen} closeGraph={closeGraph} crawlResult={crawlResult} /> : 
					<></>
			}
			<ButtonGroup>
				<Button fullWidth color={bgColour} radius="xs" onClick={openGraph}>
					<IconChartHistogram color={iconColour} />
				</Button>
				{
					isBeta ?
					<Button fullWidth color={bgColour} radius="xs">
						<IconAlertTriangle color={iconColour} />
					</Button> :
					<></>
				}
			</ButtonGroup>
		</>
	);
}

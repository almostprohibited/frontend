import { Button, ButtonGroup, useMantineTheme } from '@mantine/core';
import { IconAlertTriangle, IconChartHistogram } from '@tabler/icons-react';
import type { CrawlResult } from '@/utils/apiStructs';
import { useDisclosure } from '@mantine/hooks';
import { useIsBeta } from '@/utils/hooks/useIsBeta';
import { Retailer, RetailerEnum } from '@/utils/retailerConstants';
import PriceHistory from './priceHistory/component';

export default function ProductButtons({
	crawlResult,
}: {
	crawlResult: CrawlResult;
}) {
	const [isGraphOpen, { open: openGraph, close: closeGraph }] =
		useDisclosure(false);

	// @ts-expect-error: enum is of type object, required to ignore to get working
	const retailer: Retailer = RetailerEnum[crawlResult.retailer];

	const theme = useMantineTheme();

	const isBeta = useIsBeta();

	const bgColour = theme.colors.dark[7];
	const iconColour = theme.colors.gray[5];

	return (
		<>
			{isGraphOpen ? (
				<PriceHistory
					isGraphOpen={isGraphOpen}
					closeGraph={closeGraph}
					crawlResult={crawlResult}
					retailer={retailer}
				/>
			) : (
				<></>
			)}
			<ButtonGroup>
				<Button
					fullWidth
					color={bgColour}
					radius="xs"
					onClick={openGraph}
				>
					<IconChartHistogram color={iconColour} />
				</Button>
				{isBeta ? (
					<Button fullWidth color={bgColour} radius="xs">
						<IconAlertTriangle color={iconColour} />
					</Button>
				) : (
					<></>
				)}
			</ButtonGroup>
		</>
	);
}

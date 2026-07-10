import type { HistoryPrice, Price } from '@/utils/apiStructs';
import {
	centsToHumanString,
	convertTimestampToHumanReadable,
} from '@/utils/format';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { Container, Flex, Stack, Text, Title } from '@mantine/core';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';

export function HistoricalPrices({
	minPrice,
	maxPrice,
	currentPrice,
}: {
	minPrice: HistoryPrice | undefined;
	maxPrice: HistoryPrice | undefined;
	currentPrice: Price;
}) {
	const isMobile = useMobileView();

	return (
		<Flex direction={isMobile ? 'column' : 'row'} gap="md">
			<Container>
				<Stack ta="center">
					<Flex>
						<Title order={4}>{'Lowest Price'}</Title>
						<IconCaretDown />
					</Flex>
					<Text>
						{'$' +
							centsToHumanString(
								minPrice?.sale_price ||
									minPrice?.regular_price ||
									0,
							)}
					</Text>
					<Text size="xs" c="dimmed">
						{convertTimestampToHumanReadable(
							minPrice?.query_time || 0,
							{
								month: 'short',
								day: 'numeric',
								year: 'numeric',
							},
						)}
					</Text>
				</Stack>
			</Container>
			<Container>
				<Stack ta="center">
					<Title order={4}>{'Current Price'}</Title>
					<Text>
						{'$' +
							centsToHumanString(
								currentPrice.sale_price ||
									currentPrice.regular_price,
							)}
					</Text>
				</Stack>
			</Container>
			<Container>
				<Stack ta="center">
					<Flex>
						<Title order={4}>{'Highest Price'}</Title>
						<IconCaretUp style={{ marginTop: '0.1rem' }} />
					</Flex>
					<Text>
						{'$' +
							centsToHumanString(
								maxPrice?.sale_price ||
									maxPrice?.regular_price ||
									0,
							)}
					</Text>
					<Text size="xs" c="dimmed">
						{convertTimestampToHumanReadable(
							maxPrice?.query_time || 0,
							{
								month: 'short',
								day: 'numeric',
								year: 'numeric',
							},
						)}
					</Text>
				</Stack>
			</Container>
		</Flex>
	);
}

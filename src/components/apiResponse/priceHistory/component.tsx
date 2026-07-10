import { useHistoryApi } from '@/utils/apiRequest';
import type { CrawlResult } from '@/utils/apiStructs';
import { useMobileView } from '@/utils/hooks/useMobileView';
import {
	Flex,
	Text,
	Divider,
	Stack,
	Title,
	Skeleton,
	ModalRoot,
	ModalContent,
	ModalOverlay,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
	ModalBody,
} from '@mantine/core';

import './styles.css';
import { RetailerNameContainer } from '../retailerNameContainer';
import type { Retailer } from '@/utils/retailerConstants';
import { PriceGraph } from './priceGraph';
import { HistoricalPrices } from './historicalPrices';

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
						<PriceGraph graphData={data?.history || []} />
					</Skeleton>
					<Divider my="md" />
					<Skeleton visible={isLoading}>
						<HistoricalPrices
							currentPrice={crawlResult.price}
							minPrice={data?.min_price}
							maxPrice={data?.max_price}
						/>
					</Skeleton>
				</ModalBody>
			</ModalContent>
		</ModalRoot>
	);
}

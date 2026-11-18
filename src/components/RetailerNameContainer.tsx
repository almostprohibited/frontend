import { useMobileView } from '@/utils/hooks/useMobileView';
import type { Retailer } from '@/utils/retailerConstants';
import { Flex, Text } from '@mantine/core';

export function RetailerNameContainer({ retailer }: { retailer: Retailer }) {
	const isMobile = useMobileView();

	return (
		<Flex
			bg={retailer.colourHex}
			pt="0.5rem"
			pb="0.5rem"
			direction="row"
			fw="bold"
			justify="center"
			w="initial"
		>
			<Text
				size={isMobile ? 'sm' : 'xs'}
				c={retailer.textColourHex ? retailer.textColourHex : 'gray'}
				ta="center"
				fw="bold"
			>
				{retailer.name}
			</Text>
		</Flex>
	);
}

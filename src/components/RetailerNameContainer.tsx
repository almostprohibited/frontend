import { useMobileView } from '@/utils/hooks/useMobileView';
import type { Retailer } from '@/utils/retailerConstants';
import { Flex, Text, type TextProps } from '@mantine/core';

export function RetailerNameContainer({
	retailer,
	textSize,
}: {
	retailer: Retailer;
	textSize?: TextProps['size'];
}) {
	const isMobile = useMobileView();

	const size = textSize ?? (isMobile ? 'sm' : 'xs');

	return (
		<Flex
			bg={retailer.colourHex}
			p="0.5rem"
			justify="center"
			align="center"
			h="100%"
		>
			<Text
				size={size}
				c={retailer.textColourHex ? retailer.textColourHex : 'gray'}
				ta="center"
				fw="bold"
			>
				{retailer.name}
			</Text>
		</Flex>
	);
}

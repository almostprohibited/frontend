"use client";

import { CrawlResult } from "@/utils/apiStructs";
import { centsToHumanString } from "@/utils/format";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconSwitchHorizontal } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

function finalStringFormatter(price: string, isPricePerRoundView: boolean): string {
	let finalText = "$" + price;

	if (isPricePerRoundView) {
		finalText += " / round";
	}

	return finalText;
}

export default function PriceCard({
	crawlData,
	viewProductPrice,
	setViewProductPrice
}: {
	crawlData: CrawlResult,
	viewProductPrice: boolean,
	setViewProductPrice: Dispatch<SetStateAction<boolean>>
}) {
	const isAmmoProduct = (crawlData.metadata && "Ammunition" in crawlData.metadata) || false;
	const displayAmmoPricing = isAmmoProduct && !viewProductPrice;

	let regularPriceString = crawlData.price.regular_price;
	let salePriceString = crawlData.price.sale_price;

	let roundCount: number | undefined = undefined;
	
	if (displayAmmoPricing) {
		// @ts-expect-error: TODO: fix this issue where the metadata object is not typed
		roundCount = crawlData.metadata["Ammunition"]["round_count"];
	}
	
	if (roundCount) {
		regularPriceString = regularPriceString / roundCount;

		if (salePriceString) {
			salePriceString = salePriceString / roundCount;
		}
	}
	
	const regularPrice = centsToHumanString(regularPriceString);

	let priceBadgeChildren;

	if (salePriceString) {
		const salePrice = centsToHumanString(salePriceString);

		const regularPriceElement = <Text key={regularPrice + "regular"} inherit td="line-through" c="dimmed">{regularPrice}</Text>
		const salePriceElement = <Text key={salePrice + "sale"} c="green" inherit>{finalStringFormatter(salePrice, displayAmmoPricing)}</Text>;

		priceBadgeChildren = [salePriceElement];

		if (!displayAmmoPricing) {
			priceBadgeChildren.push(regularPriceElement);
		}
	} else {
		priceBadgeChildren = [<Text key={regularPrice + "regular"} inherit>{finalStringFormatter(regularPrice, displayAmmoPricing)}</Text>];
	}

	let priceToggle = <></>;

	if (isAmmoProduct) {
		priceToggle = (
			<ActionIcon
				variant="transparent"
				size="sm"
				color={viewProductPrice ? "blue" : "grey"}
				onClick={(e) => {setViewProductPrice(!viewProductPrice); e.preventDefault()}}
				pos="absolute"
				right="0.5rem"
			>
				<IconSwitchHorizontal />
			</ActionIcon>
		);
	}

	return (
		<Flex pt="0.5rem" pb="0.5rem" direction="row" fw="bold" justify="center" gap="sm">
			{...priceBadgeChildren}
			{priceToggle}
		</Flex>
	);
}

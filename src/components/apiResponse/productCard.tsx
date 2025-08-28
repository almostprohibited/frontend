"use client";

import { Card, Text, Image, CardSection, Skeleton, Anchor, Group, TooltipFloating, Flex, Box, ActionIcon } from "@mantine/core";
import { Category, CrawlResult, Retailer, RetailerEnum } from "../../utils/apiStructs";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useMobileView } from "@/utils/hooks/useMobileView";
import { IconBoom, IconBox, IconClockCheck, IconClockQuestion, IconLayersIntersect, IconSwitchHorizontal } from "@tabler/icons-react";
import { useIsBeta } from "@/utils/hooks/useIsBeta";

function centsToHumanString(price: number): string {
	const dollars = Math.floor(price / 100);
	const cents = String(price % 100).padEnd(2, "0");

	return `${dollars}.${cents}`;
}

function finalStringFormatter(price: string, isPricePerRoundView: boolean): string {
	let finalText = "$" + price;

	if (isPricePerRoundView) {
		finalText += " / round";
	}

	return finalText;
}

function PriceCard({
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
		regularPriceString = Math.round(regularPriceString / roundCount);

		if (salePriceString) {
			salePriceString = Math.round(salePriceString / roundCount);
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

export default function ProductCard({
	crawlData,
	viewProductPrice,
	setViewProductPrice
}: {
	crawlData: CrawlResult,
	viewProductPrice: boolean,
	setViewProductPrice: Dispatch<SetStateAction<boolean>>
}) {
	const isMobile = useMobileView();
	const isBeta = useIsBeta();

	const [imageLoaded, setImageLoaded] = useState(false);

	// @ts-expect-error: enum is of type object, required to ignore to get working
	const retailer: Retailer = RetailerEnum[crawlData.retailer];

	const currentUnixSecs = new Date().getTime() / 1000;
	const timeDiffSecs = currentUnixSecs - crawlData.query_time;
	const timeDiffHours = timeDiffSecs / 60 / 60;

	const isItemStale = timeDiffHours >= 24;

	const clockIcon = isItemStale ? <IconClockQuestion /> : <IconClockCheck />;

	let itemIcon: ReactNode = <></>;
	const itemSize = "5rem";

	if (isBeta) {
		const mappings: {
			[key in Category]: ReactNode
		} = {
			[Category.Firearm]: <IconBoom size={itemSize} />,
			[Category.Ammunition]: <IconBox size={itemSize} />,
			[Category.Other]: <IconLayersIntersect size={itemSize} />,
		}

		itemIcon = mappings[crawlData.category];
	}

	return (
		<Anchor
			key={crawlData.name + crawlData.query_time.toString()}
			href={crawlData.url}
			target="_blank"
			underline="never"
			c="initial"
		>
			<Card radius="lg" withBorder={true} h="25rem" shadow="sm" bg="#2e2e2e">
				<CardSection>
					<Skeleton h="10rem" visible={!imageLoaded}>
						<Image alt="" h="10rem" src={crawlData.image_url} onLoad={() => setImageLoaded(true)} />
					</Skeleton>
				</CardSection>
				<CardSection mb="1rem">
					<PriceCard crawlData={crawlData} viewProductPrice={viewProductPrice} setViewProductPrice={setViewProductPrice} />
					<Flex bg={retailer.colourHex} pt="0.5rem" pb="0.5rem" direction="row" fw="bold" justify="center">
						<Text
							size={isMobile ? "sm" : "xs"}
							c={retailer.textColourHex ? retailer.textColourHex : "gray"}
							ta="center"
							fw="bold"
						>
							{retailer.name}
						</Text>
					</Flex>
				</CardSection>
				<Flex
					direction="column"
					h="100%"
					style={{zIndex: 1}}
				>
					<Box flex={1}>
						<TooltipFloating
							label={crawlData.name}
							color="black"
							multiline
							w="15rem"
							disabled={isMobile}
						>
							<Text size="sm" lineClamp={4}>{crawlData.name}</Text>
						</TooltipFloating>
					</Box>
					<Box>
						<TooltipFloating
							label="It's been 24 hours since we've seen this item, it may be out of stock!"
							color="black"
							multiline
							w="15rem"
							disabled={isMobile || !isItemStale}
						>
							<Group gap="xs" c={isItemStale ? "#c77700ff" : "grey"}>
								{clockIcon}
								<Text size="sm">{timeDiffHours.toFixed(2)} hours ago</Text>
							</Group>
						</TooltipFloating>
					</Box>
				</Flex>
				<Box pos="absolute" right={0} bottom={0} c="#363636">
					{itemIcon}
				</Box>
			</Card>
		</Anchor>
	);
}
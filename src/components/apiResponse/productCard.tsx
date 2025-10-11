"use client";

import { Card, Text, Image, CardSection, Skeleton, Group, TooltipFloating, Flex, Box } from "@mantine/core";
import { Category, CrawlResult } from "../../utils/apiStructs";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useMobileView } from "@/utils/hooks/useMobileView";
import { IconBoom, IconBox, IconClockCheck, IconClockQuestion, IconLayersIntersect } from "@tabler/icons-react";
import { useIsBeta } from "@/utils/hooks/useIsBeta";
import ProductButtons from "./productButtons";
import PriceCard from "./priceCard";
import { Retailer, RetailerEnum } from "@/utils/retailerConstants";

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

	const linkProperties = {
		href: crawlData.url,
		target: "_blank",
	}

	return (
		<Card
			key={crawlData.id}
			radius="lg"
			withBorder={true}
			h={"27rem"}
			shadow="sm"
			bg="#2e2e2e"
		>
			<CardSection component="a" {...linkProperties}>
				<Skeleton h="10rem" visible={!imageLoaded}>
					<Image alt="" h="10rem" src={crawlData.image_url} onLoad={() => setImageLoaded(true)} />
				</Skeleton>
			</CardSection>
			<CardSection pb="1rem" component="a" {...linkProperties}>
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
			<Flex direction="column" h="100%" component="a" {...linkProperties}>
				<Box flex={1} style={{ zIndex: 1 }}>
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
				<Box style={{ zIndex: 1 }}>
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
				<Box pos="absolute" right={0} bottom="2rem" c="#333333">
					{itemIcon}
				</Box>
			</Flex>
			<CardSection mt="1rem">
				<ProductButtons crawlResult={crawlData} />
			</CardSection>
		</Card>
	);
}

import { Card, Text, Image, CardSection, Skeleton, Anchor, Group, TooltipFloating, Flex, Box } from "@mantine/core";
import { CrawlResult, Retailer, RetailerEnum } from "../../../utils/apiStructs";
import { useState } from "react";
import { useMobileView } from "@/utils/hooks/useMobileView";
import { IconClockCheck, IconClockQuestion } from "@tabler/icons-react";

function centsToHumanString(price: number): string {
	const dollars = Math.floor(price / 100);
	const cents = String(price % 100).padEnd(2, "0");

	return `${dollars}.${cents}`;
}

export default function ProductCard({crawlData}: {crawlData: CrawlResult}) {
	const isMobile = useMobileView();

	const [imageLoaded, setImageLoaded] = useState(false);

	const regularPrice = centsToHumanString(crawlData.price.regular_price);

	let priceBadgeChildren;

	if (crawlData.price.sale_price) {
		const salePrice = centsToHumanString(crawlData.price.sale_price);

		const regularPriceElement = <Text key={regularPrice} inherit td="line-through" c="dimmed">{regularPrice}</Text>
		const salePriceElement = <Text key={salePrice} c="green" inherit>{"$ " + salePrice}</Text>;

		priceBadgeChildren = [salePriceElement, regularPriceElement];
	} else {
		priceBadgeChildren = [<Text key={regularPrice} inherit>{"$ " + regularPrice}</Text>];
	}

	// @ts-expect-error: enum is of type object, required to ignore to get working
	const retailer: Retailer = RetailerEnum[crawlData.retailer];

	const currentUnixSecs = new Date().getTime() / 1000;
	const timeDiffSecs = currentUnixSecs - crawlData.query_time;
	const timeDiffHours = timeDiffSecs / 60 / 60;

	const isItemStale = timeDiffHours >= 24;

	const clockIcon = isItemStale ? <IconClockQuestion /> : <IconClockCheck />;

	return (
		<Anchor
			key={crawlData.name + crawlData.query_time.toString()}
			href={crawlData.url}
			target="_blank"
			underline="never"
			c="initial"
		>
			<Card radius="lg" withBorder={true} h="25rem" shadow="sm">
				<CardSection>
					<Skeleton h="10rem" visible={!imageLoaded}>
						<Image alt="" h="10rem" src={crawlData.image_url} onLoad={() => setImageLoaded(true)} />
					</Skeleton>
				</CardSection>
				<CardSection mb="1rem">
					<Flex pt="0.5rem" pb="0.5rem" direction="row" fw="bold" justify="center" gap="sm">
						{...priceBadgeChildren}
					</Flex>
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
							label="Its 24 hours since we've seen this item, it may be out of stock!"
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
			</Card>
		</Anchor>
	);
}
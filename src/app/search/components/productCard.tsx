import { Card, Text, Image, CardSection, Badge, Stack, Skeleton, Anchor, Group, TooltipFloating, Flex, Box } from "@mantine/core";
import { CrawlResult, Retailer, RetailerEnum } from "../../../utils/apiStructs";
import { useState } from "react";

function centsToHumanString(price: number): string {
	const dollars = Math.floor(price / 100);
	const cents = String(price % 100).padEnd(2, "0");

	return `$ ${dollars}.${cents}`;
}

export default function ProductCard({crawlData}: {crawlData: CrawlResult}) {
	const [imageLoaded, setImageLoaded] = useState(false);

	const regularPrice = centsToHumanString(crawlData.price.regular_price);

	let priceBadgeChildren;

	if (crawlData.price.sale_price) {
		const salePrice = centsToHumanString(crawlData.price.sale_price);

		const regularPriceElement = <Text key={regularPrice} inherit td="line-through" c="dimmed">{regularPrice}</Text>
		const salePriceElement = <Text key={salePrice} inherit>{salePrice}</Text>;

		priceBadgeChildren = [salePriceElement, regularPriceElement];
	} else {
		priceBadgeChildren = [<Text key={regularPrice} inherit>{regularPrice}</Text>];
	}

	// @ts-expect-error: enum is of type object, required to ignore to get working
	const retailer: Retailer = RetailerEnum[crawlData.retailer];

	const currentUnixSecs = new Date().getTime() / 1000;
	const timeDiffSecs = currentUnixSecs - crawlData.query_time;
	const timeDiffHours = (timeDiffSecs / 60 / 60).toFixed(2);

	return (
		<Anchor
			key={crawlData.name + crawlData.query_time.toString()}
			href={crawlData.url}
			target="_blank"
			underline="never"
			c="initial"
		>
			<Card radius="lg" withBorder={true} h="25rem" shadow="sm">
				<CardSection mb="1rem">
					<Skeleton h="10rem" visible={!imageLoaded}>
						<Image alt="" h="10rem" src={crawlData.image_url} onLoad={() => setImageLoaded(true)} />
					</Skeleton>
				</CardSection>
				<Flex
					direction="column"
					h="100%"
				>
					<Stack mb="1rem" gap="xs">
						<Badge variant="outline" size="lg" color="gray"><Group gap="0.5rem">{...priceBadgeChildren}</Group></Badge>
						<Badge variant="outline" size="md" bg={retailer.colourHex} color="gray">{retailer.name}</Badge>
					</Stack>
					<Box flex={1}>
						<TooltipFloating
							label={crawlData.name}
							color="black"
							multiline
							w="15rem"
						>
							<Text size="sm" lineClamp={4}>{crawlData.name}</Text>
						</TooltipFloating>
					</Box>
					<Box>
						<Text size="sm" c="grey">{timeDiffHours} hours ago</Text>
					</Box>
				</Flex>
			</Card>
		</Anchor>
	);
}
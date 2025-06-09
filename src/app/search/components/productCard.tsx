import { Card, Text, Image, CardSection, Badge, Stack, Skeleton, Anchor, Group, TooltipFloating } from "@mantine/core";
import { FirearmResult, Retailer, RetailerEnum } from "../../../utils/apiStructs";
import { useState } from "react";

function centsToHumanString(price: number): string {
	const dollars = Math.floor(price / 100);
	const cents = String(price % 100).padEnd(2, "0");

	return `$ ${dollars}.${cents}`;
}

export default function ProductCard({firearm}: {firearm: FirearmResult}) {
	const [imageLoaded, setImageLoaded] = useState(false);

	const regularPrice = centsToHumanString(firearm.price.regular_price);

	let priceBadgeChildren;

	if (firearm.price.sale_price) {
		const salePrice = centsToHumanString(firearm.price.sale_price);

		const regularPriceElement = <Text key={regularPrice} inherit td="line-through" c="dimmed">{regularPrice}</Text>
		const salePriceElement = <Text key={salePrice} inherit>{salePrice}</Text>;

		priceBadgeChildren = [salePriceElement, regularPriceElement];
	} else {
		priceBadgeChildren = [<Text key={regularPrice} inherit>{regularPrice}</Text>];
	}

	// @ts-expect-error: enum is of type object, required to ignore to get working
	const retailer: Retailer = RetailerEnum[firearm.retailer];

	return (
		<Anchor
			key={firearm.name + firearm.query_time.toString()}
			href={firearm.link}
			target="_blank"
			underline="never"
			c="initial"
		>
			<Card radius="lg" withBorder={true} h="22rem" shadow="sm">
				<CardSection mb="1rem">
					<Skeleton h="10rem" visible={!imageLoaded}>
						<Image alt="" h="10rem" src={firearm.thumbnail_link} onLoad={() => setImageLoaded(true)} />
					</Skeleton>
				</CardSection>
				<Stack mb="1rem" gap="xs">
					<Badge variant="outline" size="lg" color="gray"><Group gap="0.5rem">{...priceBadgeChildren}</Group></Badge>
					<Badge variant="outline" size="md" bg={retailer.colourHex} color="gray">{retailer.name}</Badge>
				</Stack>
				<TooltipFloating
					label={firearm.name}
					color="black"
					multiline
					w="15rem"
				>
					<Text size="sm" lineClamp={4}>{firearm.name}</Text>
				</TooltipFloating>
			</Card>
		</Anchor>
	);
}
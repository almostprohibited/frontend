"use client";

import "./styles.css";

import { Button, ButtonGroup, useMantineTheme } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import PriceHistory from "./priceHistory";

export default function ProductButtons() {
	const theme = useMantineTheme();

	const bgColour = theme.colors.dark[7];
	const iconColour = theme.colors.gray[5];

	return (
		<ButtonGroup>
			<PriceHistory bgColour={bgColour} iconColour={iconColour} />
			<Button fullWidth color={bgColour} radius="xs">
				<IconAlertTriangle color={iconColour} />
			</Button>
		</ButtonGroup>
	);
}

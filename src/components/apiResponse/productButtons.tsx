"use client";

import { Button, ButtonGroup, useMantineTheme } from "@mantine/core";
import { IconChartHistogram, IconAlertTriangle } from "@tabler/icons-react";

export default function ProductButtons() {
	const theme = useMantineTheme();

	const bgColour = theme.colors.dark[7];
	const iconColour = theme.colors.gray[5];

	return (
		<ButtonGroup>
			<Button fullWidth color={bgColour} radius="xs">
				<IconChartHistogram color={iconColour} />
			</Button>
			<Button fullWidth color={bgColour} radius="xs">
				<IconAlertTriangle color={iconColour} />
			</Button>
		</ButtonGroup>
	);
}

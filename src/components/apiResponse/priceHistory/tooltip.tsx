import {
	centsToHumanString,
	convertTimestampToHumanReadable,
} from '@/utils/format';
import { getFilteredChartTooltipPayload } from '@mantine/charts';
import { Paper, Text, Title, Flex, Box } from '@mantine/core';
import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const TOOLTIP_OFFSET = 16;

// mantine nor recharts has a built in "flipping" that is
// viewport relative instead of being based on element width
//
// custom tooltip implementation
export function Tooltip({
	timestamp,
	payload,
	mousePosition,
}: {
	timestamp: number;
	payload: ReadonlyArray<Record<string, any>> | undefined;
	mousePosition: React.RefObject<{ x: number; y: number }>;
}) {
	const tooltipRef = useRef<HTMLDivElement>(null);

	const filteredPayload = getFilteredChartTooltipPayload(payload || []);

	useLayoutEffect(() => {
		const ref = tooltipRef.current;

		if (!ref) {
			return;
		}

		const { x, y } = mousePosition.current;

		let left = x + TOOLTIP_OFFSET;

		if (left > window.innerWidth / 2) {
			left = x - TOOLTIP_OFFSET - ref.offsetWidth;
		}

		const top = y - TOOLTIP_OFFSET - ref.offsetHeight;

		ref.style.left = `${left}px`;
		ref.style.top = `${top}px`;
	});

	if (filteredPayload.length === 0) {
		return null;
	}

	return createPortal(
		<Paper
			ref={tooltipRef}
			p="sm"
			withBorder
			shadow="md"
			style={{
				position: 'fixed',
				zIndex: 999,
			}}
		>
			<Flex direction="column" gap="sm">
				<Title order={5} c="white">
					{convertTimestampToHumanReadable(timestamp, {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					})}
				</Title>
				<Box>
					{filteredPayload.map((item) => (
						<Flex
							direction="row"
							w="100%"
							gap="xl"
							key={`${timestamp}-${item.name}`}
						>
							<Text
								key={item.name}
								c={item.color}
								fz="md"
								flex="1"
							>
								{item.name}
							</Text>
							<Text
								key={`${item.name}-${item.value}`}
								fz="md"
								c="white"
							>
								${centsToHumanString(item.value)}
							</Text>
						</Flex>
					))}
				</Box>
			</Flex>
		</Paper>,
		document.body,
	);
}

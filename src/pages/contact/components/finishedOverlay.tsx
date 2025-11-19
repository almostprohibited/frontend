import { Overlay, Stack } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

export function FinishedOverlay({ wasSuccess }: { wasSuccess: boolean }) {
	return (
		<Overlay backgroundOpacity={0.5}>
			<Stack justify="center" align="center" h="100%">
				{wasSuccess ? <Successful /> : <Failed />}
			</Stack>
		</Overlay>
	);
}

function Successful() {
	return (
		<>
			<IconCheck size="5rem" color="green" />
			<span>Message sent</span>
		</>
	);
}

function Failed() {
	return (
		<>
			<IconX size="5rem" color="red" />
			<span>Failed, please refresh and try again</span>
		</>
	);
}

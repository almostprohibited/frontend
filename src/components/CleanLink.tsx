import { Anchor, type AnchorProps } from '@mantine/core';
import type { ReactNode } from 'react';

export function CleanLink({
	link,
	clearStyle = false,
	children,
}: {
	link: string;
	clearStyle?: boolean;
	children: ReactNode;
}) {
	const additionalProps: AnchorProps = {};

	if (clearStyle) {
		additionalProps['c'] = 'unset';
	}

	return (
		<Anchor
			href={link}
			target="_blank"
			referrerPolicy="no-referrer"
			underline={clearStyle ? 'never' : 'hover'}
			{...additionalProps}
		>
			{children}
		</Anchor>
	);
}

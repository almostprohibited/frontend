import { NumberInput } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

export default function FormattedNumberInput({
	value,
	placeholder,
	setValue,
}: {
	value: number | undefined;
	placeholder: string;
	setValue: Dispatch<SetStateAction<number | undefined>>;
}) {
	const numberInputProps = {
		decimalScale: 2,
		allowNegative: false,
		min: 0,
		hideControls: true,
		leftSection: '$',
	};

	return (
		<NumberInput
			w="100%"
			placeholder={placeholder}
			value={value}
			onChange={(val) => {
				setValue(typeof val !== 'string' ? val : undefined);
			}}
			{...numberInputProps}
		/>
	);
}

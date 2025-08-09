"use client";

import { NumberInput } from "@mantine/core";

export default function FormattedNumberInput({
	inputName,
	value,
	placeholder,
}: {
	inputName: string
	value: string | number,
	placeholder: string
}) {
	const numberInputProps = {
		decimalScale: 2,
		allowNegative: false,
		min: 0,
		hideControls: true,
		leftSection: "$"
	};

	return (
		<NumberInput
			name={inputName}
			placeholder={placeholder}
			value={value}
			{...numberInputProps}
		/>
	);
}

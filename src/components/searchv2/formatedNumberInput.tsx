"use client";

import { NumberInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

export default function FormattedNumberInput({
	inputName,
	value,
	setValue,
	placeholder,
}: {
	inputName: string
	value: string | number,
	setValue: Dispatch<SetStateAction<string | number>>,
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
			onChange={setValue}
			{...numberInputProps}
		/>
	);
}

"use client";

import { NumberInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";

export default function FormattedNumberInput({
	inputName,
	placeholder,
}: {
	inputName: string
	placeholder: string
}) {
	const searchParams = useSearchParams();
	const value = searchParams.get(inputName) || "";

	const numberInputProps = {
		decimalScale: 2,
		allowNegative: false,
		min: 0,
		hideControls: true,
		leftSection: "$"
	};

	return <NumberInput name={inputName} placeholder={placeholder} value={value} {...numberInputProps} />;
}

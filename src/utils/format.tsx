export function centsToHumanString(price: number): string {
	// only times this should contain a decimal is if
	// we are displaying cost per round
	const roundedPrice = Math.round(price);

	const dollars = Math.floor(roundedPrice / 100);
	const cents = String(roundedPrice % 100)
		.padStart(2, '0')
		.padEnd(2, '0');

	return `${dollars}.${cents}`;
}

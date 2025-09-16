export function centsToHumanString(price: number): string {
	const dollars = Math.floor(price / 100);
	const cents = String(Math.floor(price % 100)).padStart(2, "0").padEnd(2, "0");

	return `${dollars}.${cents}`;
}

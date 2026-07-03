export function arrayEquals(a: Array<string>, b: Array<string>): boolean {
	if (a.length !== b.length) {
		return false;
	}

	const sortedA = [...a].sort((first, second) => first.localeCompare(second));
	const sortedB = [...b].sort((first, second) => first.localeCompare(second));

	return sortedA.every((aValue, aIndex) => aValue === sortedB[aIndex]);
}

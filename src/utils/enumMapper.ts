export function enumMapper<T extends Record<string, string>>(
	enumObject: T,
	value: string,
) {
	const keyName = (Object.keys(enumObject) as Array<keyof T>).find(
		(key) => enumObject[key] === value,
	);

	// TODO: we are assuming the dev isn't making a mistake here
	// and swallowing the undefined
	return enumObject[keyName!];
}

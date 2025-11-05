// happy birthday to us every June 26th
const birthday = 1750921200000;

export function isBirthday(): boolean {
	const parsedBirthday = new Date(birthday);
	const currentDate = new Date();

	return parsedBirthday.getUTCMonth() === currentDate.getUTCMonth() && parsedBirthday.getUTCDate() === currentDate.getUTCDate();
}

export function getYearsOld(): number {
	const parsedBirthday = new Date(birthday);
	const currentDate = new Date();

	return currentDate.getFullYear() - parsedBirthday.getFullYear();
}

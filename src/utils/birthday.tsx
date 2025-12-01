// happy birthday to us every June 26th
const birthday = 1750921200000;

export function isBirthdayWeek(): boolean {
	const currentDate = new Date();

	const startBirthday = new Date(birthday);
	startBirthday.setUTCFullYear(currentDate.getUTCFullYear());

	const endBirthdayWeek = new Date(birthday);
	endBirthdayWeek.setUTCDate(startBirthday.getUTCDate() + 7);
	endBirthdayWeek.setUTCFullYear(currentDate.getUTCFullYear());

	return startBirthday < currentDate && currentDate < endBirthdayWeek;
}

export function getYearsOld(): number {
	const parsedBirthday = new Date(birthday);
	const currentDate = new Date();

	return currentDate.getUTCFullYear() - parsedBirthday.getUTCFullYear();
}

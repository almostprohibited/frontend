export function isValidEmail(email: string) {
	// probably dont need TODO, but this is quite
	// free in terms of checking for email format
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(email) !== null;
}

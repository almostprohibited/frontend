export function useIsBeta(): boolean {
	return process.env.NEXT_PUBLIC_STAGE === "beta";
}

import { useMediaQuery } from "@mantine/hooks";

export function useMobileView(): boolean {
	return useMediaQuery("(max-width: 1000px)") || false;
}

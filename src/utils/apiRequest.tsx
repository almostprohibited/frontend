import { ReadonlyURLSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import { ApiResponse } from "./apiStructs";

export function useApiCaller(params: ReadonlyURLSearchParams) {
	const fetcher = (url: string) => fetch(url).then(response => response.json());
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?`;
	
	return useSWRImmutable<ApiResponse>(url + params.toString(), fetcher, {
		refreshWhenOffline: false,
		keepPreviousData: true,
	});
}
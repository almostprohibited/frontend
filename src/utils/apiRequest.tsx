import useSWRImmutable from "swr/immutable";
import { HistoryApiResponse, SearchApiResponse } from "./apiStructs";

export function useSearchApi(params: URLSearchParams) {
	const fetcher = (url: string) => fetch(url).then(response => response.json());
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?`;
	
	return useSWRImmutable<SearchApiResponse>(url + params.toString(), fetcher, {
		refreshWhenOffline: false,
		keepPreviousData: true,
	});
}

export function useHistoryApi(params: URLSearchParams) {
	const fetcher = (url: string) => fetch(url).then(response => response.json());
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history?`;
	
	return useSWRImmutable<HistoryApiResponse>(url + params.toString(), fetcher, {
		refreshWhenOffline: false,
		keepPreviousData: true,
	});
}

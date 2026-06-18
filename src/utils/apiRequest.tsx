import useSWRImmutable from 'swr/immutable';
import type {
	HistoryApiResponse,
	NotificationChannel,
	SearchApiResponse,
} from './apiStructs';
import { getApiDomain } from './environment';

export function useSearchApi(params: string) {
	const fetcher = (url: string) =>
		fetch(url).then((response) => response.json());
	const url = `${getApiDomain()}/api/search`;

	return useSWRImmutable<SearchApiResponse>(url + params, fetcher, {
		refreshWhenOffline: false,
		keepPreviousData: true,
	});
}

export function useHistoryApi(objectId: string) {
	const fetcher = (url: string) =>
		fetch(url).then((response) => response.json());
	const url = `${getApiDomain()}/api/history?id=${objectId}`;

	return useSWRImmutable<HistoryApiResponse>(url, fetcher, {
		refreshWhenOffline: false,
		keepPreviousData: true,
	});
}

export function useNotificationChannels() {
	const fetcher = (url: string) =>
		fetch(url, {
			credentials:
				process.env.NODE_ENV === 'development'
					? 'include'
					: 'same-origin',
		}).then((response) => response.json());
	const url = `${getApiDomain()}/api/notification/channels`;

	return useSWRImmutable<Array<NotificationChannel>>(url, fetcher, {
		refreshWhenOffline: false,
		keepPreviousData: true,
	});
}

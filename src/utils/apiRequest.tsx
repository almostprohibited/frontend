import useSWRImmutable from 'swr/immutable';
import type {
	HistoryApiResponse,
	NotificationChannel,
	SearchApiResponse,
} from './apiStructs';
import { getApiDomain } from './environment';
import { mutate } from 'swr';

const GET_NOTIFICATION_CHANNELS = `${getApiDomain()}/api/notification/channels`;

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

	return useSWRImmutable<Array<NotificationChannel>>(
		GET_NOTIFICATION_CHANNELS,
		fetcher,
		{
			refreshWhenOffline: false,
			keepPreviousData: true,
		},
	);
}

export function updateNotificationChannels() {
	mutate(GET_NOTIFICATION_CHANNELS);
}

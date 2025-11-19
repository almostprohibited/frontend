export function getApiDomain(): string {
	return import.meta.env.VITE_API_BASE_URL;
}

export function getStage(): string {
	return import.meta.env.VITE_STAGE;
}

export function getCfSiteKey(): string {
	return import.meta.env.VITE_CF_TURNSTILE_SITE_KEY;
}

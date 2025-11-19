import { RetailerEnum } from './retailerConstants';

export interface Price {
	regular_price: number;
	sale_price?: number;
}

export enum Category {
	Firearm = 'firearm',
	Ammunition = 'ammunition',
	Other = 'other',
	All = 'all',
}

export enum SortOptions {
	Relevant = 'relevant',
	PriceAsc = 'price-asc',
	PriceDesc = 'price-desc',
}

export interface SearchApiResponse {
	items: Array<CrawlResult>;
	total_count: number;
}

export interface CrawlResult {
	id: string;
	name: string;
	url: string;
	price: Price;
	query_time: number;
	retailer: RetailerEnum;
	category: Category;
	description?: string;
	image_url?: string;
	// TODO: fix this, this is
	// suppose to represent metadata
	metadata?: object;
}

export interface HistoryApiResponse {
	history: Array<HistoryPrice>;
	min_price: HistoryPrice;
	max_price: HistoryPrice;
}

export interface HistoryPrice {
	query_time: number;
	regular_price: number;
	sale_price?: number;
}

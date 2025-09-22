export class Retailer {
	readonly name: string;
	readonly url: string;
	readonly logoUrl: string;
	readonly colourHex: string;
	readonly textColourHex: string;

	constructor(name: string, url: string, logoUrl: string, colourHex: string, textColourHex: string = "#e2e2e2") {
		this.name = name;
		this.url = url;
		this.logoUrl = logoUrl;
		this.colourHex = colourHex;
		this.textColourHex = textColourHex;
	}
}

export class RetailerEnum {
	static readonly ReliableGun = new Retailer(
		"Reliable Gun",
		"https://www.reliablegun.com/",
		"https://api.reliablegun.com/content/images/thumbs/0024740.jpeg",
		"#ef3e23"
	);

	static readonly LeverArms = new Retailer(
		"Lever Arms",
		"https://leverarms.com/",
		"https://i0.wp.com/leverarms.com/wp-content/uploads/2021/07/cropped-Lever-Arms-Logo.png",
		"#605a4d"
	);

	static readonly AlFlahertys = new Retailer(
		"Al Flaherty's",
		"https://alflahertys.com/",
		"https://cdn11.bigcommerce.com/s-rk4zcah9rr/images/stencil/250x50/new_logo_moose_renner_text_2019_white_1571237423__82941.original.png",
		"#232f3e",
		"#e2e2e2"
	);

	static readonly BullseyeNorth = new Retailer(
		"Bullseye North",
		"https://www.bullseyenorth.com/",
		"https://www.bullseyenorth.com/cms/default/assets/Image/bullseyenorth-logo5.png",
		"#000f9e"
	);

	static readonly CalgaryShootingCentre = new Retailer(
		"Calgary Shooting Centre",
		"https://store.theshootingcentre.com/",
		"https://cdn11.bigcommerce.com/s-stx5s5fhga/images/stencil/375x75/csc-canadas-gun-shop-logo-250x113_1712677834__05165.original.png",
		"#1c2530"
	);

	static readonly CanadasGunStore = new Retailer(
		"Canada's Gun Store",
		"https://www.canadasgunstore.ca/",
		"https://www.canadasgunstore.ca/inet/styles/CGSINET/app/images/_logo/CGS-logo-navigation.svg",
		"#001e62"
	);

	static readonly FirearmsOutletCanada = new Retailer(
		"Firearms Outlet Canada",
		"https://firearmsoutletcanada.com/",
		"https://cdn11.bigcommerce.com/s-ezlzxhcsxg/images/stencil/290x63/logo_1706733195__42983.original.png",
		"#ee2020"
	);

	static readonly ItalianSportingGoods = new Retailer(
		"Italian Sporting Goods",
		"https://www.italiansportinggoods.com/",
		"https://www.italiansportinggoods.com/static/version1749100864/frontend/isg/main/en_CA/images/ISG_logo_300x100.jpg",
		"#666633"
	);

	static readonly TheAmmoSource = new Retailer(
		"SFRC (The Ammo Source)",
		"https://theammosource.com/",
		"https://cdn11.bigcommerce.com/s-7f2680ghys/images/stencil/166x100/sfrc_1544201399__41333.original.jpg",
		"#88b04b",
		"#000"
	)

	static readonly Tenda = new Retailer(
		"Tenda Canada",
		"https://www.gotenda.com/",
		"https://www.gotenda.com/wp-content/uploads/2020/04/logo-yellow.png",
		"#ffc300",
		"#000"
	)

	static readonly Rdsc = new Retailer(
		"Red Deer Shooting Centre",
		"https://rdsc.ca/",
		"https://rdsc.ca/static/version1749125248/frontend/RDSC/default/en_US/images/logo.svg",
		"#23407B",
		"#fff"
	)

	static readonly G4CGunStore = new Retailer(
		"G4C Gun Store",
		"https://g4cgunstore.com/",
		"https://g4cgunstore.com/wp-content/uploads/2020/08/headerlogo1.png",
		"#231f20",
		"#fff"
	)

	static readonly Tillsonburg = new Retailer(
		"Tillsonburg Gun Shop",
		"https://tillsonburggunshop.com/",
		"https://tillsonburggunshop.com/image/catalog/logo.png",
		"#D9C003",
		"#000"
	)

	static readonly DanteSports = new Retailer(
		"Dante Sports",
		"https://www.dantesports.com/",
		"/retailers/dante.svg",
		"#fac726",
		"#000"
	)

	static readonly SelectShootingSupplies = new Retailer(
		"Select Shooting Supplies",
		"https://selectshootingsupplies.com/",
		"https://cdn11.bigcommerce.com/s-wpb0dq6yc5/images/stencil/original/logobc_1534372578__92678.original.png",
		"#ed1c24",
		"#fff"
	)

	static readonly RangeviewSports = new Retailer(
		"Rangeview Sports",
		"https://www.rangeviewsports.ca/",
		"https://www.rangeviewsports.ca/wp-content/uploads/2025/04/rangeviewlogo-dark.webp",
		"#c62d2d",
		"#fff"
	)

	static readonly TrueNorthArms = new Retailer(
		"True North Arms",
		"https://truenortharms.com/",
		"https://cdn11.bigcommerce.com/s-e2fesuoqas/images/stencil/420x42/tna_magento_banner_v5-21_1652799439__63191.original.png",
		"#9e1600",
		"#fff"
	)

	static readonly DominionOutdoors = new Retailer(
		"Dominion Outdoors",
		"https://www.dominionoutdoors.ca/",
		"https://cdn.shoplightspeed.com/shops/644978/themes/13862/assets/logo.png",
		"#414141",
		"#fff"
	)

	static readonly ProphetRiver = new Retailer(
		"Prophet River",
		"https://store.prophetriver.com/",
		"https://cdn11.bigcommerce.com/s-dcynby20nc/images/stencil/250x100/download_1_1741678164__86402.original.png",
		"#996633",
		"#fff"
	)

	static readonly InternationalShootingSupplies = new Retailer(
		"Int'l Shooting Supplies", // they have such a long name
		"https://internationalshootingsupplies.com/",
		"https://internationalshootingsupplies.com/wp-content/uploads/2014/04/IntlShootingSupplies_logo_col_small2.png",
		"#e51936",
		"#fff"
	)

	static readonly InterSurplus = new Retailer(
		"InterSurplus",
		"https://intersurplus.com/",
		"/retailers/intersurplus.webp",
		"#162950",
		"#fff"
	)

	static readonly GreatNorthGun = new Retailer(
		"Great North Gun",
		"https://greatnorthgunco.ca/",
		"https://greatnorthgunco.ca/wp-content/uploads/2022/09/cropped-corp-logo-1.png",
		"#009EE6",
		"#000"
	)

	static readonly ClintonSportingGoods = new Retailer(
		"Clinton Sporting Goods",
		"https://clintonsporting.com/",
		"https://clintonsporting.com/wp-content/uploads/2020/06/logo.png.webp",
		"#ed831d",
		"#fff"
	)

	static readonly AlSimmons = new Retailer(
		"Al Simmons",
		"https://alsimmonsgunshop.com/",
		"https://i0.wp.com/alsimmonsgunshop.com/wp-content/uploads/2023/06/cropped-ASG-LogoWHT_.png?w=578&ssl=1",
		"#1f1d1d",
		"#fff"
	)

	static readonly SJHardware = new Retailer(
		"S&J Hardware",
		"https://sjhardware.com/",
		"https://cdn11.bigcommerce.com/s-advgsvi7u1/images/stencil/200x90/sjh-logo-2022-white_1731700459__59017.original.png",
		"#5b6073",
		"#fff"
	)

	static readonly VictoryRidgeSports = new Retailer(
		"Victory Ridge Sports",
		"https://victoryridgesports.ca/",
		"https://victoryridgesports.ca/wp-content/uploads/2022/09/VictoryRidge-1.png.webp",
		"#002856",
		"#fff"
	)

	static readonly Marstar = new Retailer(
		"Marstar",
		"https://marstar.ca/",
		"https://marstar.ca/wp-content/uploads/2019/03/cropped-MARSTAR-LOGO-LONG.png.webp",
		"#111",
		"#fff"
	)

	private constructor(
		private readonly key: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		public readonly value: any
	) { }

	static getRetailers(): Array<Retailer> {
		const arr: Array<Retailer> = [];

		Object.getOwnPropertyNames(this).forEach(prop => {
			// @ts-expect-error: value is required to be any to get enum of objects to work
			const retailer = RetailerEnum[prop];

			if (retailer instanceof Retailer) {
				arr.push(retailer);
			}
		});

		return arr;
	}

	toString() {
		return this.key;
	}
}

export interface Price {
	regular_price: number,
	sale_price?: number,
}

export enum Category {
	Firearm = "firearm",
	Ammunition = "ammunition",
	Other = "other"
}

export interface SearchApiResponse {
	items: Array<CrawlResult>,
	total_count: number
}

export interface CrawlResult {
	id: string,
	name: string,
	url: string,
	price: Price,
	query_time: number,
	retailer: RetailerEnum,
	category: Category,
	description?: string,
	image_url?: string,
	// TODO: fix this, this is
	// suppose to represent metadata
	metadata?: object,
}


export interface HistoryApiResponse {
	history: Array<HistoryPrice>,
	lowest_price: HistoryPrice,
	highest_price: HistoryPrice,
}

export interface HistoryPrice {
	normalized_timestamp: number,
	price?: number,
}

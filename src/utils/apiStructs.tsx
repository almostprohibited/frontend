export class Retailer {
	readonly name: string;
	readonly url: string;
	readonly logoUrl: string;
	readonly colourHex: string;

	constructor(name: string, url: string, logoUrl: string, colourHex: string) {
		this.name = name;
		this.url = url;
		this.logoUrl = logoUrl;
		this.colourHex = colourHex;
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

    // static readonly ItalianSportingGoods = new Retailer();
    // static readonly InternationalShootingSupplies = new Retailer();

    static readonly AlFlahertys = new Retailer(
		"Al Flaherty's",
		"https://alflahertys.com/",
		"https://cdn11.bigcommerce.com/s-rk4zcah9rr/images/stencil/250x50/new_logo_moose_renner_text_2019_white_1571237423__82941.original.png",
		"#232f3e"
	);

    static readonly BullseyeNorth = new Retailer(
		"Bullseye North",
		"https://www.bullseyenorth.com/",
		"https://www.bullseyenorth.com/cms/default/assets/Image/bullseyenorth-logo5.png",
		"#000f9e"
	);

    static readonly CanadasGunShop = new Retailer(
		"Canada's Gun Shop",
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

	
	private constructor(
		private readonly key: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		public readonly value: any
	) {}

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

export interface ApiResponse {
	firearms: Array<FirearmResult>,
	total_count: number
}

export interface FirearmResult {
	name: string,
	link: string,
	thumbnail_link: string,
	query_time: number,
	price: {
		regular_price: number,
		sale_price?: number
	},
	retailer: RetailerEnum,
	description?: string,
	ammo_type?: string,
	action_type?: string,
	firearm_type?: string,
	firearm_class?: string,
}

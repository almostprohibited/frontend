export enum RetailerLocation {
	BritishColumbia = 'British Columbia',
	Alberta = 'Alberta',
	Saskatchewan = 'Saskatchewan',
	Manitoba = 'Manitoba',
	Ontario = 'Ontario',
	Quebec = 'Quebec',
	NewfoundlandLabrador = 'Newfoundland and Labrador',
	NewBrunswick = 'New Brunswick',
	PrinceEdwardIsland = 'Prince Edward Island',
	NovaScotia = 'Nova Scotia',
	Yukon = 'Yukon',
	NorthwestTerritories = 'Northwest Territories',
	Nunavut = 'Nunavut',
}

export class Retailer {
	readonly name: string;
	readonly apiName: string;
	readonly url: string;
	readonly logoUrl: string;
	readonly colourHex: string;
	readonly textColourHex: string;
	readonly location: RetailerLocation;

	constructor(
		name: string,
		apiName: string,
		url: string,
		logoUrl: string,
		colourHex: string,
		location: RetailerLocation,
		textColourHex: string = '#e2e2e2',
	) {
		this.name = name;
		this.apiName = apiName;
		this.url = url;
		this.logoUrl = logoUrl;
		this.colourHex = colourHex;
		this.textColourHex = textColourHex;
		this.location = location;
	}
}

// TODO: refactor this to not be this weird enum
export class RetailerEnum {
	static readonly ReliableGun = new Retailer(
		'Reliable Gun',
		'ReliableGun',
		'https://www.reliablegun.com/',
		'https://api.reliablegun.com/content/images/thumbs/0024740.jpeg',
		'#ef3e23',
		RetailerLocation.BritishColumbia,
	);

	static readonly LeverArms = new Retailer(
		'Lever Arms',
		'LeverArms',
		'https://leverarms.com/',
		'https://i0.wp.com/leverarms.com/wp-content/uploads/2021/07/cropped-Lever-Arms-Logo.png',
		'#605a4d',
		RetailerLocation.BritishColumbia,
	);

	static readonly AlFlahertys = new Retailer(
		"Al Flaherty's",
		'AlFlahertys',
		'https://alflahertys.com/',
		'https://cdn11.bigcommerce.com/s-rk4zcah9rr/images/stencil/250x50/new_logo_moose_renner_text_2019_white_1571237423__82941.original.png',
		'#232f3e',
		RetailerLocation.Ontario,
		'#e2e2e2',
	);

	static readonly BullseyeNorth = new Retailer(
		'Bullseye North',
		'BullseyeNorth',
		'https://www.bullseyenorth.com/',
		'https://www.bullseyenorth.com/cms/default/assets/Image/bullseyenorth-logo5.png',
		'#000f9e',
		RetailerLocation.Ontario,
	);

	static readonly CalgaryShootingCentre = new Retailer(
		'Calgary Shooting Centre',
		'CalgaryShootingCentre',
		'https://store.theshootingcentre.com/',
		'https://cdn11.bigcommerce.com/s-stx5s5fhga/images/stencil/375x75/csc-canadas-gun-shop-logo-250x113_1712677834__05165.original.png',
		'#1c2530',
		RetailerLocation.Alberta,
	);

	static readonly CanadasGunStore = new Retailer(
		"Canada's Gun Store",
		'CanadasGunStore',
		'https://www.canadasgunstore.ca/',
		'https://www.canadasgunstore.ca/inet/styles/CGSINET/app/images/_logo/CGS-logo-navigation.svg',
		'#001e62',
		RetailerLocation.Ontario,
	);

	static readonly FirearmsOutletCanada = new Retailer(
		'Firearms Outlet Canada',
		'FirearmsOutletCanada',
		'https://firearmsoutletcanada.com/',
		'https://cdn11.bigcommerce.com/s-ezlzxhcsxg/images/stencil/290x63/logo_1706733195__42983.original.png',
		'#ee2020',
		RetailerLocation.Ontario,
	);

	static readonly ItalianSportingGoods = new Retailer(
		'Italian Sporting Goods',
		'ItalianSportingGoods',
		'https://www.italiansportinggoods.com/',
		'https://www.italiansportinggoods.com/static/version1749100864/frontend/isg/main/en_CA/images/ISG_logo_300x100.jpg',
		'#666633',
		RetailerLocation.BritishColumbia,
	);

	static readonly TheAmmoSource = new Retailer(
		'SFRC (The Ammo Source)',
		'TheAmmoSource',
		'https://theammosource.com/',
		'https://cdn11.bigcommerce.com/s-7f2680ghys/images/stencil/166x100/sfrc_1544201399__41333.original.jpg',
		'#88b04b',
		RetailerLocation.Ontario,
		'#000',
	);

	static readonly Tenda = new Retailer(
		'Tenda Canada',
		'Tenda',
		'https://www.gotenda.com/',
		'https://www.gotenda.com/wp-content/uploads/2020/04/logo-yellow.png',
		'#ffc300',
		RetailerLocation.Ontario,
		'#000',
	);

	static readonly Rdsc = new Retailer(
		'Red Deer Shooting Centre',
		'Rdsc',
		'https://rdsc.ca/',
		'https://rdsc.ca/static/version1749125248/frontend/RDSC/default/en_US/images/logo.svg',
		'#23407B',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly G4CGunStore = new Retailer(
		'G4C Gun Store',
		'G4CGunStore',
		'https://g4cgunstore.com/',
		'https://g4cgunstore.com/wp-content/uploads/2020/08/headerlogo1.png',
		'#231f20',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly Tillsonburg = new Retailer(
		'Tillsonburg Gun Shop',
		'Tillsonburg',
		'https://tillsonburggunshop.com/',
		'https://tillsonburggunshop.com/image/catalog/logo.png',
		'#D9C003',
		RetailerLocation.Ontario,
		'#000',
	);

	static readonly DanteSports = new Retailer(
		'Dante Sports',
		'DanteSports',
		'https://www.dantesports.com/',
		'/retailers/dante.svg',
		'#fac726',
		RetailerLocation.Quebec,
		'#000',
	);

	static readonly SelectShootingSupplies = new Retailer(
		'Select Shooting Supplies',
		'SelectShootingSupplies',
		'https://selectshootingsupplies.com/',
		'https://cdn11.bigcommerce.com/s-wpb0dq6yc5/images/stencil/original/logobc_1534372578__92678.original.png',
		'#ed1c24',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly RangeviewSports = new Retailer(
		'Rangeview Sports',
		'RangeviewSports',
		'https://www.rangeviewsports.ca/',
		'https://www.rangeviewsports.ca/wp-content/uploads/2025/04/rangeviewlogo-dark.webp',
		'#c62d2d',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly TrueNorthArms = new Retailer(
		'True North Arms',
		'TrueNorthArms',
		'https://truenortharms.com/',
		'https://cdn11.bigcommerce.com/s-e2fesuoqas/images/stencil/420x42/tna_magento_banner_v5-21_1652799439__63191.original.png',
		'#9e1600',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly DominionOutdoors = new Retailer(
		'Dominion Outdoors',
		'DominionOutdoors',
		'https://www.dominionoutdoors.ca/',
		'https://cdn.shoplightspeed.com/shops/644978/themes/13862/assets/logo.png',
		'#414141',
		RetailerLocation.Manitoba,
		'#fff',
	);

	static readonly ProphetRiver = new Retailer(
		'Prophet River',
		'ProphetRiver',
		'https://store.prophetriver.com/',
		'https://cdn11.bigcommerce.com/s-dcynby20nc/images/stencil/250x100/download_1_1741678164__86402.original.png',
		'#996633',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly InternationalShootingSupplies = new Retailer(
		"Int'l Shooting Supplies", // they have such a long name
		'InternationalShootingSupplies',
		'https://internationalshootingsupplies.com/',
		'https://internationalshootingsupplies.com/wp-content/uploads/2014/04/IntlShootingSupplies_logo_col_small2.png',
		'#e51936',
		RetailerLocation.BritishColumbia,
		'#fff',
	);

	static readonly InterSurplus = new Retailer(
		'InterSurplus',
		'InterSurplus',
		'https://intersurplus.com/',
		'/retailers/intersurplus.webp',
		'#162950',
		RetailerLocation.Quebec,
		'#fff',
	);

	static readonly GreatNorthGun = new Retailer(
		'Great North Gun',
		'GreatNorthGun',
		'https://greatnorthgunco.ca/',
		'https://greatnorthgunco.ca/wp-content/uploads/2022/09/cropped-corp-logo-1.png',
		'#009EE6',
		RetailerLocation.Quebec,
		'#000',
	);

	static readonly ClintonSportingGoods = new Retailer(
		'Clinton Sporting Goods',
		'ClintonSportingGoods',
		'https://clintonsporting.com/',
		'https://clintonsporting.com/wp-content/uploads/2020/06/logo.png.webp',
		'#ed831d',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly AlSimmons = new Retailer(
		'Al Simmons',
		'AlSimmons',
		'https://alsimmonsgunshop.com/',
		'https://i0.wp.com/alsimmonsgunshop.com/wp-content/uploads/2023/06/cropped-ASG-LogoWHT_.png?w=578&ssl=1',
		'#1f1d1d',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly SJHardware = new Retailer(
		'S&J Hardware',
		'SJHardware',
		'https://sjhardware.com/',
		'https://cdn11.bigcommerce.com/s-advgsvi7u1/images/stencil/200x90/sjh-logo-2022-white_1731700459__59017.original.png',
		'#5b6073',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly VictoryRidgeSports = new Retailer(
		'Victory Ridge Sports',
		'VictoryRidgeSports',
		'https://victoryridgesports.ca/',
		'https://victoryridgesports.ca/wp-content/uploads/2022/09/VictoryRidge-1.png.webp',
		'#002856',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly Marstar = new Retailer(
		'Marstar',
		'Marstar',
		'https://marstar.ca/',
		'https://marstar.ca/wp-content/uploads/2019/03/cropped-MARSTAR-LOGO-LONG.png.webp',
		'#111',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly MagDump = new Retailer(
		'MagDump',
		'MagDump',
		'https://magdump.ca/',
		'https://magdump.ca/img/logo-1731438947.jpg',
		'#000',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly SoleyOutdoors = new Retailer(
		'Soley Outdoors',
		'SoleyOutdoors',
		'https://www.solelyoutdoors.com/',
		'https://cdn.shoplightspeed.com/shops/613284/themes/10999/assets/logo.png?20241108172650',
		'#35a963',
		RetailerLocation.Ontario,
		'#fff',
	);

	private constructor(
		private readonly key: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		public readonly value: any,
	) {}

	static getRetailers(): Array<Retailer> {
		const arr: Array<Retailer> = [];

		Object.getOwnPropertyNames(this).forEach((prop) => {
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

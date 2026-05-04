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
		'/retailers/reliablegun.jpg',
		'#ef3e23',
		RetailerLocation.BritishColumbia,
	);

	static readonly LeverArms = new Retailer(
		'Lever Arms',
		'LeverArms',
		'https://leverarms.com/',
		'/retailers/leverarms.png',
		'#605a4d',
		RetailerLocation.BritishColumbia,
	);

	static readonly AlFlahertys = new Retailer(
		"Al Flaherty's",
		'AlFlahertys',
		'https://alflahertys.com/',
		'/retailers/alflahertys.png',
		'#232f3e',
		RetailerLocation.Ontario,
		'#e2e2e2',
	);

	static readonly BullseyeNorth = new Retailer(
		'Bullseye North',
		'BullseyeNorth',
		'https://www.bullseyenorth.com/',
		'/retailers/bullseyenorth.png',
		'#000f9e',
		RetailerLocation.Ontario,
	);

	static readonly CalgaryShootingCentre = new Retailer(
		'Calgary Shooting Centre',
		'CalgaryShootingCentre',
		'https://store.theshootingcentre.com/',
		'/retailers/calgaryshootingcentre.png',
		'#1c2530',
		RetailerLocation.Alberta,
	);

	static readonly CanadasGunStore = new Retailer(
		"Canada's Gun Store",
		'CanadasGunStore',
		'https://www.canadasgunstore.ca/',
		'/retailers/canadasgunstore.svg',
		'#001e62',
		RetailerLocation.Ontario,
	);

	static readonly FirearmsOutletCanada = new Retailer(
		'Firearms Outlet Canada',
		'FirearmsOutletCanada',
		'https://firearmsoutletcanada.com/',
		'/retailers/firearmsoutletcanada.png',
		'#ee2020',
		RetailerLocation.Ontario,
	);

	static readonly ItalianSportingGoods = new Retailer(
		'Italian Sporting Goods',
		'ItalianSportingGoods',
		'https://www.italiansportinggoods.com/',
		'/retailers/italiansportinggoods.jpg',
		'#666633',
		RetailerLocation.BritishColumbia,
	);

	static readonly TheAmmoSource = new Retailer(
		'SFRC (The Ammo Source)',
		'TheAmmoSource',
		'https://theammosource.com/',
		'/retailers/theammosource.jpg',
		'#88b04b',
		RetailerLocation.Ontario,
		'#000',
	);

	static readonly Tenda = new Retailer(
		'Tenda Canada',
		'Tenda',
		'https://www.gotenda.com/',
		'/retailers/tenda.png',
		'#ffc300',
		RetailerLocation.Ontario,
		'#000',
	);

	static readonly Rdsc = new Retailer(
		'Red Deer Shooting Centre',
		'Rdsc',
		'https://rdsc.ca/',
		'/retailers/rdsc.svg',
		'#23407B',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly G4CGunStore = new Retailer(
		'G4C Gun Store',
		'G4CGunStore',
		'https://g4cgunstore.com/',
		'/retailers/g4cgunstore.png',
		'#231f20',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly Tillsonburg = new Retailer(
		'Tillsonburg Gun Shop',
		'Tillsonburg',
		'https://tillsonburggunshop.com/',
		'/retailers/tillsonburg.png',
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
		'/retailers/selectshootingsupplies.png',
		'#ed1c24',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly RangeviewSports = new Retailer(
		'Rangeview Sports',
		'RangeviewSports',
		'https://www.rangeviewsports.ca/',
		'/retailers/rangeviewsports.webp',
		'#c62d2d',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly TrueNorthArms = new Retailer(
		'True North Arms',
		'TrueNorthArms',
		'https://truenortharms.com/',
		'/retailers/truenortharms.png',
		'#9e1600',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly DominionOutdoors = new Retailer(
		'Dominion Outdoors',
		'DominionOutdoors',
		'https://www.dominionoutdoors.ca/',
		'/retailers/dominionoutdoors.png',
		'#414141',
		RetailerLocation.Manitoba,
		'#fff',
	);

	static readonly ProphetRiver = new Retailer(
		'Prophet River',
		'ProphetRiver',
		'https://store.prophetriver.com/',
		'/retailers/prophetriver.png',
		'#996633',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly InternationalShootingSupplies = new Retailer(
		"Int'l Shooting Supplies", // they have such a long name
		'InternationalShootingSupplies',
		'https://internationalshootingsupplies.com/',
		'/retailers/internationalshootingsupplies.png',
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
		'/retailers/greatnorthgun.png',
		'#009EE6',
		RetailerLocation.Quebec,
		'#000',
	);

	static readonly ClintonSportingGoods = new Retailer(
		'Clinton Sporting Goods',
		'ClintonSportingGoods',
		'https://clintonsporting.com/',
		'/retailers/clintonsportinggoods.webp',
		'#ed831d',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly AlSimmons = new Retailer(
		'Al Simmons',
		'AlSimmons',
		'https://alsimmonsgunshop.com/',
		'/retailers/alsimmons.png',
		'#1f1d1d',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly SJHardware = new Retailer(
		'S&J Hardware',
		'SJHardware',
		'https://sjhardware.com/',
		'/retailers/sjhardware.png',
		'#5b6073',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly VictoryRidgeSports = new Retailer(
		'Victory Ridge Sports',
		'VictoryRidgeSports',
		'https://victoryridgesports.ca/',
		'/retailers/victoryridgesports.webp',
		'#002856',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly Marstar = new Retailer(
		'Marstar',
		'Marstar',
		'https://marstar.ca/',
		'/retailers/marstar.webp',
		'#111',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly MagDump = new Retailer(
		'MagDump',
		'MagDump',
		'https://magdump.ca/',
		'/retailers/magdump.jpg',
		'#000',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly SoleyOutdoors = new Retailer(
		'Soley Outdoors',
		'SoleyOutdoors',
		'https://www.solelyoutdoors.com/',
		'/retailers/soleyoutdoors.png',
		'#35a963',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly BartonsBigCountry = new Retailer(
		'Bartons Big Country',
		'BartonsBigCountry',
		'https://www.bartonsbigcountry.ca/',
		'/retailers/bartonsbigcountry.png',
		'#382a1f',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly FrontierFirearms = new Retailer(
		'Frontier Firearms',
		'FrontierFirearms',
		'https://frontierfirearms.ca/',
		'/retailers/frontierfirearms.png',
		'#3d451d',
		RetailerLocation.Saskatchewan,
		'#fff',
	);

	static readonly GoldNLoan = new Retailer(
		"Gold'n Loan Outfitters",
		'GoldNLoan',
		'https://outfitters.goldnloan.com/',
		'/retailers/goldnloan.webp',
		'#6c765e',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly Crafm = new Retailer(
		'CRAFM',
		'Crafm',
		'https://crafm.com/',
		'/retailers/crafm.png',
		'#2A2B2A',
		RetailerLocation.Quebec,
		'#fff',
	);

	static readonly CabinCreekSupply = new Retailer(
		'Cabin Creek Supply',
		'CabinCreekSupply',
		'https://www.cabincreeksupply.ca/',
		'/retailers/cabincreeksupply.png',
		'#25282a',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly Latulippe = new Retailer(
		'Latulippe',
		'Latulippe',
		'https://latulippe.com/',
		'/retailers/latulippe.svg',
		'#006569',
		RetailerLocation.Quebec,
		'#fff',
	);

	static readonly TheGunDealer = new Retailer(
		'The Gun Dealer',
		'TheGunDealer',
		'https://thegundealer.ca/',
		'/retailers/thegundealer.png',
		'#eb1e24',
		RetailerLocation.NewBrunswick,
		'#fff',
	);

	static readonly PDEnterprises = new Retailer(
		'P & D Enterprises',
		'PDEnterprises',
		'https://pdent.ca/',
		'/retailers/pdenterprises.svg',
		'#214400',
		RetailerLocation.Alberta,
		'#fff',
	);

	static readonly EllwoodEpps = new Retailer(
		'Ellwood Epps',
		'EllwoodEpps',
		'https://ellwoodepps.com/',
		'/retailers/ellwoodepps.png',
		'#3d3625',
		RetailerLocation.Ontario,
		'#e6dbc2',
	);

	static readonly BudgetShooterSupply = new Retailer(
		'Budget Shooter Supply',
		'BudgetShooterSupply',
		'https://budgetshootersupply.ca/',
		'/retailers/budgetshootersupply.png',
		'#dd0000',
		RetailerLocation.BritishColumbia,
		'#f3f3f3',
	);

	static readonly WolverineSupplies = new Retailer(
		'Wolverine Supplies',
		'WolverineSupplies',
		'https://wolverinesupplies.com/',
		'/retailers/wolverinesupplies.png',
		'#1d2930',
		RetailerLocation.Manitoba,
		'#caa47d',
	);

	static readonly CanFirearm = new Retailer(
		'Canfirearm',
		'CanFirearm',
		'https://canfirearm.com/',
		'/retailers/canfirearm.webp',
		'#1f4268',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly XReload = new Retailer(
		'X-Reload',
		'XReload',
		'https://x-reload.com/',
		'/retailers/xreload.svg',
		'#a40001',
		RetailerLocation.Quebec,
		'#000',
	);

	static readonly Gobles = new Retailer(
		"Goble's",
		'Gobles',
		'https://www.gobles.ca/',
		'/retailers/gobles.png',
		'#ebba2d',
		RetailerLocation.Ontario,
		'#000',
	);

	static readonly LonderoSports = new Retailer(
		'Londero Sports',
		'LonderoSports',
		'https://www.londerosports.com/',
		'/retailers/londero.webp',
		'#00984e',
		RetailerLocation.Quebec,
		'#fff',
	);

	static readonly ShootersChoice = new Retailer(
		"Shooter's Choice",
		'ShootersChoice',
		'https://shooterschoice.com/',
		'/retailers/shooterschoice.png',
		'#1d8935',
		RetailerLocation.Ontario,
		'808080',
	);

	static readonly LanzShootingSupplies = new Retailer(
		'Lanz Shooting Supplies',
		'LanzShootingSupplies',
		'https://lanzshootingsupplies.com/',
		'/retailers/lanz.png',
		'#0e1c26',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly DoubleTapSports = new Retailer(
		'DoubleTap Sports',
		'DoubleTapSports',
		'https://doubletapsports.com/',
		'/retailers/doubletap.png',
		'#229ccb',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly NechakoOutdoors = new Retailer(
		'Nechako Outdoors',
		'NechakoOutdoors',
		'https://nechakooutdoors.ca/',
		'/retailers/nechako.png',
		'#71ae47',
		RetailerLocation.BritishColumbia,
		'#fff',
	);

	static readonly UxbridgeArms = new Retailer(
		'Uxbridge Arms',
		'UxbridgeArms',
		'https://uxbridgearms.com/',
		'/retailers/uxbridge.webp',
		'#242833',
		RetailerLocation.Ontario,
		'#fff',
	);

	static readonly Fwgc = new Retailer(
		'Fishing World GC',
		'Fwgc',
		'https://fishingworldgc.ca/',
		'/retailers/fwgc.png',
		'#1e2021',
		RetailerLocation.Ontario,
		'#cccccc',
	);

	static readonly EasthillOutdoors = new Retailer(
		'Easthill Outdoors',
		'EasthillOutdoors',
		'https://www.easthilloutdoors.com/',
		'/retailers/easthill.png',
		'#414141',
		RetailerLocation.Ontario,
		'#fdb813',
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

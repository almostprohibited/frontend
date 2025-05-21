export enum RetailerName {
    ReliableGun,
    LeverArms,
    ItalianSportingGoods,
    InternationalShootingSupplies,
    AlFlahertys,
    BullseyeNorth,
    CanadasGunShop,
	CanadasGunStore,
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
	retailer: RetailerName,
	description?: string,
	ammo_type?: string,
	action_type?: string,
	firearm_type?: string,
	firearm_class?: string,
}

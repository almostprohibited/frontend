const placeHolderValues = [
	'norinco sks',
	'american ruger ranch',
	'ruger 10/22',
	'tikka t1x',
	'citadel ad-500',
	'henry lever 357',
	'phased plasma rifle 40-watt',
	'chiappa takedown',
	'howa m1500',
	'mauser',
	'cz alpha',
	'winchester 94',
	'mrx bison',
	'LAR mag',
	'10/22 rotary magazine',
	'stripper clip',
	'vortex venom',
	'red dot',
	'5.56 m855',
	'22lr 40gr',
	'holosun',
	'30mm mount',
	'browning bar',
	'federal 308 178gr',
	'glock g17 barrel',
	'hornady 10mm auto',
	'citadel levtac',
	'm-lok rail',
	'30-30 win SP',
	'strikeman laser bullet',
	'carl gustaf',
	'tasco 3-9x40',
	'7.62 54r brass',
	'walker razor',
];

export function usePlaceHolderSearch(): string {
	return placeHolderValues[
		Math.floor(Math.random() * placeHolderValues.length)
	];
}

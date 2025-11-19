import { useMobileView } from '@/utils/hooks/useMobileView';
import { SegmentedControl, Center } from '@mantine/core';
import {
	IconStar,
	IconSortAscendingNumbers,
	IconSortDescendingNumbers,
	IconAsterisk,
	IconBox,
} from '@tabler/icons-react';
import type { Dispatch, SetStateAction } from 'react';
import IconFirearm from '../icons/firearm';
import IconAmmo from '../icons/ammo';
import { Category, SortOptions } from '@/utils/apiStructs';
import { enumMapper } from '@/utils/enumMapper';

export default function SortOptionsRadio({
	sortValue,
	setSortValue,
	categoryValue,
	setCategoryValue,
	disabled = false,
}: {
	sortValue: SortOptions;
	setSortValue: Dispatch<SetStateAction<SortOptions>>;
	categoryValue: Category;
	setCategoryValue: Dispatch<SetStateAction<Category>>;
	disabled?: boolean;
}) {
	const isMobile = useMobileView();

	const segmentWidth = isMobile ? '100%' : '';

	const categories = [
		{
			value: Category.All,
			label: (
				<Center style={{ gap: '0.5rem' }}>
					<IconAsterisk size="1rem" />
					<span>All</span>
				</Center>
			),
		},
		{
			value: Category.Firearm,
			label: (
				<Center style={{ gap: '0.5rem' }}>
					<IconFirearm size="1rem" />
					<span>Firearms</span>
				</Center>
			),
		},
		{
			value: Category.Ammunition,
			label: (
				<Center style={{ gap: '0.5rem' }}>
					<IconAmmo size="1rem" />
					<span>Ammo</span>
				</Center>
			),
		},
		{
			value: Category.Other,
			label: (
				<Center style={{ gap: '0.5rem' }}>
					<IconBox size="1rem" />
					<span>Other</span>
				</Center>
			),
		},
	];

	return (
		<>
			<SegmentedControl
				w={segmentWidth}
				disabled={disabled}
				value={sortValue}
				onChange={(val) => {
					setSortValue(enumMapper(SortOptions, val)!);
				}}
				withItemsBorders={false}
				data={[
					{
						value: SortOptions.Relevant,
						label: (
							<Center style={{ gap: '0.5rem' }}>
								<IconStar size="1rem" />
								<span>Relevant</span>
							</Center>
						),
					},
					{
						value: SortOptions.PriceAsc,
						label: (
							<Center style={{ gap: '0.5rem' }}>
								<IconSortAscendingNumbers size="1rem" />
								<span>Price Asc</span>
							</Center>
						),
					},
					{
						value: SortOptions.PriceDesc,
						label: (
							<Center style={{ gap: '0.5rem' }}>
								<IconSortDescendingNumbers size="1rem" />
								<span>Price Desc</span>
							</Center>
						),
					},
				]}
			/>
			<SegmentedControl
				w={segmentWidth}
				disabled={disabled}
				value={categoryValue}
				onChange={(val) => {
					setCategoryValue(enumMapper(Category, val)!);
				}}
				withItemsBorders={false}
				data={categories}
			/>
		</>
	);
}

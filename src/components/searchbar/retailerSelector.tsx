import { useMobileView } from '@/utils/hooks/useMobileView';
import { Retailer, RetailerEnum } from '@/utils/retailerConstants';
import {
	Box,
	CheckIcon,
	Combobox,
	ComboboxDropdown,
	ComboboxDropdownTarget,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxOption,
	ComboboxOptions,
	Group,
	ScrollAreaAutosize,
	TextInput,
	Text,
	useCombobox,
	useMantineTheme,
	ComboboxEventsTarget,
	ComboboxHeader,
	Flex,
} from '@mantine/core';
import { useEffect, useState } from 'react';

function createOption(retailer: Retailer, isSelected: boolean) {
	const theme = useMantineTheme();

	return (
		<ComboboxOption value={retailer.name} key={retailer.name}>
			<Group>
				{isSelected ? <CheckIcon size="0.5rem" /> : null}
				<Text
					size="sm"
					c={isSelected ? theme.colors.green[7] : 'initial'}
				>
					{retailer.name}
				</Text>
			</Group>
		</ComboboxOption>
	);
}

function createOptionGroups(retailers: Retailer[], selectedOptions: string[]) {
	const mapping: { [location: string]: Retailer[] } = {};

	retailers.forEach((retailer) => {
		mapping[retailer.location] = mapping[retailer.location] || [];
		mapping[retailer.location].push(retailer);
	});

	return Object.entries(mapping).map(([location, retailers]) => (
		<ComboboxGroup label={location} key={location}>
			{retailers.map((retailer) =>
				createOption(retailer, selectedOptions.includes(retailer.name)),
			)}
		</ComboboxGroup>
	));
}

export default function RetailerSelector() {
	const theme = useMantineTheme();
	const isMobile = useMobileView();

	const [searchFilter, setSearchFilter] = useState('');
	const [selectedOptions, updateSelectedOptions] = useState<string[]>([]);

	const comboBox = useCombobox({
		onDropdownClose: () => {
			setSearchFilter('');
			comboBox.resetSelectedOption();
		},
		onDropdownOpen: () => {
			if (searchFilter !== '') {
				comboBox.selectFirstOption();
			} else {
				comboBox.resetSelectedOption();
			}
		},
	});

	const filteredRetailers = RetailerEnum.getRetailers()
		.sort((a, b) => a.name.localeCompare(b.name))
		.filter((retailer) => {
			if (searchFilter.length === 0) {
				return true;
			}

			return retailer.name
				.toLowerCase()
				.includes(searchFilter.toLowerCase());
		});

	const dropdownOptions = createOptionGroups(
		filteredRetailers,
		selectedOptions,
	);

	useEffect(() => {
		comboBox.selectFirstOption();
	}, [searchFilter]);

	return (
		<Box w="100%">
			<Combobox
				store={comboBox}
				onOptionSubmit={(retailer) => {
					let options = [...selectedOptions];

					if (options.includes(retailer)) {
						options = options.filter(
							(existingRetailer) => existingRetailer !== retailer,
						);
					} else {
						options.push(retailer);
					}

					updateSelectedOptions(options);
					setSearchFilter('');
				}}
			>
				<ComboboxDropdownTarget>
					<ComboboxEventsTarget>
						<TextInput
							onBlur={() => {
								comboBox.closeDropdown();
							}}
							onFocus={() => comboBox.openDropdown()}
							value={searchFilter}
							placeholder="filter retailers"
							onChange={(event) => {
								comboBox.updateSelectedOptionIndex();
								setSearchFilter(event.currentTarget.value);
							}}
						/>
					</ComboboxEventsTarget>
				</ComboboxDropdownTarget>
				<ComboboxDropdown>
					<ComboboxOptions>
						<ComboboxHeader
							styles={{
								header: {
									borderBottom: `1px solid ${theme.colors.gray[7]}`,
								},
							}}
						>
							<Flex w="100%" gap="md">
								<Text size="xs">
									{selectedOptions.length} currently selected
								</Text>
								{/* we have a button at home */}
								<Text
									size="xs"
									style={{ cursor: 'pointer' }}
									onClick={() => {
										updateSelectedOptions([]);
									}}
								>
									[ clear ]
								</Text>
							</Flex>
						</ComboboxHeader>
						<ScrollAreaAutosize
							type="always"
							mah={isMobile ? '15rem' : '20rem'}
							scrollbars="y"
						>
							{Object.keys(dropdownOptions).length === 0 ? (
								<ComboboxEmpty>
									no retailers found
								</ComboboxEmpty>
							) : (
								dropdownOptions
							)}
						</ScrollAreaAutosize>
					</ComboboxOptions>
				</ComboboxDropdown>
			</Combobox>
		</Box>
	);
}

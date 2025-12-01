import { useMobileView } from '@/utils/hooks/useMobileView';
import { Retailer, RetailerEnum } from '@/utils/retailerConstants';
import {
	Box,
	CheckIcon,
	Combobox,
	ComboboxDropdown,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxOption,
	ComboboxOptions,
	Group,
	ScrollAreaAutosize,
	Text,
	useCombobox,
	useMantineTheme,
	Flex,
	ComboboxTarget,
	Button,
	ComboboxSearch,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

function createOption(retailer: Retailer, isSelected: boolean) {
	const theme = useMantineTheme();

	return (
		<ComboboxOption value={retailer.apiName} key={retailer.name}>
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

	return Object.keys(mapping)
		.sort()
		.map((location) => (
			<ComboboxGroup label={location} key={location}>
				{mapping[location].map((retailer) =>
					createOption(
						retailer,
						selectedOptions.includes(retailer.apiName),
					),
				)}
			</ComboboxGroup>
		));
}

export default function RetailerSelector({
	value,
	setValue,
}: {
	value: string[];
	setValue: Dispatch<SetStateAction<string[]>>;
}) {
	const theme = useMantineTheme();
	const isMobile = useMobileView();

	const [searchFilter, setSearchFilter] = useState('');

	const comboBox = useCombobox({
		onDropdownClose: () => {
			setSearchFilter('');
			comboBox.resetSelectedOption();
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

	const dropdownOptions = createOptionGroups(filteredRetailers, value);

	return (
		<Box w="100%">
			<Combobox
				store={comboBox}
				onOptionSubmit={(retailer) => {
					let options = [...value];

					if (options.includes(retailer)) {
						options = options.filter(
							(existingRetailer) => existingRetailer !== retailer,
						);
					} else {
						options.push(retailer);
					}

					setValue(options);
					setSearchFilter('');
				}}
			>
				<ComboboxTarget>
					<Flex gap="md" justify="center">
						<Button
							w="100%"
							variant="light"
							onClick={() => comboBox.toggleDropdown()}
							color={theme.colors.indigo[3]}
						>
							{`Filter retailers (${value.length} selected)`}
						</Button>
						<Button
							variant="light"
							color={theme.colors.indigo[3]}
							onClick={() => setValue([])}
						>
							<IconTrash />
						</Button>
					</Flex>
				</ComboboxTarget>
				<ComboboxDropdown>
					{!isMobile && (
						<ComboboxSearch
							value={searchFilter}
							onBlur={() => {
								comboBox.closeDropdown();
							}}
							placeholder="search for a retailer"
							onChange={(event) => {
								setSearchFilter(event.currentTarget.value);

								comboBox.updateSelectedOptionIndex();
							}}
						/>
					)}
					<ComboboxOptions>
						<ScrollAreaAutosize
							type="always"
							mah="20rem"
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

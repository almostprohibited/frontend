import {
	LoadingOverlay,
	Flex,
	ActionIcon,
	Collapse,
	Fieldset,
	Divider,
	Box,
	Group,
	Indicator,
	useMantineTheme,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconSend2 } from '@tabler/icons-react';
import { useLocation, useNavigate, useSearch } from '@tanstack/react-router';
import MainInput from './mainInput';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import FormattedNumberInput from './formatedNumberInput';
import SortOptionsRadio from './searchOptionsRadio';
import { Category, SortOptions } from '@/utils/apiStructs';
import PaginationButtons from './pagination';
import type { SearchRouteSchema } from '@/routes';
import RetailerSelector from './retailerSelector';
import { useMobileView } from '@/utils/hooks/useMobileView';
import { useIsBeta } from '@/utils/hooks/useIsBeta';

export default function SearchBar({
	child = <></>,
	isLoading = false,
	totalItems = 0,
}: {
	child?: ReactElement;
	isLoading?: boolean;
	totalItems?: number;
}) {
	const theme = useMantineTheme();
	const isMobile = useMobileView();
	const isBeta = useIsBeta();

	const navigateSearch = useNavigate({ from: '/search' });
	const currentRoute = useLocation().pathname;
	const searchParams = useSearch({ from: '/search', shouldThrow: false });

	const [dropDownVisible, dropDownToggle] = useToggle([false, true]);

	const [searchQuery, updateSearchQuery] = useState(
		searchParams?.query || '',
	);

	const [sortValue, updateSortValue] = useState(
		searchParams?.sort || SortOptions.Relevant,
	);

	const [categoryValue, updateCategoryValue] = useState(
		searchParams?.category || Category.All,
	);

	const [minPriceValue, updateMinPriceValue] = useState(
		searchParams?.['min-price'] || undefined,
	);

	const [maxPriceValue, updateMaxPriceValue] = useState(
		searchParams?.['max-price'] || undefined,
	);

	const [pageValue, updatePageValue] = useState(searchParams?.page || 0);

	const [retailersValue, updateRetailersValue] = useState(
		searchParams?.retailers || [],
	);

	const maxPages = Math.ceil(totalItems / 32);

	const showExtraOptionsIndicator =
		retailersValue.length > 0 ||
		minPriceValue !== undefined ||
		maxPriceValue !== undefined;

	function sendQuery(forceSend: boolean = false) {
		if (forceSend || currentRoute !== '/') {
			navigateSearch({
				search: (oldParams) => {
					const shouldReset = shouldResetPage(oldParams);

					let newPageVal: number = pageValue;

					if (shouldReset) {
						updatePageValue(0);
						newPageVal = 0;
					}

					return {
						query: searchQuery,
						sort: sortValue,
						category: categoryValue,
						'min-price': minPriceValue,
						'max-price': maxPriceValue,
						page: newPageVal,
						retailers:
							retailersValue.length === 0
								? undefined
								: retailersValue,
					};
				},
			});
		}
	}

	function shouldResetPage(oldParams: SearchRouteSchema): boolean {
		return (
			oldParams.query !== searchQuery ||
			oldParams.sort !== sortValue ||
			oldParams.category !== categoryValue ||
			oldParams['min-price'] !== minPriceValue ||
			oldParams['max-price'] !== maxPriceValue
		);
	}

	useEffect(() => {
		sendQuery();
	}, [sortValue, categoryValue, pageValue]);

	return (
		<>
			<Box pos="relative">
				<LoadingOverlay
					overlayProps={{ radius: 'md', backgroundOpacity: 0.5 }}
					visible={isLoading}
					loaderProps={{ type: 'oval' }}
				/>
				<Flex align="center" justify="center">
					<Indicator
						position="top-start"
						size={12}
						color={theme.colors.yellow[7]}
						disabled={!showExtraOptionsIndicator}
					>
						<ActionIcon
							disabled={isLoading}
							variant="default"
							size="input-md"
							mr="0.5rem"
							onClick={() => dropDownToggle()}
						>
							<IconAdjustmentsHorizontal />
						</ActionIcon>
					</Indicator>
					<MainInput
						disabled={isLoading}
						value={searchQuery}
						setValue={updateSearchQuery}
						onSubmit={() => sendQuery(true)}
					/>
					<ActionIcon
						disabled={isLoading}
						variant="default"
						size="input-md"
						ml="0.5rem"
						c="blue"
						onClick={() => sendQuery(true)}
					>
						<IconSend2 />
					</ActionIcon>
				</Flex>

				<Group justify="space-between" mt="1rem">
					<SortOptionsRadio
						disabled={isLoading}
						sortValue={sortValue}
						setSortValue={updateSortValue}
						categoryValue={categoryValue}
						setCategoryValue={updateCategoryValue}
					/>
				</Group>

				<Collapse mt="1rem" in={dropDownVisible}>
					<Flex gap="md" direction={isMobile ? 'column' : 'row'}>
						<Fieldset disabled={isLoading} legend="Price" w="100%">
							<Flex gap="md">
								<FormattedNumberInput
									value={minPriceValue}
									placeholder="minimum price"
									setValue={updateMinPriceValue}
								/>
								<FormattedNumberInput
									value={maxPriceValue}
									placeholder="maximum price"
									setValue={updateMaxPriceValue}
								/>
							</Flex>
						</Fieldset>
						<Fieldset
							disabled={isLoading}
							legend="Retailers"
							w="100%"
						>
							<RetailerSelector
								value={retailersValue}
								setValue={updateRetailersValue}
							/>
						</Fieldset>
					</Flex>
				</Collapse>
			</Box>

			{searchParams !== undefined && (
				<>
					<Flex direction="column" gap="md">
						<Divider mt="1rem" mb="1rem" />
						<PaginationButtons
							page={pageValue + 1}
							maxPages={maxPages}
							setPage={updatePageValue}
							isSendingRequest={isLoading}
						/>
						{child}
						<PaginationButtons
							page={pageValue + 1}
							maxPages={maxPages}
							setPage={updatePageValue}
							isSendingRequest={isLoading}
						/>
					</Flex>
				</>
			)}
		</>
	);
}

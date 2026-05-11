import { usePlaceHolderSearch } from '@/utils/hooks/usePlaceHolderSearch';
import styles from './mainInput.module.css';

import { CloseButton, TextInput, useMantineTheme } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState, type Dispatch, type SetStateAction } from 'react';

export default function MainInput({
	value,
	setValue,
	isError,
	onSubmit,
	disabled = false,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	isError: boolean;
	onSubmit: () => void;
	disabled?: boolean;
}) {
	const theme = useMantineTheme();
	const [placeHolderText] = useState(usePlaceHolderSearch());

	const closeButton = (
		<CloseButton
			onClick={() => setValue('')}
			display={value ? undefined : 'none'}
		/>
	);
	const searchIcon = <IconSearch />;

	return (
		<TextInput
			disabled={disabled}
			classNames={{ input: styles.input, wrapper: styles.override }}
			placeholder={placeHolderText}
			size="md"
			value={value}
			onChange={(event) => setValue(event.currentTarget.value)}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					onSubmit();
				}
			}}
			rightSectionPointerEvents="auto"
			rightSection={closeButton}
			leftSection={searchIcon}
			flex="1"
			data-error={isError}
			error={isError ? 'Input should not be empty' : undefined}
			styles={{
				error: { textAlign: 'center', color: theme.colors.red[6] },
			}}
		/>
	);
}

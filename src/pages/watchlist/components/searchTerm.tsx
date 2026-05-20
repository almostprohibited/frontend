import { usePlaceHolderSearch } from '@/utils/hooks/usePlaceHolderSearch';
import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export function SearchTerm({
	id,
	isLastInput,
	handleDelete,
}: {
	id: number;
	isLastInput: boolean;
	handleDelete: (key: number) => void;
}) {
	const [searchTerm, setSearchTerm] = useState('');

	const [placeholderSearch] = useState(usePlaceHolderSearch());

	return (
		<Flex flex="1" w="100%" gap="md" align="center">
			<ActionIcon
				variant="outline"
				size="lg"
				color="red"
				disabled={isLastInput}
				onClick={() => {
					handleDelete(id);
				}}
			>
				<IconTrash />
			</ActionIcon>
			<TextInput
				placeholder={placeholderSearch}
				value={searchTerm}
				onChange={(event) => {
					setSearchTerm(event.target.value);
				}}
				w="100%"
			/>
		</Flex>
	);
}

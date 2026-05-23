import {
	ActionIcon,
	Card,
	Divider,
	Flex,
	NumberInput,
	RadioCard,
	RadioGroup,
	Text,
	Title,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

export function PriceAlert({ deleteHandler }: { deleteHandler: () => void }) {
	const [selectedGroup, setSelectedGroup] = useState('absolute');

	return (
		<Card withBorder shadow="sm">
			<Flex direction="column" gap="lg">
				<Flex direction="row" align="center">
					<ActionIcon
						variant="outline"
						size="lg"
						color="red"
						onClick={deleteHandler}
					>
						<IconTrash />
					</ActionIcon>
					<Title
						order={3}
						ta="center"
						pos="absolute"
						left="50%"
						style={{ transform: 'translateX(-50%)' }}
					>
						Price Settings
					</Title>
				</Flex>
				<Divider />
				<RadioGroup value={selectedGroup} onChange={setSelectedGroup}>
					<Flex w="100%" gap="xl">
						<RadioCard
							value="absolute"
							key="absolute"
							className={styles['radio-card']}
						>
							<Flex direction="column" gap="md" ta="center">
								<Title order={4}>Absolute</Title>
								<Text>Alert when the price drops below:</Text>
								<NumberInput
									placeholder="eg. 626.25"
									prefix="$ "
									variant="filled"
									min={0}
									decimalScale={2}
									hideControls
								/>
							</Flex>
						</RadioCard>
						<RadioCard
							value="percent"
							key="percent"
							className={styles['radio-card']}
						>
							<Flex direction="column" gap="md" ta="center">
								<Title order={4}>Percent</Title>
								<Text>Alert when the price drops by:</Text>
								<NumberInput
									placeholder="eg. 10"
									suffix="%"
									variant="filled"
									min={0}
									max={100}
									allowDecimal={false}
									hideControls
								/>
							</Flex>
						</RadioCard>
					</Flex>
				</RadioGroup>
			</Flex>
		</Card>
	);
}
